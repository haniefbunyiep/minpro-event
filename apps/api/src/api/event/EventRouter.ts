import { Router } from 'express';
import {
  createEventController,
  findEventController,
  findEventControllerQuery,
  findEventControllerById,
  listEventController,
  updateEventController,
  findEventByEOId,
} from './EventController';
import { uploader } from '@/middleware/Uploader';
import { tokenVerify } from '@/helpers/Token';

const router = Router();

router.post('/create-event', tokenVerify, uploader, createEventController);
router.get('/list', listEventController);
router.put('/edit-event/:id', uploader, updateEventController);
router.get('/', findEventControllerQuery);
router.get('/all', findEventController);
router.get('/', findEventAllController);
router.get('/dashboard', tokenVerify, findEventByEOId);
router.get('/:id', findEventControllerById);


export default router;
