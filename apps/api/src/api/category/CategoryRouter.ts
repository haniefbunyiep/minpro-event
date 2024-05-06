import { Router } from 'express';
import { createCategoryEventController } from './CategoryController';

const router = Router();

router.post('/new', createCategoryEventController);

export default router;
