import axios from 'axios';
import type { Scan, CreateScanRequest } from '../types/scan';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const scanApi = {
  createScan: (data: CreateScanRequest): Promise<Scan> =>
    api.post('/scan', data).then(res => res.data),

  getScan: (id: string): Promise<Scan> =>
    api.get(`/scan/${id}`).then(res => res.data),

  getScans: (): Promise<Scan[]> =>
    api.get('/scan-list').then(res => res.data),

  deleteScan: (id: string): Promise<void> =>
    api.delete(`/scan/${id}`),
};