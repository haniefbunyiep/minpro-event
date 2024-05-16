'use client';
import { toast } from 'react-toastify';
import { useGetPointAndVoucherMutation } from '../api/useGetPointAndVoucherMutation';

export const useGetPointAndVoucher = () => {
  const {
    mutate: mutationPointAndVoucher,
    data,
    error: errPointAndVoucher,
    isPending,
  } = useGetPointAndVoucherMutation({
    onSuccess: (res) => {
      // toast.success(res.data.message);
    },
    onError: (err) => {
      // console.log(err);
      toast.error(err.data.message);
    },
  });

  return {
    mutationPointAndVoucher,
    data,
    errPointAndVoucher,
    isPending,
  };
};
