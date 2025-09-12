import { Request, Response, NextFunction } from 'express';

const API_KEY = process.env.API_KEY || '';

export function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
  const headerKey = req.headers['x-api-key'];

  if (!headerKey || headerKey !== API_KEY) {
    return res.status(401).json({ message: 'Unauthorized: invalid API key' });
  }

  next();
}
