import { Router } from 'express';
import { login, keepLogin, eoLogin } from './LoginController';
import { tokenVerify } from '@/helpers/Token';

const router = Router();

router.post('/', login);
router.post('/keep-login', tokenVerify, keepLogin);
router.post('/event-organizer', eoLogin);

export default router;
