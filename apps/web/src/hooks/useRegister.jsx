import { useRegisterMutation } from '../api/useRegisterMutation';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export const useRegister = () => {
  const navigate = useRouter();
  const { mutate: mutationRegister } = useRegisterMutation({
    onSuccess: (res) => {
      //   console.log(res.data.message);
      toast.success(res.data.message);
      navigate.push('/');
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
