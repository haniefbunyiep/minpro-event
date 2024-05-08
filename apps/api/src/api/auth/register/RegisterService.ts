import { prisma } from '../../../lib/PrismaClient';
import {
  ICreateUserServiceParams,
  ICreateVoucherAfterUseReferralParams,
  ICreateEOParams,
} from './RegisterInterface';
import { defaultExpireAt } from '@/helpers/DefaultDateForUserVoucher';

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
  const currentDate = new Date(Date.now());
  const getMonth = currentDate.getMonth() + 1;

  await prisma.$transaction(async (tx) => {
    const updateUserWhoRegister = await tx.user.update({
      where: {
        uid: uid,
      },
      data: {
        userStatus: 'VERIFIED',
      },
    });

    const findUseReferralByWhoRegister = await tx.use_Referral.findFirst({
      where: {
        useBy: updateUserWhoRegister.uid,
      },
    });

    const findUserReferralCode = await tx.user.findFirst({
      where: {
        referralCodeId: findUseReferralByWhoRegister?.referralCodeId,
      },
    });

    const findUserPoint = await tx.user_Point.findUnique({
      where: {
        id: findUserReferralCode?.pointId,
      },
    });

    if (findUserPoint?.expireAt.getMonth()! + 1 <= getMonth) {
      console.log(1);
      await tx.user_Point.update({
        where: {
          id: findUserReferralCode?.pointId,
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
          id: findUserReferralCode?.pointId,
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
          id: findUserReferralCode?.pointId,
        },
        data: {
          point: findUserPoint?.point! + 10_000,
          expireAt: result,
        },
      });
    }
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

export const findUserService = async ({ uid }: { uid: string }) => {
  return await prisma.user.findUnique({
    where: {
      uid: uid,
    },
  });
};

export const findEOByIdService = async ({ uid }: { uid: string }) => {
  return await prisma.event_Organizer.findUnique({
    where: {
      uid: uid,
    },
  });
};

export const createEOService = async ({
  name,
  email,
  password,
}: ICreateEOParams) => {
  return await prisma.event_Organizer.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });
};

export const findEOByemailService = async ({ email }: { email: string }) => {
  return await prisma.event_Organizer.findFirst({
    where: {
      email: email,
    },
  });
};

export const userEOVerificationService = async ({ uid }: { uid: string }) => {
  await prisma.event_Organizer.update({
    where: {
      uid: uid,
    },
    data: {
      status: 'VERIFIED',
    },
  });
};
