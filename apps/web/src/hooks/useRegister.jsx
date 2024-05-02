import { useRegisterMutation } from '../api/useRegisterMutation';
import { toast } from 'react-toastify';

export const useRegister = () => {
  const { mutate: mutationRegister } = useRegisterMutation({
    onSuccess: (res) => {
      //   console.log(res.data.message);
      toast.success(res.data.message);
    },
    onError: (err) => {
      //   console.log(err.response.data.message);
      toast.error(err.response.data.message);
    },
  });

  return {
    mutationRegister,
  };
};
