import { Router } from 'express';
import {
  createTicketController,
  findTicketController,
  updateTicketController,
} from './TicketController';

const router = Router();

router.post('/register', createTicketController);
router.put('/event/edit/:id', updateTicketController);
router.get('/', findTicketController);

export default router;
