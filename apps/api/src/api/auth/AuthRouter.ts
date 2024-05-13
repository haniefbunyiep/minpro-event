import { Router } from 'express';
import RegisterRouter from './register/RegisterRouter';
import LoginRouter from './login/LoginRouter';
import ReferralCodeRouter from './referralCode/ReferralCodeRouter';
import { getUserRole } from './cores/AuthContoller';
import { tokenVerify } from '@/helpers/Token';

const router = Router();

router.get('/role', tokenVerify, getUserRole);
router.use('/register', RegisterRouter);
router.use('/login', LoginRouter);
router.use('/use-referral', ReferralCodeRouter);

export default router;
