import { Request, Response, NextFunction } from 'express';
import { createCategoryEventServices } from './CategoryServices';

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
