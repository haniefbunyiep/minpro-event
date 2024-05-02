import { prisma } from '../../../lib/PrismaClient';
import {
  ICreateUserServiceParams,
  IAddPointServiceParams,
  ICreateVoucherAfterUseReferralParams,
} from './RegisterInterface';
import { defaultExpireAt } from './../../../helpers/DefaultDateForUserVoucher';

export const addPointInRegisterService = async ({
  referralCodeId,
  useBy,
}: IAddPointServiceParams) => {
  const currentDate = new Date(Date.now());
  const getMonth = currentDate.getMonth() + 1;

  // console.log(getMonth);
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
    // console.log(findUserPoint?.expireAt.getMonth()! + 1);
    if (findUserPoint?.expireAt.getMonth()! + 1 === getMonth) {
      await tx.user_Point.update({
        where: {
          id: findUserByReferral?.pointId,
        },
        data: {
          point: findUserPoint?.point! + 10_000,
        },
      });
    } else {
      await tx.user_Point.update({
        where: {
          id: findUserByReferral?.pointId,
        },
        data: {
          point: findUserPoint?.point! + 10_000,
          expireAt: await defaultExpireAt(),
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

export const findUserByReferralService = async ({
  useReferral,
}: {
  useReferral: string;
}) => {
  const findReferralCode = await prisma.referall_Code.findFirst({
    where: {
      referallCode: useReferral,
    },
  });

  if (findReferralCode === null) return null;

  return await prisma.user.findFirst({
    where: {
      referralCodeId: findReferralCode.id,
    },
  });
};

export const findUserByUsernameService = async ({
  username,
}: {
  username: string;
}) => {
  return await prisma.user.findMany({
    where: {
      username: username,
    },
  });
};

export const findUserByEmailService = async ({ email }: { email: string }) => {
  return await prisma.user.findMany({
    where: {
      email: email,
    },
  });
};

export const createUserService = async ({
  name,
  email,
  username,
  password,
  referralCode,
  expireAt,
}: ICreateUserServiceParams) => {
  return await prisma.$transaction(async (tx) => {
    const { id } = await tx.referall_Code.create({
      data: {
        referallCode: referralCode,
      },
    });

    const createUserPoint = await tx.user_Point.create({
      data: {
        expireAt: expireAt,
      },
    });

    return await tx.user.create({
      data: {
        name,
        email,
        username,
        password,
        referralCodeId: id,
        pointId: createUserPoint.id,
      },
    });
  });
};

export const createVoucherAfterUseReferralService = async ({
  uid,
  expireAt,
  voucherCode,
}: ICreateVoucherAfterUseReferralParams) => {
  await prisma.user_Voucher.create({
    data: {
      userId: uid,
      expireAt: expireAt,
      voucherCode: voucherCode,
    },
  });
};
