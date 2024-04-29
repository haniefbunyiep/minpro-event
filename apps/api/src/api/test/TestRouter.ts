import express, { Router } from 'express';
import { Test } from './TestController';

const router = Router();
router.use(express.json());

router.get('/', Test);

export default router;
