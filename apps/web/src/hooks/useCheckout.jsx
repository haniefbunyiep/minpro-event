'use client';
import { toast } from 'react-toastify';
import { useCheckoutMutation } from '../api/useCheckoutMutation';
import { useRouter } from 'next/navigation';
import PageError from '@/components/cores/PageError';

export const useCheckout = () => {
  const navigate = useRouter();
  const {
    mutate: mutationCheckout,
    data,
    error: errCheckout,
  } = useCheckoutMutation({
    onSuccess: (res) => {
      //   console.log(res);
      toast.success(res.data.message);
      navigate.push('/');
    },
    onError: (err) => {
      // console.log(err);
      toast.error(err.response.data.message);
    },
  });

  return {
    mutationCheckout,
    data,
    errCheckout,
  };
};
