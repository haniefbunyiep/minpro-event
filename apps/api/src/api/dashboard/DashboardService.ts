import { prisma } from './../../lib/PrismaClient';
import { IReqGetEventSalesParams } from './DashboardType';

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

  const userTransaction = await prisma.transaction.findMany({
    where: {
      userId: uid,
    },
    include: {
      event: true,
      ticket: true,
    },
  });

  return {
    userInfo,
    userVoucher,
    userTransaction,
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

export const getEventSalesService = async ({
  uid,
  eventId,
}: {
  uid?: string;
  eventId: number;
}) => {
  const findEventTransaction = await prisma.transaction.findMany({
    where: {
      eventId: eventId,
    },
    include: {
      user: true,
    },
  });

  const findEventbyId = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  return {
    findEventTransaction,
    findEventbyId,
  };
};

export const getEventSalesByMonthService = async ({
  eventId,
  firstDate,
  lastDate,
}: {
  eventId: number;
  firstDate: string;
  lastDate: string;
}) => {
  const findEventTransaction = await prisma.transaction.findMany({
    where: {
      eventId: eventId,
    },
    include: {
      user: true,
    },
  });

  const findEventbyId = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {},
  });

  const filteredData = await prisma.transaction.findMany({
    where: {
      buyDate: {
        gte: new Date(firstDate),
        lte: new Date(lastDate),
      },
    },
    include: {
      user: true,
    },
  });

  return {
    findEventTransaction,
    findEventbyId,
    filteredData,
  };
};

export const getEventSalesByYearService = async ({
  eventId,
  firstYear,
  lastYear,
}: IReqGetEventSalesParams) => {
  const findEventTransaction = await prisma.transaction.findMany({
    where: {
      eventId: eventId,
    },
    include: {
      user: true,
    },
  });

  const findEventbyId = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  const filteredData = await prisma.transaction.findMany({
    where: {
      buyDate: {
        gte: new Date(firstYear!),
        lte: new Date(lastYear!),
      },
    },
    include: {
      user: true,
    },
  });

  return { findEventbyId, filteredData, findEventTransaction };
};

export const getEventSalesByMonthAndYearService = async ({
  eventId,
  firstDate,
  lastDate,
  year,
}: IReqGetEventSalesParams) => {
  const findEventTransaction = await prisma.transaction.findMany({
    where: {
      eventId: eventId,
    },
    include: {
      user: true,
    },
  });

  const findEventbyId = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  const filteredData = await prisma.transaction.findMany({
    where: {
      buyDate: {
        gte: new Date(firstDate!),
        lte: new Date(lastDate!),
      },
    },
  });
};
