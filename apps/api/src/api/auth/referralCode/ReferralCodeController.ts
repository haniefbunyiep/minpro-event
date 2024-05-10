import { Request, Response, NextFunction } from 'express';
import {
  findReferralCodeService,
  findUserByReferralCodeIdService,
  findUseReferralService,
} from './ReferralCodeService';
import { createVoucherAfterUseReferralService } from './../register/RegisterService';
import { addPointService, findUserService } from '../cores/AuthService';
import { IReqAccessToken } from '@/helpers/Token/TokenType';
import { defaultExpireAt } from '@/helpers/DefaultDateForUserVoucher';
import { voucherGenerator } from '@/helpers/CodeGenerator';

export const useReferral = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;
    const { useReferral } = req.body;

    const findUserResult = await findUserService({ uid });
    const voucherCodeResult = await voucherGenerator();
    const defaultExpire = await defaultExpireAt();

    const findReferralCodeResult = await findReferralCodeService({
      useReferral,
    });

    if (findReferralCodeResult === null)
      throw new Error('Referral Code not Valid');

    if (useReferral == findUserResult?.referralCode.referallCode)
      throw new Error('Cannot use Own Referral Code');

    const findUserByReferralCodeIdResult =
      await findUserByReferralCodeIdService({ id: findReferralCodeResult.id });

    if (!findUserByReferralCodeIdResult) throw new Error('User not Found');

    const findUseReferralResult = await findUseReferralService({
      referralCodeId: findUserByReferralCodeIdResult?.referralCodeId,
      useBy: uid,
    });

    if (findUseReferralResult) throw new Error('Referral Code has Been Used');

    await addPointService({
      referralCodeId: findReferralCodeResult.id,
      useBy: uid,
    });

    await createVoucherAfterUseReferralService({
      uid: findUserResult?.uid!,
      expireAt: defaultExpire,
      voucherCode: voucherCodeResult,
    });

    res.status(200).send({
      error: false,
      message: 'Use Referral Code Success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
