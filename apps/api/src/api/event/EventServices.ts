import prisma from '@/prisma';
import moment from 'moment';

export const updateEventServices = async (data: any, images: any, id: any) => {
  return await prisma.$transaction(async (tx) => {
    const findEvent = await tx.event.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!findEvent) throw new Error('Event Not Found!');

    await tx.event.update({
      where: {
        id: Number(id),
      },
      data: {
        name: data.name,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        time: new Date(),
        locationId: data.locationId,
        description: data.description,
        categoryId: data.categoryId,
      },
    });

    const findEventImages = await tx.eventImage.findMany({
      where: {
        eventId: findEvent.id,
      },
    });
    await tx.eventImage.deleteMany({
      where: {
        eventId: findEvent.id,
      },
    });
    const imageToUpdate: any = [];
    images.forEach((item: any) => {
      imageToUpdate.push({
        url: item.path,
        eventId: findEvent.id,
      });
    });
    await tx.eventImage.createMany({
      data: [...imageToUpdate],
    });
    return findEventImages;
  });
};

export const createEventServices = async (data: any, images: any) => {
  return await prisma.$transaction(async (tx) => {
    const timeC = moment().format();
    const createEvent = await tx.event.create({
      data: {
        name: data.name,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        time: timeC,
        locationId: data.locationId,
        description: data.description,
        categoryId: data.categoryId,
      },
    });
    const imageToCreate: any = [];
    images.forEach((item: any) => {
      imageToCreate.push({
        url: item.path,
        eventId: createEvent.id,
      });
    });
    await tx.eventImage.createMany({
      data: [...imageToCreate],
    });
  });
};

export const listEventServices = async ({ page, per_page }: any) => {
  const listEvent = await prisma.event.findMany({
    take: Number(per_page) || 5,
    skip: (Number(page) - 1) * Number(per_page) || 0,
  });
  if (listEvent.length === 0) {
    throw new Error('Page Not Found!');
  } else {
    return listEvent;
  }
};

export const findEventServices = async () => {
  return await prisma.event.findMany({
    include: {
      location: true,
      category: true,
      EventImage: true,
      Ticket: true,
    },
  });
};

// export const findEventServicesById = async ({ id }: any) => {
//   return await prisma.event.findFirst({
//     where: {
//       id: Number(id),
//     },
//     include: {
//       EventImage: true,
//     },
//   });
// };

// export const findTicketEventImages = async () => {
//   return await prisma.$transaction(async (tx) => {
//     const findEventImagesAndTicket = await tx.eventImage.findMany({
//       include: {
//         event: {
//           include: {
//             location: true,
//             category: true,
//             Ticket: true,
//           },
//         },
//       },
//     });
//     return findEventImagesAndTicket;
//   });
// };
