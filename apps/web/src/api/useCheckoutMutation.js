'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstanceInterceptor } from './../utils/axiosInstanceInterceptor';

export const useCheckoutMutation = ({ onSuccess, onError }) => {
  const { mutate, data, error } = useMutation({
    mutationFn: async ({
      eventId,
      ticketType,
      qty,
      subTotal,
      pointUse,
      voucher,
    }) => {
      console.log({ eventId, ticketType, qty, subTotal, pointUse, voucher });
      return await axiosInstanceInterceptor.post('/transaction/checkout', {
        eventId,
        ticketType,
        qty,
        subTotal,
        pointUse,
        voucher,
      });
    },
    onSuccess,
    onError,
  });

  return { mutate, data, error };
};
