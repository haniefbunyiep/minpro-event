import { tokenVerify } from './../../helpers/Token/index';
import { Router } from 'express';
import {
  trasaction,
  checkout,
  createTransaction,
  usePointAndVoucher,
} from './TransactionController';

const router = Router();

router.get('/', tokenVerify, trasaction);
router.post('/checkout', tokenVerify, createTransaction);
router.post('/use-point', tokenVerify, usePointAndVoucher);

export default router;
