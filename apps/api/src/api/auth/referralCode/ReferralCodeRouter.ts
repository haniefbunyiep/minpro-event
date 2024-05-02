import { Router } from 'express';
import { useReferral } from './ReferralCodeController';

const router = Router();

router.post('/', useReferral);

export default router;
