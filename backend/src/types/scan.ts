import mongoose, { Document } from "mongoose";

export interface IViolation {
  id: string;
  impact: "critical" | "serious" | "moderate" | "minor";
  description: string;
  nodes: Array<{
    target: string[];
    failureSummary: string;
    html: string;
  }>;
}

export interface IScanResult {
  url: string;
  violations: IViolation[];
  timestamp: Date;
  error?: string;
}

export interface IScan extends Document {
  urls: string[];
  status: "pending" | "running" | "completed" | "error" | "completed_with_errors";
  results: IScanResult[];
  createdAt: Date;
  updatedAt: Date;
  error?: string;
}
