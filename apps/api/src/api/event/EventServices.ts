import prisma from '@/prisma';
import { IEventServices } from './type';

export const EventServices = async (
  { id }: { id: number },
  { name, date, time, location, description }: IEventServices,
) => {
  return await prisma.$transaction(async (tx) => {
    const findEvent = await tx.event.findUnique({
      where: {
        id,
      },
    });
    if (!findEvent) throw new Error('Event Not Found!');

    await tx.event.update({
      where: {
        id: findEvent.id,
      },
      data: {
        name,
        date: new Date(date),
        time: new Date(),
        location,
        description,
      },
    });
  });
};

export const createEventServices = async ({
  name,
  date,
  time,
  location,
  description,
}: IEventServices) => {
  await prisma.event.create({
    data: {
      name,
      date: new Date(date),
      time: new Date(),
      location,
      description,
    },
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
