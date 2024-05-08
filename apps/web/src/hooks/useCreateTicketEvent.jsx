'use client';
import { useCreateTicketEventMutation } from '../api/useCreateTicketEventMutation';
import { toast } from 'react-toastify';

export const useCreateTicketEventMutate = () => {
  const { mutate: mutateCreateTicketEvent } = useCreateTicketEventMutation({
    onSuccess: (res) => {
      toast.success(res.data.message);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
  return {
    mutateCreateTicketEvent,
  };
};
