'use client';
import { useEOVerificationEmailMutation } from './../api/useEOVerificationEmailMutation';
import { toast } from 'react-toastify';

export const useEOVerificationEmail = () => {
  const { mutate: mutationEOVerificationEmail } =
    useEOVerificationEmailMutation({
      onSuccess: (res) => {
        console.log(res);
        toast.success(res.data.message);
      },
      onError: (err) => {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      },
    });

  return { mutationEOVerificationEmail };
};
