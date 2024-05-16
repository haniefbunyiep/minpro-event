import { Request, Response, NextFunction } from 'express';
import {
  createEventServices,
  listEventServices,
  updateEventServices,
  findEventServices,
  findEventAllServices,
  findEventServicesById,
} from './EventServices';
import { deletedUploadFile } from '@/helpers/DeletedFile';
import { IReqAccessToken } from '@/helpers/Token/TokenType';

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
  const reqToken = req as IReqAccessToken;
  const { uid } = reqToken.payload;
  console.log(uid);
  const data = JSON.parse(req.body.data);

  try {
    if (req.files) {
      const uploadFile = Array.isArray(req.files)
        ? req.files
        : req.files['images'];
      await createEventServices({ uid: uid }, data, uploadFile);
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
export const findEventControllerQuery = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // const { location, category } = req.query;
  const city = req.query.city as string | undefined;
  const category = req.query.category as string | undefined;

  try {
    const findEventResult = await findEventServices(city, category);
    if (findEventResult.length === 0) throw new Error('Event Not Found');
    res.status(200).send({
      error: false,
      message: 'Find Success',
      data: findEventResult,
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
  const findEventByIdResult = await findEventAllServices();
  try {
    res.status(200).send({
      error: false,
      message: 'Find Success',
      data: findEventByIdResult,
    });
  } catch (error) {
    next(error);
  }
};

export const findEventControllerById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  console.log('LLL');
  console.log(id);
  const findEventByIdResult = await findEventServicesById({ id });
  try {
    res.status(200).send({
      error: false,
      message: 'Find Success',
      data: findEventByIdResult,
    });
  } catch (error) {
    next(error);
  }
};
