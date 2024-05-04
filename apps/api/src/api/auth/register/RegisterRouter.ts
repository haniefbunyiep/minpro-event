import { Router } from 'express';
import { register, userVerification } from './RegisterController';
import { tokenVerify } from '@/helpers/Token';

const router = Router();

router.post('/', register);
router.post('/user-verification', tokenVerify, userVerification);

export default router;
