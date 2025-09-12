import express, { Express } from 'express';
import cors from 'cors';
import connectDB from './config/db';

const app: Express = express();

connectDB();

app.use(express.json());

app.use(cors());


export default app;