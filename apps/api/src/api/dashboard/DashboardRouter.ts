import { tokenVerify } from '@/helpers/Token';
import {
  getUserInfo,
  getEventById,
  getEventSales,
} from './DashboardController';
import { Router } from 'express';

const router = Router();

router.get('/user', tokenVerify, getUserInfo);
router.get('/event-organizer/sales', tokenVerify, getEventSales);
router.get('/event-organizer/event/:id', tokenVerify, getEventById);

export default router;
