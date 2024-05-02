import { Request, Response, NextFunction } from 'express';
import {
  createUserService,
  findUserByEmailService,
  findUserByUsernameService,
  findUserByReferralService,
  addPointInRegisterService,
  createVoucherAfterUseReferralService,
} from './RegisterService';
import { HashingPassword } from '@/helpers/Hashing';
import { referralGenerator, voucherGenerator } from '@/helpers/CodeGenerator';
import { defaultExpireAt } from './../../../helpers/DefaultDateForUserVoucher';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, username, password, useReferral } = req.body;

    const findUserByEmailResult = await findUserByEmailService({ email });
    if (findUserByEmailResult.length !== 0)
      throw new Error('Email Already in Use');

    const findUserByUsernameResult = await findUserByUsernameService({
      username,
    });
    if (findUserByUsernameResult.length !== 0)
      throw new Error('Username Already in Use');

    const hashedPassword = await HashingPassword({ password });
    const referralCodeGenerator = await referralGenerator();
    const voucherCodeGenerator = await voucherGenerator();
    const defaultExpireAtResult = await defaultExpireAt();

    if (useReferral) {
      const findUserByReferralResult = await findUserByReferralService({
        useReferral,
      });

      if (findUserByReferralResult === null)
        throw new Error('Referral Code not Valid');

      const createUserResult = await createUserService({
        name,
        email,
        username,
        password: hashedPassword,
        referralCode: referralCodeGenerator,
        expireAt: defaultExpireAtResult,
      });

      await addPointInRegisterService({
        referralCodeId: findUserByReferralResult.referralCodeId,
        useBy: createUserResult.uid,
      });

      await createVoucherAfterUseReferralService({
        uid: createUserResult.uid,
        expireAt: defaultExpireAtResult,
        voucherCode: voucherCodeGenerator,
      });
    } else {
      await createUserService({
        name,
        email,
        username,
        password: hashedPassword,
        referralCode: referralCodeGenerator,
        expireAt: defaultExpireAtResult,
      });
    }

    res.status(200).send({
      error: false,
      message: 'Register Success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
