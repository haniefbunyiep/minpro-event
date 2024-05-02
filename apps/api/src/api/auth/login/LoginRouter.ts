import { Router } from 'express';
import { login, keepLogin } from './LoginController';
import { tokenVerify } from '@/helpers/Token';

const router = Router();

router.post('/', login);
router.post('/keep-login', tokenVerify, keepLogin);

export default router;
