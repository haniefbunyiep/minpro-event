import { prisma } from '../../../lib/PrismaClient';
import {
  ICreateUserServiceParams,
  ICreateVoucherAfterUseReferralParams,
} from './RegisterInterface';

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
        lastAdd: new Date(Date.now()),
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

export const userVerificationService = async ({ uid }: { uid: string }) => {
  const updateUserWhoRegister = await prisma.user.update({
    where: {
      uid: uid,
    },
    data: {
      userStatus: 'VERIFIED',
    },
  });

  const findUseReferralByWhoRegister = await prisma.use_Referral.findFirst({
    where: {
      useBy: updateUserWhoRegister.uid,
    },
  });

  const findUserReferralCode = await prisma.user.findFirst({
    where: {
      referralCodeId: findUseReferralByWhoRegister?.referralCodeId,
    },
  });

  const findUserPoint = await prisma.user_Point.findUnique({
    where: {
      id: findUserReferralCode?.pointId,
    },
  });

  const addPoint = await prisma.user_Point.update({
    where: {
      id: findUserPoint?.id,
    },
    data: {
      point: findUserPoint?.point! + 10_000,
    },
  });
};

export const createUseReferralByUserService = async ({
  referralCodeId,
  useBy,
}: {
  referralCodeId: number;
  useBy: string;
}) => {
  await prisma.use_Referral.create({
    data: {
      referralCodeId: referralCodeId,
      useBy: useBy,
    },
  });
};
