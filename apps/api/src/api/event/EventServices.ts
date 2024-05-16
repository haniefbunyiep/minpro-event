import prisma from '@/prisma';

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

export const createEventServices = async (
  { uid }: { uid: string },
  data: any,
  images: any,
) => {
  return await prisma.$transaction(async (tx) => {
    const createEvent = await tx.event.create({
      data: {
        eo: uid,
        name: data.name,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        time: new Date(),
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

export const findEventServices = async (city?: string, category?: string) => {
  if (city) {
    return await prisma.event.findMany({
      where: {
        location: {
          city: {
            contains: city,
          },
        },
      },
      include: {
        location: true,
        category: true,
        EventImage: true,
        Ticket: true,
      },
    });
  }
  if (category) {
    return await prisma.event.findMany({
      where: {
        category: {
          name: {
            contains: category,
          },
        },
      },
      include: {
        location: true,
        category: true,
        EventImage: true,
        Ticket: true,
      },
    });
  }
  return await prisma.event.findMany({
    include: {
      location: true,
      category: true,
      EventImage: true,
      Ticket: true,
    },
  });
};

export const findEventAllServices = async () => {
  return await prisma.event.findMany({
    include: {
      location: true,
      category: true,
      EventImage: true,
      Ticket: true,
    },
  });
};
export const findEventServicesById = async ({ id }: any) => {
  const findEvent = await prisma.event.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      location: true,
      category: true,
      EventImage: true,
      Ticket: true,
    },
  });
  return findEvent;
};
