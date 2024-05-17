import { prisma } from './../../lib/PrismaClient';

export const getUserinfoService = async ({ uid }: { uid: string }) => {
  const userInfo = await prisma.user.findUnique({
    where: {
      uid: uid,
    },
    include: {
      referralCode: true,
      point: true,
    },
  });
  const userVoucher = await prisma.user_Voucher.findMany({
    where: {
      userId: uid,
    },
  });

  return {
    userInfo,
    userVoucher,
  };
};

export const getEventByIdService = async ({ id }: { id: number }) => {
  return await prisma.event.findUnique({
    where: {
      id: id,
    },
    include: {
      location: true,
      category: true,
    },
  });
};

export const getTicketByEventIdService = async ({ id }: { id: number }) => {
  return await prisma.ticket.findMany({
    where: {
      eventId: id,
    },
  });
};
