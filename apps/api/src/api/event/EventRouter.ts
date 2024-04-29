import { Router } from 'express';
import { createEventController, EventController } from './EventController';

const router = Router();

router.post('/create-event', createEventController);
router.put('/edit-event/:id', EventController);

export default router;
