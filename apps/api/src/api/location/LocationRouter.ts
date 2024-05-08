import { Router } from 'express';
import {
  createLocationEventController,
  findLocationEventController,
} from './LocationController';

const router = Router();

router.post('/new', createLocationEventController);
router.get('/', findLocationEventController);

export default router;
