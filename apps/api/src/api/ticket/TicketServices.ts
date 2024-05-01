import prisma from '@/prisma';
import { ITicketServices } from './type';

export const createTicketEventServices = async ({
  eventId,
  name,
  price,
  quantity,
}: ITicketServices) => {
  return await prisma.$transaction(async (tx) => {
    const findEventId = await tx.event.findFirst({
      where: {
        id: eventId,
      },
    });
    if (!findEventId) throw new Error('Event Not Found!');

    await tx.ticket.create({
      data: {
        eventId,
        name,
        price,
        quantity,
      },
    });
  });
};
export const updateTicketEventServices = async (
  { id }: { id: number },
  { eventId, name, price, quantity }: ITicketServices,
) => {
  return await prisma.$transaction(async (cb) => {
    const findTicket = await cb.ticket.findUnique({
      where: {
        id,
      },
    });
    const findEvent = await cb.event.findUnique({
      where: {
        id: eventId,
      },
    });
    if (!findTicket) {
      throw new Error('Ticket Not Found!');
    } else if (!findEvent) {
      throw new Error('Event Not Found cant Update Ticket!');
    } else if (findEvent) {
      await cb.ticket.update({
        where: {
          id: Number(id),
        },
        data: {
          eventId,
          name,
          price,
          quantity,
        },
      });
    }
  });
};
