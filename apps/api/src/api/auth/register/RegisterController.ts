import { Request, Response, NextFunction } from 'express';
import {
  createUserService,
  findUserByEmailService,
  findUserByUsernameService,
  findUserByReferralService,
  userVerificationService,
  createUseReferralByUserService,
  createVoucherAfterUseReferralService,
  findUserService,
  createEOService,
} from './RegisterService';
import { HashingPassword } from '@/helpers/Hashing';
import { referralGenerator } from '@/helpers/CodeGenerator';
import { defaultExpireAt } from './../../../helpers/DefaultDateForUserVoucher';
import { createRegisterToken } from './../../../helpers/Token/index';
import { transporterNodemailer } from '@/helpers/TransporterMailer';
import { IReqAccessToken } from '@/helpers/Token/TokenType';
import { voucherGenerator } from '@/helpers/CodeGenerator';
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
        link: `http://localhost:3000/verification/user/${accesstoken}`,
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
        link: `http://localhost:3000/verification/user/${accesstoken}`,
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

    const voucherCodeResult = await voucherGenerator();
    const defaultExpire = await defaultExpireAt();

    const userVerficationValidator = await findUserService({ uid });

    if (userVerficationValidator?.userStatus == 'VERIFIED')
      res.status(401).send({
        error: true,
        message: 'User Already Verified',
        data: null,
      });
    else if (userVerficationValidator?.userStatus == 'UNVERIFY') {
      await userVerificationService({
        uid,
      });

      await createVoucherAfterUseReferralService({
        uid: uid,
        expireAt: defaultExpire,
        voucherCode: voucherCodeResult,
      });

      res.status(200).send({
        error: false,
        message: 'Verify Success',
        data: null,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const eoRegister = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;

    const createEOResult = await createEOService({ name, email, password });

    const accesstoken = await createRegisterToken({ uid: createEOResult.uid });

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
      subject: 'Activate Your EO Account',
      html: verificationHTMLCompiler,
    });

    res.status(201).send({
      error: false,
      message: 'Register Success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
