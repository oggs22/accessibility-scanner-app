import { Request, Response } from "express";
import { ScannerService } from "../services/scannerService";
import Scan from "../models/Scan";
import { scanValidationSchema } from "../utils/validation";

export const createScan = async (req: Request, res: Response) => {
  try {
    const parsedData = scanValidationSchema.parse(req.body);
    const { urls } = parsedData;

    const scan = new Scan({ urls, status: "pending" });
    await scan.save();

    // Start the scanning process asynchronously
    processScanInBackground((scan._id as string).toString());

    res.status(200).json({
      id: scan._id,
      message: "Scan initiated",
      status: scan.status,
      urls: scan.urls,
      createdAt: scan.createdAt,
    });
  } catch (error: any) {
    if (error.errors) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    }
    console.error("Error during scanning:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

async function processScanInBackground(scanId: string) {
  try {
    const scan = await Scan.findById(scanId);
    if (!scan) {
      console.error(`Scan with ID ${scanId} not found`);
      return;
    }

    scan.status = "running";
    await scan.save();

    const results = await ScannerService.scanMultipleUrls(scan.urls);

    const hasErrors = results.some((result) => result.error);

    scan.results = results;
    scan.status = hasErrors ? "completed_with_errors" : "completed";

    const errors = results
      .filter((result) => result.error)
      .map((result) => `${result.url}: ${result.error}`);

    if (errors.length > 0) {
      scan.error = `Some URLs failed:\n${errors.join("\n")}`;
    }

    await scan.save();
  } catch (error) {
    const scan = await Scan.findById(scanId);
    if (scan) {
      scan.status = "error";
      scan.error = error instanceof Error ? error.message : "Unknown error";
      await scan.save();
    }
  }
}
