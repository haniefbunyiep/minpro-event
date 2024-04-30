import { Router } from 'express';
import {
  createEventController,
  createEventImageController,
  EventController,
  listEventController,
} from './EventController';
import { uploader } from '@/middleware/Uploader';

const router = Router();

router.post('/create-event', createEventController);
router.put('/edit-event/:id', EventController);
router.post('/upload/images', uploader, createEventImageController);
router.get('/list', listEventController);

export default router;
