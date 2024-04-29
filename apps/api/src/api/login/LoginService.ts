import { prisma } from './../../lib/PrismaClient';

export const findUserByEmailService = async ({ email }: { email: string }) => {
  const findEmployee = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!findEmployee) throw new Error('User Not Found!');

  return findEmployee;
};
