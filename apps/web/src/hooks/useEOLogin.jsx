import { useEOLoginMutation } from './../api/useEOLoginMutation';
import { toast } from 'react-toastify';
import { setCookie } from './../utils/Cookies';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/supports/context/userContext';
import { useContext } from 'react';

export const useEOLogin = () => {
  const navigate = useRouter();
  const { userData, setUserData } = useContext(UserContext);

  const { mutate: mutationEOLogin } = useEOLoginMutation({
    onSuccess: (res) => {
      setCookie(res.data.data.accesstoken);
      setUserData({ session: res.data.data.accestoken });
      toast.success(res.data.message);
      navigate.push('/');
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return {
    mutationEOLogin,
  };
};
