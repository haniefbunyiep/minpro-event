import { useCreateLocationEventMutation } from '../api/useCreateLocationEventMutation';
import { toast } from 'react-toastify';

export const useCreateLocationEventMutate = () => {
  const { mutate: mutateCreateLocationEvent } = useCreateLocationEventMutation({
    onSuccess: (res) => {
      toast.success(res.data.message);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
  return {
    mutateCreateLocationEvent,
  };
};
