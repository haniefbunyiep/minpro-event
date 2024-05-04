import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { IReqAccessToken } from './TokenType';

dotenv.config();

export const createToken = ({ uid }: { uid: string }) => {
  return jwt.sign({ uid }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: '7d',
  });
};
export const createRegisterToken = ({ uid }: { uid: string }) => {
  return jwt.sign({ uid }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: '1m',
  });
};

export const tokenVerify = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { accesstoken } = req.headers;
    // console.log(accesstoken);

    if (!accesstoken) throw new Error('Token Must Provided!');

    const decodedPayload = jwt.verify(
      accesstoken as string,
      process.env.JWT_SECRET_KEY as string,
    );
    // console.log(decodedPayload);
    reqToken.payload = decodedPayload;
    // console.log(reqToken.payload);
    next();
  } catch (error) {
    next(error);
  }
};
