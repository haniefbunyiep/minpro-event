import { updateTicketController } from './../ticket/TicketController';
import { Request, Response, NextFunction } from 'express';
import { IReqAccessToken } from '@/helpers/Token/TokenType';
import {
  transactionDetailService,
  createTransactionDetailService,
  usePointAndVoucherService,
  findUseVoucherService,
} from './TransactionService';

export const trasaction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;
    const { event, ticket, qty } = req.query;
    const eventIdToNumber = Number(event);
    const ticketIdToNumber = Number(ticket);
    const qtyToNumber = Number(qty);

    const { findEventById, findTicketById, findUserPoint } =
      await transactionDetailService({
        userId: uid,
        eventId: eventIdToNumber,
        ticketId: ticketIdToNumber,
      });

    if (findEventById?.id !== findTicketById?.eventId)
      throw new Error('Fatal Error');

    if (findTicketById?.quantity! < qtyToNumber)
      throw new Error('Invalid Quantity');

    res.status(201).send({
      error: false,
      message: 'Get Transaction info',
      data: {
        eventInfo: findEventById,
        ticketInfo: findTicketById,
        userInfo: findUserPoint,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const checkout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;
    const bodyRequest = req.body;
    console.log(uid);
    console.log(bodyRequest);
  } catch (error) {
    next(error);
  }
};

export const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;
    const { eventId, ticketType, qty, subTotal, pointUse, voucher } = req.body;
    const qtyToNumber = Number(qty);
    const pointUseToNumber = Number(pointUse);

    const findUseVoucherResult = await findUseVoucherService({
      eventId,
      uid,
      voucher,
    });

    if (findUseVoucherResult) throw new Error('Voucher Already Used');

    await createTransactionDetailService({
      eventId,
      ticketType,
      qty: qtyToNumber,
      uid,
      subTotal,
      pointUse: pointUseToNumber,
      voucher,
    });

    res.status(201).send({
      error: false,
      message: 'Transaction Success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const usePointAndVoucher = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;
    const { point, voucher } = req.body;

    console.log(point, voucher);

    // console.log(point);

    // if (point < 1) throw new Error('Input Valid Point');
    const { findPointById, findVoucherById } = await usePointAndVoucherService({
      uid,
      point,
      voucher,
    });

    // if (!findVoucherById) throw new Error('Voucher code not valid');

    // console.log(point);
    // console.log(findPointById);
    // console.log(findPointById?.point.point);
    // console.log(findVoucherById);

    if (!point && !voucher) {
      console.log(1);
      return res.status(201).send({
        error: false,
        message: 'Navigate to transaction detail',
        data: {
          point: 0,
          discount: 1,
        },
      });
    } else if (!voucher) {
      console.log(2);
      if (findPointById?.point.point! < point)
        throw new Error('Point not valid');

      return res.status(201).send({
        error: false,
        message: 'Use Point Success',
        data: {
          point: findPointById?.point.point,
          discount: 1,
        },
      });
    } else if (!point) {
      console.log(3);
      if (!findVoucherById!) throw new Error('Voucher code not valid');

      return res.status(201).send({
        error: false,
        message: 'Use Point Success',
        data: {
          point: 0,
          discount: findVoucherById.discountInPercent,
        },
      });
    } else {
      console.log(4);
      if (findPointById?.point.point! < point)
        throw new Error('Point not valid');
      if (!findVoucherById) throw new Error('Voucher code not valid');

      return res.status(201).send({
        error: false,
        message: 'Use Point and Voucher Success',
        data: {
          point: findPointById,
          discount: findVoucherById.discountInPercent,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
