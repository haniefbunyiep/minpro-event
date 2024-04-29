import { HashingPassword } from './../src/helpers/Hashing';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.$transaction(async (tx) => {
    await tx.role.createMany({
      data: {
        name: 'Admin',
      },
    });

    await tx.user.createMany({
      data: {
        name: 'admin',
        email: 'admin@admin.com',
        username: 'admin',
        password: await HashingPassword({ password: 'admin' }),
        roleId: 1,
        referralCode: 'ABC123',
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
