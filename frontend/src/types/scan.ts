export interface Violation {
  id: string;
  impact: 'critical' | 'serious' | 'moderate' | 'minor';
  description: string;
  nodes: Array<{
    target: string[];
    failureSummary: string;
    html: string;
  }>;
}

export interface ScanResult {
  url: string;
  violations: Violation[];
  timestamp: string;
  error?: string;
}

export interface Scan {
  _id: string;
  urls: string[];
  status: 'pending' | 'running' | 'completed' | 'completed_with_errors' | 'error';
  results: ScanResult[];
  createdAt: string;
  updatedAt: string;
  error?: string;
}

export interface CreateScanRequest {
  urls: string[];
}