import { useEOLoginMutation } from './../api/useEOLoginMutation';
import { toast } from 'react-toastify';
import {
  setEOCookie,
  getRoleCookie,
  deleteRoleCookie,
} from './../utils/Cookies';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/supports/context/userContext';
import { useContext } from 'react';

export const useEOLogin = () => {
  const navigate = useRouter();
  const { userData, setUserData } = useContext(UserContext);

  const { mutate: mutationEOLogin } = useEOLoginMutation({
    onSuccess: async (res) => {
      const userRole = await getRoleCookie();
      if (userRole) {
        await deleteRoleCookie();
      }

      let nameResult = res.data.data.name;
      nameResult = nameResult.split(' ');

      await setEOCookie(res.data.data.accesstoken, true);

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
