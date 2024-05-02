import { HashingPassword } from './../src/helpers/Hashing';
import { PrismaClient } from '@prisma/client';
import { referralGenerator } from '../src/helpers/CodeGenerator';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.$transaction(async (tx) => {
    await tx.role.createMany({
      data: [
        {
          name: 'admin',
        },
        { name: 'user' },
      ],
    });

    await tx.referall_Code.create({
      data: {
        referallCode: await referralGenerator(),
      },
    });

    await tx.user.createMany({
      data: {
        name: 'admin',
        email: 'admin@admin.com',
        username: 'admin',
        password: await HashingPassword({ password: 'admin' }),
        roleId: 1,
        referralCodeId: 1,
        point: 0,
      },
    });
  });
};

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
