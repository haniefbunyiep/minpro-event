import { Router } from 'express';
import {
  createTicketController,
  updateTicketController,
} from './TicketController';

const router = Router();

router.post('/register', createTicketController);
router.put('/event/edit/:id', updateTicketController);

export default router;
