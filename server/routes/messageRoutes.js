
import { Router } from 'express';

import {
  createMessage,
  listMessages,
  markRead,
  deleteMessage
} from '../controllers/messageController.js';

import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { contactLimiter } from '../middleware/rateLimit.js';
import { contactSchema } from '../validators.js';

const router = Router();

router.post(
  '/contact',
  contactLimiter,
  validate(contactSchema),
  createMessage
);

router.get('/messages', protect, listMessages);

router.patch('/messages/:id/read', protect, markRead);

router.delete('/messages/:id', protect, deleteMessage);

export default router;
