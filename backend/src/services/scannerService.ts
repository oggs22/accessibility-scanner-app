import puppeteer from "puppeteer";
import { IScanResult } from "../types/scan";

const timeout = 30000; // 30 seconds

export class ScannerService {
  static async scanUrl(url: string): Promise<IScanResult> {
    let browser;

    try {
      browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();
      await page.setBypassCSP(true);

      await page.setDefaultNavigationTimeout(timeout);

      await page.goto(url, {
        waitUntil: "networkidle0",
        timeout,
      });

      await page.addScriptTag({
        path: require.resolve("axe-core"),
      });

      const results = await page.evaluate(() => {
        return (window as any).axe.run({
          runOnly: {
            type: "tag",
            values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
          },
        });
      });

      const scanResult: IScanResult = {
        url,
        violations: results.violations.map((violation: any) => ({
          id: violation.id,
          impact: violation.impact,
          description: violation.description,
          nodes: violation.nodes.map((node: any) => ({
            target: node.target,
            failureSummary: node.failureSummary,
            html: node.html,
          })),
        })),
        timestamp: new Date(),
      };

      return scanResult;
    } catch (error) {
      return {
        url,
        violations: [],
        timestamp: new Date(),
        error: error instanceof Error ? error.message : "Unknown error",
      };
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  static async scanMultipleUrls(urls: string[]): Promise<IScanResult[]> {
    return Promise.all(urls.map(url => this.scanUrl(url)));
  }
}
