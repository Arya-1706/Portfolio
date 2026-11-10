import 'dotenv/config';
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

// 1. Trust the reverse proxy (needed when deployed behind Render)
app.set('trust proxy', 1);

// 2. Security headers
app.use(helmet());

// 3. Allow requests from our frontend
app.use(
  cors({
    origin: (process.env.CLIENT_URL || '')
      .split(',')
      .map((s) => s.trim()),
  })
);

// 4. Parse incoming JSON request bodies
app.use(express.json({ limit: '100kb' }));

// 5. Health-check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 6. Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api', messageRoutes);

// 7. Handle unknown routes
app.use(notFound);

// 8. Centralized error handling
app.use(errorHandler);

// 9. Connect database, then start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log('Server up!');
  });
});