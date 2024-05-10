import { Request, Response, NextFunction } from 'express';
import {
  findUserByEmailService,
  findEOService,
  findUserById,
  findEOById,
} from './LoginService';
import { ComparePassword } from '../../../helpers/Hashing';
import {
  createUserToken,
  createEOToken,
  createRoleToken,
} from '@/helpers/Token';
import { IReqAccessToken } from './../../../helpers/Token/TokenType';

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

    const accesstoken = await createUserToken({
      uid: findUserByEmailResult.uid,
    });

    res.status(200).send({
      error: false,
      message: 'Login Success',
      data: {
        accesstoken: accesstoken,
        name: findUserByEmailResult.name,
        role: findUserByEmailResult.roleId,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const eoLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const findEOResult = await findEOService({ email });

    if (!findEOResult) throw new Error('EO Not Found');

    const comparePasswordResult = await ComparePassword({
      passwordFromClient: password,
      passwordFromDatabase: findEOResult.password,
    });

    if (!comparePasswordResult) throw new Error('Password Wrong');

    const accesstoken = await createEOToken({ uid: findEOResult.uid });

    res.status(201).send({
      error: false,
      message: 'Login Success',
      data: {
        accesstoken: accesstoken,
        name: findEOResult.name,
        role: findEOResult.roleId,
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

    const findEOByIdResult = await findEOById({ uid });
    const findUserByIdResult = await findUserById({ uid });

    if (findEOByIdResult) {
      const accesstoken = await createUserToken({ uid: findEOByIdResult.uid });
      return res.status(201).send({
        error: false,
        message: 'Keep Login Success',
        data: {
          session: accesstoken,
          name: findEOByIdResult.name,
          role: findEOByIdResult.roleId,
        },
      });
    } else if (findUserByIdResult) {
      const accesstoken = await createUserToken({
        uid: findUserByIdResult.uid,
      });
      return res.status(201).send({
        error: false,
        message: 'Keep Login Success',
        data: {
          session: accesstoken,
          name: findUserByIdResult.name,
          role: findUserByIdResult.roleId,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
