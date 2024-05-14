import { tokenVerify } from '@/helpers/Token';
import { getUserInfo, getEventById } from './DashboardController';
import { Router } from 'express';

const router = Router();

router.get('/user', tokenVerify, getUserInfo);
router.post('/event-organizer');
router.get('/event-organizer/event/:id', tokenVerify, getEventById);

export default router;
