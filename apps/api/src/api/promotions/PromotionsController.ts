import { Response, Request, NextFunction } from 'express';
import { createPromotionsServices } from './PromotionsServices';

export const createPromotionsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { codeVoucher, stok, eventId, discountVoucher } = req.body;
  try {
    const createResult = await createPromotionsServices({
      codeVoucher,
      stok,
      eventId,
      discountVoucher,
    });
    res.status(201).send({
      error: false,
      message: 'Create Success',
      data: createResult,
    });
  } catch (error) {
    next(error);
  }
};
