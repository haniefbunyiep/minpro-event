import { Router } from 'express';
import {
  createVoucherEventController,
  findVoucherEventController,
} from './VoucherController';

const router = Router();

router.post('/register', createVoucherEventController);
router.get('/', findVoucherEventController);

export default router;
