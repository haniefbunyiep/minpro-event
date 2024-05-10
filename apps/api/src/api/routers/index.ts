import express, { Router } from 'express';
import EventRouter from '../event/EventRouter';
import CategoryRouter from '../category/CategoryRouter';
import AuthRouter from './../auth/AuthRouter';
import LocationRouter from './../location/LocationRouter';
import DashboardRouter from './../dashboard/DashboardRouter';

const router = Router();
router.use(express.json());

router.use('/event', EventRouter);
router.use('/category', CategoryRouter);
router.use('/auth', AuthRouter);
router.use('/location', LocationRouter);
router.use('/dashboard', DashboardRouter);

export default router;
