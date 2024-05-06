import prisma from '@/prisma';

export const createCategoryEventServices = async (name: any) => {
  return await prisma.category.create({
    data: {
      name,
    },
  });
};

export const findCategoryEventServices = async () => {
  return await prisma.category.findMany();
};
