'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useCreatePromotionMutation = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async ({ codeVoucher, stok, discountVoucher, eventId }) => {
      return await axios.post('http://localhost:8000/promotions/', {
        codeVoucher,
        stok,
        discountVoucher,
        eventId,
      });
    },
    onSuccess,
    onError,
  });
  return {
    mutate,
  };
};
