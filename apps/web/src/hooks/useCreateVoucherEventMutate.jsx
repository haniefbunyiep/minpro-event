import { useCreateVoucherEventMutation } from '../api/useCreateVoucherEventMutation';

export const useCreateVoucherEventMutate = () => {
  const { mutate: mutateCreateVoucherEvent } = useCreateVoucherEventMutation({
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return {
    mutateCreateVoucherEvent,
  };
};
