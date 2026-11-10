import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

import {
  notFound,
  errorHandler
} from './middleware/errorHandler.js';

const app = express();

app.set('trust proxy', 1);

app.use(helmet());

app.use(
  cors({
    origin: (process.env.CLIENT_URL || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  })
);

app.use(express.json({ limit: '100kb' }));

// Health check: does not require a database query
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Establish/reuse the database connection before API operations
app.use('/api', async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api', messageRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
