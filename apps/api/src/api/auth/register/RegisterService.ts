import { prisma } from '../../../lib/PrismaClient';
import {
  ICreateUserServiceParams,
  IAddPointServiceParams,
  ICreateVoucherAfterUseReferralParams,
} from './RegisterInterface';

export const addPointInRegisterService = async ({
  referralCodeId,
  useBy,
}: IAddPointServiceParams) => {
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

    if (findUserByReferral) {
      await tx.user.update({
        where: {
          uid: findUserByReferral?.uid,
        },
        data: {
          point: findUserByReferral?.point + 10_000,
        },
      });

      await tx.use_Referral.create({
        data: {
          referralCodeId: referralCodeId,
          useBy: useBy,
        },
      });
    }
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
}: ICreateUserServiceParams) => {
  return await prisma.$transaction(async (tx) => {
    const { id } = await tx.referall_Code.create({
      data: {
        referallCode: referralCode,
      },
    });

    return await tx.user.create({
      data: {
        name,
        email,
        username,
        password,
        referralCodeId: id,
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
