import { useEORegisterMutation } from '../api/useEORegisterMutation';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export const useEORegister = () => {
  const navigate = useRouter();
  const { mutate: mutationEORegister } = useEORegisterMutation({
    onSuccess: (res) => {
      //   console.log(res.data.message);
      console.log(res);
      toast.success(res.data.message);
      navigate.push('/');
    },
    onError: (err) => {
      //   console.log(err.response.data.message);
      // toast.error(err.response.data.message);
      console.log(err);
    },
  });

  return {
    mutationEORegister,
  };
};
