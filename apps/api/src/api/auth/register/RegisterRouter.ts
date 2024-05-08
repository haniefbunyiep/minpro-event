import { Router } from 'express';
import { register, userVerification, eoRegister } from './RegisterController';
import { tokenVerify } from '@/helpers/Token';
import { validatorEORegister } from '@/middleware/EORegisterValidator';
import { handleErrorEORegisterValidator } from '@/middleware/handleErrorEORegisterValidator';

const router = Router();

router.post('/', register);
router.post('/user-verification', tokenVerify, userVerification);
router.post(
  '/event-organizer',
  validatorEORegister,
  handleErrorEORegisterValidator,
  eoRegister,
);

export default router;
