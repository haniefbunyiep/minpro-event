import { Router } from 'express';
import {
  createEventController,
  listEventController,
  updateEventController,
} from './EventController';
import { uploader } from '@/middleware/Uploader';

const router = Router();

router.post('/create-event', uploader, createEventController);
router.get('/list', listEventController);
router.put('/edit-event/:id', uploader, updateEventController);

export default router;
