import { Router } from 'express';
import { register } from './RegisterController';

const router = Router();

router.post('/', register);

export default router;
