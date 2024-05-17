import { IReqAccessToken } from '@/helpers/Token/TokenType';
import { Request, Response, NextFunction } from 'express';
import { createReviewServices } from './ReviewServices';

export const createReviewController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const reqToken = req as IReqAccessToken;
  const { uid } = reqToken.payload;
  const { rating, feedback, eventId } = req.body;
  const { id } = req.params;
  try {
    await createReviewServices({ uid }, { id }, { rating, feedback, eventId });
    res.status(201).send({
      error: false,
      message: 'Thanks for your feedback!',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
