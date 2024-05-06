import { useReferralCodeMutation } from '../api/useReferralCodeMutation';
import { toast } from 'react-toastify';

export const useReferralCode = () => {
  const { mutate: mutationReferralCode } = useReferralCodeMutation({
    onSuccess: (res) => {
      // console.log(res.data.message);
      toast.success(res.data.message);
    },
    onError: (err) => {
      // console.log(err.response.data.message);
      toast.error(err.response.data.message);
    },
  });

  return {
    mutationReferralCode,
  };
};
