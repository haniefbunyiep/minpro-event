import { Request, Response, NextFunction } from 'express';
import {
  createTicketEventServices,
  findTicketEventServices,
  updateTicketEventServices,
} from './TicketServices';

export const createTicketController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { eventId, name, price, quantity } = req.body;
  try {
    const createTicketResult = await createTicketEventServices({
      eventId,
      name,
      price,
      quantity,
    });
    res.status(201).send({
      error: false,
      message: 'Create Success!',
      data: createTicketResult,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTicketController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { eventId, name, price, quantity } = req.body;
  try {
    const updateTicketResult = await updateTicketEventServices(
      { id: parseInt(id) },
      { eventId, name, price, quantity },
    );
    res.status(201).send({
      error: false,
      message: 'Update Success!',
      data: updateTicketResult,
    });
  } catch (error) {
    next(error);
  }
};

export const findTicketController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const findTicketEventResult = await findTicketEventServices();
    res.status(200).send({
      error: false,
      message: 'Find Success!',
      data: findTicketEventResult,
    });
  } catch (error) {
    next(error);
  }
};
