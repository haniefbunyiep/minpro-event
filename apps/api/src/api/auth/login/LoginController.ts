import { Request, Response, NextFunction } from 'express';
import { findUserByEmailService, keepLoginService } from './LoginService';
import { ComparePassword } from '../../../helpers/Hashing';
import { createToken } from '@/helpers/Token';
import { IReqAccessToken } from '@/middleware/TokenVerify';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const findUserByEmailResult = await findUserByEmailService({ email });

    if (!findUserByEmailResult) throw new Error('User Not Found');

    const comparePasswordResult = await ComparePassword({
      passwordFromClient: password,
      passwordFromDatabase: findUserByEmailResult.password,
    });

    if (!comparePasswordResult) throw new Error('Password Wrong');

    const accestoken = await createToken({ uid: findUserByEmailResult.uid });

    console.log(accestoken);

    res.status(200).send({
      error: false,
      message: 'Login Success',
      data: {
        accestoken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const keepLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;

    const keepLoginResult = await keepLoginService({ uid });

    if (!keepLoginResult) throw new Error('Keep Login Failed');

    res.status(201).send({
      error: false,
      message: 'Keep Login Success',
      data: { session: keepLoginResult.uid, name: keepLoginResult.name },
    });
  } catch (error) {
    next(error);
  }
};
