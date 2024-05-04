import { Request, Response, NextFunction } from 'express';
import {
  findReferralCodeService,
  findUserByReferralCodeIdService,
  findUseReferralService,
} from './ReferralCodeService';
import { addPointService, findUserService } from '../cores/AuthService';
import { IReqAccessToken } from '@/helpers/Token/TokenType';

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

    res.status(200).send({
      error: false,
      message: 'Use Referral Code Success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
