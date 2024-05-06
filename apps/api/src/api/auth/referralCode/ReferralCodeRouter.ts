import { Router } from 'express';
import { useReferral } from './ReferralCodeController';
import { tokenVerify } from '@/helpers/Token';

const router = Router();

router.post('/', tokenVerify, useReferral);

export default router;
