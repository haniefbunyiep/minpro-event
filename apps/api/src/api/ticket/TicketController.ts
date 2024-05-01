import { Request, Response, NextFunction } from 'express';

export const createTicketController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { eventId, name, price, quantity } = req.body;
  try {
    res.status(201).send({
      error: false,
      message: 'Create Success!',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
