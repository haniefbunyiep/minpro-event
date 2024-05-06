import { HashingPassword } from './../src/helpers/Hashing';
import { PrismaClient } from '@prisma/client';
import { referralGenerator } from '../src/helpers/CodeGenerator';
import { defaultExpireAt } from './../src/helpers/DefaultDateForUserVoucher';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.$transaction(async (tx) => {
    await tx.category.create({
      data: {
        name: 'music',
      },
    });

    await tx.role.createMany({
      data: [
        {
          name: 'Admin',
        },
        { name: 'Event Organizer' },
        { name: 'User' },
      ],
    });

    await tx.referall_Code.create({
      data: {
        referallCode: await referralGenerator(),
      },
    });

    await tx.user_Point.create({
      data: {
        expireAt: await defaultExpireAt(),
        lastAdd: new Date(Date.now()),
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
        pointId: 1,
        userStatus: 'VERIFIED',
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
