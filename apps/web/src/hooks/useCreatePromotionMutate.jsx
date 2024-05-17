import { useCreatePromotionMutation } from '../api/useCreatePromotionEventMutation';
import { toast } from 'react-toastify';

export const useCreatePromotionMutate = () => {
  const { mutate: mutateCreatePromotions } = useCreatePromotionMutation({
    onSuccess: (res) => {
      toast.success(res.data.message);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
  return {
    mutateCreatePromotions,
  };
};
