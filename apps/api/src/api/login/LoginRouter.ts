import { Router } from 'express';

const router = Router();

import { login } from './../login/LoginController';

router.post('/login', login);

export default router;
