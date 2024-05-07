import { Router } from 'express';
import {
  createCategoryEventController,
  findCategoryEventController,
} from './CategoryController';

const router = Router();

router.post('/new', createCategoryEventController);
router.get('/', findCategoryEventController);

export default router;
