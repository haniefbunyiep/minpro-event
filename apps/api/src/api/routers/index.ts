import express, { Router } from 'express';
import EventRouter from '../event/EventRouter';
import CategoryRouter from '../category/CategoryRouter';
import AuthRouter from './../auth/AuthRouter';
import LocationRouter from './../location/LocationRouter';
import TicketRouter from './../ticket/TicketRouter';
import VoucherRouter from './../event/voucher/VoucherRouter';

const router = Router();
router.use(express.json());

router.use('/event', EventRouter);
router.use('/category', CategoryRouter);
router.use('/ticket', TicketRouter);
router.use('/auth', AuthRouter);
router.use('/location', LocationRouter);
router.use('/event-voucher', VoucherRouter);

export default router;
