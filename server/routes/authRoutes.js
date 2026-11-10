
import { Router } from 'express';

import { login } from '../controllers/authController.js';

import { validate } from '../middleware/validate.js';
import { loginLimiter } from '../middleware/rateLimit.js';
import { loginSchema } from '../validators.js';

const router = Router();

router.post(
  '/login',
  loginLimiter,
  validate(loginSchema),
  login
);

export default router;
