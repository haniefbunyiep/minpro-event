import { Request, Response, NextFunction } from 'express';
import {
  createEventServices,
  listEventServices,
  updateEventServices,
  findEventServices,
  // findEventServicesById,
  // findTicketEventImages,
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
      // data: {
      //   // event: findEventResult?.name,
      //   // startDate: findEventResult?.startDate,
      //   // endDate: findEventResult?.endDate,
      //   // time: findEventResult?.time,
      //   // address: findEventResult?.location.address,
      //   // city: findEventResult?.location.city,
      //   // category: findEventResult?.category.name,
      //   // images: findEventResult?.EventImage?.url,
      //   // ticket: findEventResult?.Ticket?.price,
      // },
    });
  } catch (error) {
    next(error);
  }
};

// export const findEventControllerById = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const { id } = req.params;
//   const findEventByIdResult = await findEventServicesById({ id });
//   const slackEvent = await findEventServicesById({
//     id: findEventByIdResult?.id,
//   });
//   link: `http://localhost:8000/${slackEvent}`;
//   try {
//     res.status(200).send({
//       error: false,
//       message: 'Find Success',
//       data: {
//         event: findEventByIdResult,
//         image: findEventByIdResult?.EventImage?.url,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };
