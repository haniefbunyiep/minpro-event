import express, { Router } from 'express';
import EventRouter from '../event/EventRouter';
import CategoryRouter from '../category/CategoryRouter';
import AuthRouter from './../auth/AuthRouter';


const router = Router();
router.use(express.json());

router.use('/event', EventRouter);
router.use('/category', CategoryRouter);
router.use('/auth', AuthRouter);


export default router;
