import { Request, Response, NextFunction } from 'express';
import {
  createEventServices,
  listEventServices,
  updateEventServices,
  findEventServices,
  findEventServicesById,
  // findTicketEventImages,
  findEventByEOIdService,
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

// export const findEventController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const findEventResult = await findTicketEventImages();
//     res.status(200).send({
//       error: false,
//       message: 'Find Success',
//       data: {
//         images: findEventResult[0].url,
//         nameEvent: findEventResult[0].event.name,
//         startDate: findEventResult[0].event.startDate,
//         endDate: findEventResult[0].event.endDate,
//         time: findEventResult[0].event.time,
//         address: findEventResult[0].event.location.address,
//         city: findEventResult[0].event.location.city,
//         category: findEventResult[0].event.category.name,
//         nameTicket: findEventResult[0].event.Ticket[0].name,
//         price: findEventResult[0].event.Ticket[0].price,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };
export const findEventAllController = async (
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

export const findEventControllerById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
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

export const findEventByEOId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;

    const findEventResultByEOIdResult = await findEventByEOIdService({ uid });

    res.status(201).send({
      error: false,
      message: 'Get Event By EO ID',
      data: findEventResultByEOIdResult,
    });
  } catch (error) {
    next(error);
  }
};
