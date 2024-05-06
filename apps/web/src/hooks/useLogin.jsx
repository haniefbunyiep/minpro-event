import { useLoginMutation } from './../api/useLoginMutation';
import { toast } from 'react-toastify';
import { setCookie } from './../utils/Cookies';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/supports/context/userContext';
import { useContext } from 'react';

export const useLogin = () => {
  const navigate = useRouter();
  const { userData, setUserData } = useContext(UserContext);

  const { mutate: mutationLogin } = useLoginMutation({
    onSuccess: (res) => {
      setCookie(res.data.data.accestoken);
      setUserData({ session: res.data.data.accestoken });
      toast.success(res.data.message);
      navigate.push('/');
    },
    onError: (err) => {
      // console.log(err.response.data.message);
      toast.error(err.response.data.message);
    },
  });

  return {
    mutationLogin,
  };
};
