import prisma from '@/prisma';
import { IVoucherServices } from './type';

export const createVoucherEventServices = async ({
  name,
  code,
  eventId,
  ticketId,
  stok,
}: IVoucherServices) => {
  return await prisma.voucher.create({
    data: {
      name,
      code,
      eventId,
      ticketId,
      stok,
    },
  });
};

export const findVoucherEventServices = async () => {
  return await prisma.voucher.findMany({
    include: {
      event: true,
      ticket: true,
    },
  });
};
