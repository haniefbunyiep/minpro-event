import { prisma } from '../../../lib/PrismaClient';

export const findUserByEmailService = async ({ email }: { email: string }) => {
  const findEmployee = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!findEmployee) throw new Error('User Not Found!');

  return findEmployee;
};

export const keepLoginService = async ({ uid }: { uid: string }) => {
  return await prisma.user.findUnique({
    where: {
      uid: uid,
    },
  });
};

export const keepLoginEOService = async ({ uid }: { uid: string }) => {
  return await prisma.event_Organizer.findUnique({
    where: {
      uid: uid,
    },
  });
};

export const findEOService = async ({ email }: { email: string }) => {
  return await prisma.event_Organizer.findFirst({
    where: {
      email: email,
    },
  });
};

export const findUserById = async ({ uid }: { uid: string }) => {
  return await prisma.user.findUnique({
    where: {
      uid: uid,
    },
  });
};
export const findEOById = async ({ uid }: { uid: string }) => {
  return await prisma.event_Organizer.findUnique({
    where: {
      uid: uid,
    },
  });
};
