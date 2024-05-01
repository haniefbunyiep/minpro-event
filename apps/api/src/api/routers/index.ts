import express, { Router } from 'express';
import TicketRouter from '../ticket/TicketRouter';

const router = Router();
router.use(express.json());

router.use('/ticket', TicketRouter);

export default router;
