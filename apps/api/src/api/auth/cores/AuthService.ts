import { prisma } from '../../../lib/PrismaClient';
import { IAddPointServiceParams } from './AuthInterface';
import { defaultExpireAt } from './../../../helpers/DefaultDateForUserVoucher';
import { Prisma } from '@prisma/client';

export const addPointService = async ({
  referralCodeId,
  useBy,
}: IAddPointServiceParams) => {
  const currentDate = new Date(Date.now());
  const getMonth = currentDate.getMonth() + 1;

  await prisma.$transaction(async (tx) => {
    const findReferralCode = await tx.referall_Code.findFirst({
      where: {
        id: referralCodeId,
      },
    });

    const findUserByReferral = await tx.user.findFirst({
      where: {
        referralCodeId: findReferralCode?.id,
      },
    });

    const findUserPoint = await tx.user_Point.findFirst({
      where: {
        id: findUserByReferral?.pointId,
      },
    });

    if (findUserPoint?.expireAt.getMonth()! + 1 <= getMonth) {
      console.log(1);
      await tx.user_Point.update({
        where: {
          id: findUserByReferral?.pointId,
        },
        data: {
          point: 10_000,
          expireAt: await defaultExpireAt(),
        },
      });
    } else if (findUserPoint?.updatedAt.getMonth()! + 1 === getMonth) {
      console.log(2);
      await tx.user_Point.update({
        where: {
          id: findUserByReferral?.pointId,
        },
        data: {
          point: findUserPoint?.point! + 10_000,
        },
      });
    } else if (findUserPoint?.updatedAt.getMonth()! + 1 !== getMonth) {
      console.log(3);
      let getUserPointExpireAt = findUserPoint?.expireAt;

      let result;
      result = getUserPointExpireAt!;
      result.setMonth(result.getMonth() + 3);
      result.toISOString();

      await tx.user_Point.update({
        where: {
          id: findUserByReferral?.pointId,
        },
        data: {
          point: findUserPoint?.point! + 10_000,
          expireAt: result,
        },
      });
    }

    await tx.use_Referral.create({
      data: {
        referralCodeId: referralCodeId,
        useBy: useBy,
      },
    });
  });
};

export const findUserService = async ({ uid }: { uid: string }) => {
  return await prisma.user.findUnique({
    where: {
      uid: uid,
    },
    include: {
      referralCode: true,
    },
  });
};

export const getUserRoleService = async ({ uid }: { uid: string }) => {
  return await prisma.user.findUnique({
    where: {
      uid: uid,
    },
    include: {
      role: true,
    },
  });
};

export const getDataPerMonth = async ({ id }: { id: Number }) => {};
