
import { Router } from 'express';

import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';

import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { projectSchema } from '../validators.js';

const router = Router();

router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);

router.post(
  '/',
  protect,
  validate(projectSchema),
  createProject
);

router.put(
  '/:id',
  protect,
  validate(projectSchema.partial()),
  updateProject
);

router.delete('/:id', protect, deleteProject);

export default router;
