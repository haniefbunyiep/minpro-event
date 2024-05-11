import { useEOLoginMutation } from './../api/useEOLoginMutation';
import { toast } from 'react-toastify';
import { setEOCookie } from './../utils/Cookies';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/supports/context/userContext';
import { useContext } from 'react';

export const useEOLogin = () => {
  const navigate = useRouter();
  const { userData, setUserData } = useContext(UserContext);

  const { mutate: mutationEOLogin } = useEOLoginMutation({
    onSuccess: (res) => {
      let nameResult = res.data.data.name;
      nameResult = nameResult.split(' ');

      setEOCookie(res.data.data.accesstoken, true);

      setUserData({
        session: res.data.data.accesstoken,
        name: nameResult[0],
        role: res.data.data.role,
      });
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
