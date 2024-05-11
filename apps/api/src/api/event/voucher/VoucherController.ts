import { Request, Response, NextFunction } from 'express';
import {
  createVoucherEventServices,
  findVoucherEventServices,
} from './VoucherServices';

export const createVoucherEventController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, code, eventId, ticketId, stok } = req.body;
  try {
    const createVoucherResult = await createVoucherEventServices({
      name,
      code,
      eventId,
      ticketId,
      stok,
    });
    res.status(201).send({
      error: false,
      message: 'Create Success!',
      data: createVoucherResult,
    });
  } catch (error) {
    next(error);
  }
};

export const findVoucherEventController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const findVoucherResult = await findVoucherEventServices();
    res.status(200).send({
      error: false,
      message: 'Find Success!',
      data: findVoucherResult,
    });
  } catch (error) {
    next(error);
  }
};
