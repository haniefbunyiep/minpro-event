'use client';

import { useCreateEventMutation } from '../api/useCreateEventMutation';
import { toast } from 'react-toastify';

export const useCreateEventMutate = () => {
  const { mutate: mutateCreateEvent } = useCreateEventMutation({
    onSuccess: (res) => {
      console.log(res);
      toast.success(res.data.message);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.response.data.message);
    },
  });
  return {
    mutateCreateEvent,
  };
};
