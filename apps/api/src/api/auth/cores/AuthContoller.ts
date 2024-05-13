import { Request, Response, NextFunction } from 'express';
import { ComparePassword } from '../../../helpers/Hashing';
import { IReqAccessToken } from './../../../helpers/Token/TokenType';
import { getUserRoleService } from './AuthService';

export const getUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;

    const test = await getUserRoleService({ uid });
    // console.log(test?.role);

    res.status(201).send({
      error: false,
      message: 'Get Role',
      data: {
        role: test?.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
