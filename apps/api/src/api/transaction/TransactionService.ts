import { prisma } from './../../lib/PrismaClient';
import { IReqcreateTransactionDetailParams } from './TransactionType';
import { ticketCodeGenerator } from '@/helpers/CodeGenerator';

export const transactionDetailService = async ({
  userId,
  eventId,
  ticketId,
}: {
  userId: string;
  eventId: number;
  ticketId: number;
}) => {
  const findEventById = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      location: true,
    },
  });

  const findTicketById = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });

  const findUserPoint = await prisma.user.findUnique({
    where: {
      uid: userId,
    },
    include: {
      point: true,
    },
  });

  return {
    findEventById,
    findTicketById,
    findUserPoint,
  };
};

export const createTransactionDetailService = async ({
  eventId,
  ticketType,
  qty,
  uid,
  subTotal,
  pointUse,
  voucher,
}: IReqcreateTransactionDetailParams) => {
  const currentDate = new Date();

  return await prisma.$transaction(async (tx) => {
    const createTransaction = await tx.transaction.create({
      data: {
        eventId: eventId,
        userId: uid,
        ticketType: ticketType,
        quantity: qty,
        buyDate: currentDate,
        subTotal: subTotal,
        pointUse: pointUse,
        totalPayment: subTotal - pointUse,
        voucherUse: voucher,
      },
    });

    const transactionDetailArr: any = [];

    do {
      transactionDetailArr.push({
        ticketCode: await ticketCodeGenerator(),
        transactionId: createTransaction?.id,
        eventId: eventId,
        userId: uid,
        ticketType: ticketType,
        buyDate: currentDate,
      });
    } while (transactionDetailArr.length < qty);

    await tx.transactionDetail.createMany({
      data: [...transactionDetailArr],
    });

    const findTicket = await tx.ticket.findUnique({
      where: {
        id: ticketType,
      },
    });

    if (findTicket?.quantity == 0) throw new Error('Ticket is sold out');

    await tx.ticket.update({
      where: {
        id: ticketType,
      },
      data: {
        quantity: findTicket?.quantity! - qty,
      },
    });

    const findPointByUid = await tx.user.findUnique({
      where: {
        uid: uid,
      },
      include: {
        point: true,
      },
    });

    // console.log(findPointByUid);

    await tx.user_Point.update({
      where: {
        id: findPointByUid?.pointId,
      },
      data: {
        point: findPointByUid?.point.point! - pointUse,
      },
    });

    const findUserVoucher = await tx.user_Voucher.findFirst({
      where: {
        userId: uid,
        voucherCode: voucher,
      },
    });

    if (findUserVoucher) {
      await tx.use_User_Voucher.create({
        data: {
          eventId: eventId,
          userId: uid,
          voucherId: findUserVoucher.id,
        },
      });
    }
  });
};

export const usePointAndVoucherService = async ({
  uid,
  point,
  voucher,
}: {
  uid: string;
  point: number;
  voucher: string;
}) => {
  const findPointById = await prisma.user.findUnique({
    where: {
      uid: uid,
    },
    include: {
      point: true,
    },
  });

  const findVoucherById = await prisma.user_Voucher.findFirst({
    where: {
      userId: uid,
      voucherCode: voucher,
    },
  });
  return {
    findPointById,
    findVoucherById,
  };
};

export const findUseVoucherService = async ({
  eventId,
  uid,
  voucher,
}: {
  eventId: number;
  uid: string;
  voucher: string;
}) => {
  const findUserVoucher = await prisma.user_Voucher.findFirst({
    where: {
      userId: uid,
      voucherCode: voucher,
    },
  });

  return await prisma.use_User_Voucher.findFirst({
    where: {
      eventId: eventId,
      userId: uid,
      voucherId: findUserVoucher!.id,
    },
  });
};
