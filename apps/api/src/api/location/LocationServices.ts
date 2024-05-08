import prisma from '@/prisma';
import { ILocationServices } from './type';

export const createLocationEventServices = async ({
  address,
  city,
  zip,
}: ILocationServices) => {
  return await prisma.location.create({
    data: {
      address,
      city,
      zip,
    },
  });
};

export const findLocationEventServices = async () => {
  return await prisma.location.findMany();
};


