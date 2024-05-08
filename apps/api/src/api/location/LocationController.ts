import { Request, Response, NextFunction } from 'express';
import {
  createLocationEventServices,
  findLocationEventServices,
} from './LocationServices';

export const createLocationEventController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { address, city, zip } = req.body;
  try {
    await createLocationEventServices({ address, city, zip });
    res.status(201).send({
      error: false,
      message: 'Create Success!',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const findLocationEventController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const findLocationResult = await findLocationEventServices();
    res.status(200).send({
      error: false,
      message: 'Find Success!',
      data: findLocationResult,
    });
  } catch (error) {
    next(error);
  }
};
