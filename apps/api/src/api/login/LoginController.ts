import { Request, Response, NextFunction } from 'express';
import { findUserByEmailService } from './LoginService';
import { ComparePassword } from './../../helpers/Hashing';
import { createToken } from '@/helpers/Token';

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
