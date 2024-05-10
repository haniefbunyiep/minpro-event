import { tokenVerify } from '@/helpers/Token';
import { getUserInfo } from './DashboardController';
import { Router } from 'express';

const router = Router();

router.get('/user', tokenVerify, getUserInfo);
router.post('/event-organizer');

export default router;
