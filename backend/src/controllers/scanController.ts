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

    const { id, createdAt, status } = scan;

    // Start the scanning process asynchronously
    processScanInBackground(id.toString());

    res.status(201).json({
      id: id.toString(),
      message: "Scan initiated",
      status: status,
      urls: urls,
      createdAt: createdAt.toISOString(),
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

export const getScan = async (req: Request, res: Response) => {
  try {
    const scan = await Scan.findById(req.params.id);

    if (!scan) {
      return res.status(404).json({ error: "Scan not found" });
    }

    res.json(scan);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getScanList = async (req: Request, res: Response) => {
  try {
    const scans = await Scan.find()
      .sort({ createdAt: -1 })
      .select("urls status createdAt updatedAt")
      .limit(50);
    res.json(scans);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteScan = async (req: Request, res: Response) => {
  try {
    const scan = await Scan.findByIdAndDelete(req.params.id);

    if (!scan) {
      return res.status(404).json({ error: "Scan not found" });
    }

    res.json({ message: "Scan deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export async function processScanInBackground(scanId: string) {
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
