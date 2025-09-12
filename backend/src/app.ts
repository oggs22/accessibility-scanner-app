import express, { Express } from 'express';
import cors from 'cors';
import connectDB from '../config/db';
import scanRoutes from './routes/scanRoutes';

const app: Express = express();

connectDB();

app.use(express.json());

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', scanRoutes);


export default app;