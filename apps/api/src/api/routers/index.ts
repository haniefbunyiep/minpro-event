import express, { Router } from 'express';
import TestRouter from './../test/TestRouter';
import EventRouter from '../event/EventRouter';
import CategoryRouter from '../category/CategoryRouter';

const router = Router();
router.use(express.json());

router.use('/test', TestRouter);
router.use('/event', EventRouter);
router.use('/category', CategoryRouter);

export default router;
