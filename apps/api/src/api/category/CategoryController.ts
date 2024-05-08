import { Request, Response, NextFunction } from 'express';
import {
  createCategoryEventServices,
  findCategoryEventServices,
} from './CategoryServices';

export const createCategoryEventController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name } = req.body;

  try {
    await createCategoryEventServices(name);
    res.status(201).send({
      error: false,
      meesage: 'Create Success!',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const findCategoryEventController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryEventResult = await findCategoryEventServices();
    res.status(200).send({
      error: false,
      message: 'Find Success!',
      data: categoryEventResult,
    });
  } catch (error) {
    next(error);
  }
};
