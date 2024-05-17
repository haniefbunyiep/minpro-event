import { Router } from 'express';
import { createReviewController } from './ReviewController';
import { tokenVerify } from '@/helpers/Token';

const router = Router();

router.post('/:id', tokenVerify, createReviewController);

export default router;
