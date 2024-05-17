import prisma from '@/prisma';
import { IPromotionServices } from './type';

export const createPromotionsServices = async ({
  codeVoucher,
  eventId,
  discountVoucher,
  stok,
}: IPromotionServices) => {
  return await prisma.promotion.create({
    data: {
      codeVoucher,
      eventId,
      discountVoucher,
      stok,
    },
  });
};
