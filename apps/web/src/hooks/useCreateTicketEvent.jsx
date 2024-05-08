import { useCreateTicketEventMutation } from '../api/useCreateTicketEvent';

export const useCreateTicketEventMutate = async () => {
  const { mutate: mutateCreateTicketEvent } = useCreateTicketEventMutation({
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return {
    mutateCreateTicketEvent,
  };
};
