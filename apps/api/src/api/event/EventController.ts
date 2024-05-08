import { Request, Response, NextFunction } from 'express';
import {
  createEventServices,
  listEventServices,
  updateEventServices,
  findEventServices,
} from './EventServices';
import { deletedUploadFile } from '@/helpers/DeletedFile';

export const updateEventController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const data = JSON.parse(req.body.data);
  const { id } = req.params;

  try {
    if (req.files) {
      const uploadedFiles = Array.isArray(req.files)
        ? req.files
        : req.files['images'];
      const updateEventResult = await updateEventServices(
        data,
        uploadedFiles,
        id,
      );
      deletedUploadFile({ images: updateEventResult });
    }
    res.status(201).send({
      error: false,
      message: 'Update Success!',
      data: null,
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
  const data = JSON.parse(req.body.data);

  try {
    if (req.files) {
      const uploadFile = Array.isArray(req.files)
        ? req.files
        : req.files['images'];
      await createEventServices(data, uploadFile);
    }
    return res.status(201).send({
      error: false,
      message: 'Create Success!',
      data: null,
    });
  } catch (error) {
    deletedUploadFile(req.files);
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

export const findEventController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const findEventResult = await findEventServices();
    res.status(200).send({
      error: false,
      message: 'Find Success',
      data: findEventResult,
    });
  } catch (error) {
    next(error);
  }
};
