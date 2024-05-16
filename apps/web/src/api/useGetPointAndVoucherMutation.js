'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstanceInterceptor } from './../utils/axiosInstanceInterceptor';

export const useGetPointAndVoucherMutation = ({ onSuccess, onError }) => {
  const { mutate, data, error, isPending } = useMutation({
    mutationFn: async ({ point, voucher }) => {
      return await axiosInstanceInterceptor.post('/transaction/use-point', {
        point,
        voucher,
      });
    },
    onSuccess,
    onError,
  });

  return { mutate, data, error, isPending };
};
