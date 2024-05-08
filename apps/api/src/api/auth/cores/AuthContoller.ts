import { Request, Response, NextFunction } from 'express';
import { ComparePassword } from '../../../helpers/Hashing';
import { IReqAccessToken } from './../../../helpers/Token/TokenType';

export const getUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};
