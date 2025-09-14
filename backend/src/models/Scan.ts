import mongoose, { Schema } from 'mongoose';
import { IScan } from '../types/scan';

const ViolationSchema = new Schema({
  id: { type: String, required: true },
  impact: { 
    type: String, 
    enum: ['critical', 'serious', 'moderate', 'minor'],
    required: true 
  },
  description: { type: String, required: true },
  nodes: [{
    target: [{ type: String }],
    failureSummary: { type: String },
    html: { type: String }
  }]
});

const ScanResultSchema = new Schema({
  url: { type: String, required: true },
  violations: [ViolationSchema],
  timestamp: { type: Date, default: Date.now }
});

const ScanSchema = new Schema({
  urls: [{ type: String, required: true }],
  status: {
    type: String,
    enum: ['pending', 'running', 'completed', 'error'],
    default: 'pending'
  },
  results: [ScanResultSchema],
  error: { type: String }
}, {
  timestamps: true,
  error: { type: String }
});

export default mongoose.model<IScan>('Scan', ScanSchema);