import express, { Router } from 'express';
import TestRouter from './../test/TestRouter';
import EventRouter from '../event/EventRouter';

const router = Router();
router.use(express.json());

router.use('/test', TestRouter);
router.use('/event', EventRouter);

export default router;
