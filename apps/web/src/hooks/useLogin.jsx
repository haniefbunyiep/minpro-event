import { useLoginMutation } from './../api/useLoginMutation';
import { toast } from 'react-toastify';
import { setCookie } from './../utils/Cookies';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const navigate = useRouter();

  const { mutate: mutationLogin } = useLoginMutation({
    onSuccess: (res) => {
      setCookie(res.data.data.accestoken);
      toast.success(res.data.message);
      navigate.push('/');
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return {
    mutationLogin,
  };
};
