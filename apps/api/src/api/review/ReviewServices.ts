import prisma from '@/prisma';
import { IReviewServices } from './type';

export const createReviewServices = async (
  { uid }: { uid: string },
  { id }: any,
  { rating, feedback, eventId }: IReviewServices,
) => {
  return await prisma.$transaction(async (tx) => {
    await tx.event.findUnique({
      where: {
        id: Number(id),
      },
    });
    await tx.review.create({
      data: {
        userId: uid,
        rating,
        feedback,
        eventId
      },
    });
  });
};
