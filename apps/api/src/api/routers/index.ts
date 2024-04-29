import express, { Router } from 'express';
import LoginRouter from './../login/LoginRouter';

const router = Router();
router.use(express.json());

router.use('/auth', LoginRouter);

export default router;
