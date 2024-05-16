import { Router } from 'express';
import { createPromotionsController } from './PromotionsController';

const router = Router();

router.post('/', createPromotionsController);

export default router;
