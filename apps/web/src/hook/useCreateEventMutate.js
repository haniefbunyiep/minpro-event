'use client';

import { useCreateEventMutation } from '../api/useCreateEventMutation';
// import toast from 'toast';

export const useCreateEventMutate = () => {
  const { mutate: mutateCreateEvent } = useCreateEventMutation({
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return {
    mutateCreateEvent,
  };
};
