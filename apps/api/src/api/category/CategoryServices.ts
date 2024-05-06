import prisma from '@/prisma';

export const createCategoryEventServices = async (name: any) => {
  return await prisma.category.create({
    data: {
      name,
    },
  });
};
