import { Router } from 'express';
import RegisterRouter from './register/RegisterRouter';
import LoginRouter from './login/LoginRouter';
import ReferralCodeRouter from './referralCode/ReferralCodeRouter';

const router = Router();

router.use('/register', RegisterRouter);
router.use('/login', LoginRouter);
router.use('/use-referral', ReferralCodeRouter);

export default router;
