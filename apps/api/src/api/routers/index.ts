import express, { Router } from 'express';
import TestRouter from './../test/TestRouter';

const router = Router();
router.use(express.json());

router.use('/test', TestRouter);

export default router;
