import { Request, Response, NextFunction } from 'express';
import {
  createUserService,
  findUserByEmailService,
  findUserByUsernameService,
  findUserByReferralService,
  userVerificationService,
  createUseReferralByUserService,
} from './RegisterService';
import { HashingPassword } from '@/helpers/Hashing';
import { referralGenerator, voucherGenerator } from '@/helpers/CodeGenerator';
import { defaultExpireAt } from './../../../helpers/DefaultDateForUserVoucher';
import { createRegisterToken } from './../../../helpers/Token/index';
import { transporterNodemailer } from '@/helpers/TransporterMailer';
import { IReqAccessToken } from '@/helpers/Token/TokenType';
import Handlebars from 'handlebars';
import fs from 'fs';

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

      await createUseReferralByUserService({
        referralCodeId: findUserByReferralResult.referralCodeId,
        useBy: createUserResult.uid,
      });

      // await addPointService({
      //   referralCodeId: findUserByReferralResult.referralCodeId,
      //   useBy: createUserResult.uid,
      // });

      // await createVoucherAfterUseReferralService({
      //   uid: createUserResult.uid,
      //   expireAt: defaultExpireAtResult,
      //   voucherCode: voucherCodeGenerator,
      // });

      const accesstoken = await createRegisterToken({
        uid: createUserResult.uid,
      });

      const verificationHTML = fs.readFileSync(
        'src/template/EmailVerification.html',
        'utf-8',
      );

      let verificationHTMLCompiler: any =
        await Handlebars.compile(verificationHTML);
      verificationHTMLCompiler = verificationHTMLCompiler({
        username: email,
        link: `http://localhost:3000/verification/${accesstoken}`,
      });

      transporterNodemailer.sendMail({
        from: 'hr-app-pwdk',
        to: email,
        subject: 'Activate Your Account',
        html: verificationHTMLCompiler,
      });
    } else {
      const createUserResult = await createUserService({
        name,
        email,
        username,
        password: hashedPassword,
        referralCode: referralCodeGenerator,
        expireAt: defaultExpireAtResult,
      });

      const accesstoken = await createRegisterToken({
        uid: createUserResult.uid,
      });

      const verificationHTML = fs.readFileSync(
        'src/template/EmailVerification.html',
        'utf-8',
      );

      let verificationHTMLCompiler: any =
        await Handlebars.compile(verificationHTML);
      verificationHTMLCompiler = verificationHTMLCompiler({
        username: email,
        link: `http://localhost:3000/verification/${accesstoken}`,
      });

      transporterNodemailer.sendMail({
        from: 'hr-app-pwdk',
        to: email,
        subject: 'Activate Your Account',
        html: verificationHTMLCompiler,
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

export const userVerification = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;

    await userVerificationService({ uid });

    res.send(200).send({
      error: false,
      message: 'Verify Success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
