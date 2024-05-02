import { Request, Response, NextFunction } from 'express';
import {
  findReferralCodeService,
  findUserByReferralCodeIdService,
  addPointService,
  findUseReferralService,
} from './ReferralCodeService';
import { addPointInRegisterService } from './../register/RegisterService';

export const useReferral = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { useReferral } = req.body;
    const header = 'clvnu8hu00002nu3k70qzl5ny';

    const findReferralCodeResult = await findReferralCodeService({
      useReferral,
    });

    if (findReferralCodeResult === null)
      throw new Error('Referral Code not Valid');

    const findUserByReferralCodeIdResult =
      await findUserByReferralCodeIdService({ id: findReferralCodeResult.id });

    if (!findUserByReferralCodeIdResult) throw new Error('User not Found');

    const findUseReferralResult = await findUseReferralService({
      referralCodeId: findUserByReferralCodeIdResult?.referralCodeId,
      useBy: header,
    });

    if (findUseReferralResult) throw new Error('Referral Code has Been Used');

    await addPointInRegisterService({
      referralCodeId: findReferralCodeResult.id,
      useBy: header,
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
