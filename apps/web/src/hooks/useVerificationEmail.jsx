'use client';
import { useVerificationEmailMutation } from './../api/useVerificationEmailMutation';
import { toast } from 'react-toastify';

export const useVerificationEmail = () => {
  const { mutate: mutationVerificationEmail } = useVerificationEmailMutation({
    onSuccess: (res) => {
      // console.log(res.data.message);
      toast.success(res.data.message);
    },
    onError: (err) => {
      // console.log(err.response.data.message);
      // console.log(err.response.data.message);
      toast.error(err.response.data.message);
      // toast.error('Link is Expired');
    },
  });

  return {
    mutationVerificationEmail,
  };
};
