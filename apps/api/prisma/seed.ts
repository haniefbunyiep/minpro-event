import { HashingPassword } from './../src/helpers/Hashing';
import { PrismaClient } from '@prisma/client';
import { referralGenerator } from '../src/helpers/CodeGenerator';
import { defaultExpireAt } from './../src/helpers/DefaultDateForUserVoucher';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.$transaction(async (tx) => {
    await tx.category.createMany({
      data: [
        {
          name: 'Music Indie',
        },
        {
          name: 'Music Classic',
        },
        {
          name: 'Festival',
        },
      ],
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

    await tx.referall_Code.createMany({
      data: [
        {
          referallCode: await referralGenerator(),
        },
        {
          referallCode: await referralGenerator(),
        },
      ],
    });

    await tx.user_Point.createMany({
      data: [
        {
          expireAt: await defaultExpireAt(),
          lastAdd: new Date(Date.now()),
        },
        {
          expireAt: await defaultExpireAt(),
          lastAdd: new Date(Date.now()),
        },
      ],
    });

    await tx.user.createMany({
      data: [
        {
          name: 'admin',
          email: 'admin@admin.com',
          username: 'admin',
          password: await HashingPassword({ password: 'admin' }),
          roleId: 1,
          referralCodeId: 1,
          pointId: 1,
          userStatus: 'VERIFIED',
        },
        {
          name: 'test',
          email: 'test@test.com',
          username: 'test',
          password: await HashingPassword({ password: 'test123' }),
          roleId: 2,
          referralCodeId: 2,
          pointId: 2,
          userStatus: 'VERIFIED',
        },
      ],
    });

    await tx.event_Organizer.createMany({
      data: [
        {
          name: 'eo test',
          email: 'eo@example.com',
          password: await HashingPassword({ password: 'test123' }),
        },
      ],
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
