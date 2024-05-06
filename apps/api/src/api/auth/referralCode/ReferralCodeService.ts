import { prisma } from '../../../lib/PrismaClient';
import { IAddPointServiceParams } from '../cores/AuthInterface';

export const findReferralCodeService = async ({
  useReferral,
}: {
  useReferral: string;
}) => {
  return await prisma.referall_Code.findFirst({
    where: {
      referallCode: useReferral,
    },
  });
};

export const findUserByReferralCodeIdService = async ({
  id,
}: {
  id: number;
}) => {
  return await prisma.user.findFirst({
    where: {
      referralCodeId: id,
    },
  });
};

export const findUseReferralService = async ({
  referralCodeId,
  useBy,
}: IAddPointServiceParams) => {
  return await prisma.use_Referral.findFirst({
    where: {
      referralCodeId: referralCodeId,
      useBy: useBy,
    },
  });
};
