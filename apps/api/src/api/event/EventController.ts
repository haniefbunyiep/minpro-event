import { Request, Response, NextFunction } from 'express';
import {
  createEventServices,
  EventServices,
  listEventServices,
} from './EventServices';

export const EventController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { name, date, time, location, description } = req.body;

  try {
    const EventResult = await EventServices(
      { id: parseInt(id) },
      { name, date, time, location, description },
    );
    res.status(201).send({
      error: false,
      message: 'Update Success!',
      data: EventResult,
    });
  } catch (error) {
    next(error);
  }
};

export const createEventController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, date, time, location, description } = req.body;
  try {
    const createResult = await createEventServices({
      name,
      date,
      time,
      location,
      description,
    });
    return res.status(201).send({
      error: false,
      message: 'Create Success!',
      data: createResult,
    });
  } catch (error) {
    next(error);
  }
};

export const createEventImageController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    return res.status(201).send({
      error: false,
      message: 'Create Success!',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const listEventController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { page, per_page } = req.query;
  try {
    const listEventResult = await listEventServices({ page, per_page });
    res.status(200).send({
      error: false,
      message: 'List Event Success!',
      data: listEventResult,
    });
  } catch (error) {
    next(error);
  }
};
