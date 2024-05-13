import { useLoginMutation } from './../api/useLoginMutation';
import { toast } from 'react-toastify';
import {
  setCookie,
  deleteEORoleCookie,
  getEORoleCookie,
} from './../utils/Cookies';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/supports/context/userContext';
import { useContext } from 'react';

export const useLogin = () => {
  const navigate = useRouter();
  const { userData, setUserData } = useContext(UserContext);

  const { mutate: mutationLogin } = useLoginMutation({
    onSuccess: async (res) => {
      const EORole = await getEORoleCookie();
      if (EORole) {
        await deleteEORoleCookie();
      }

      let nameResult = res.data.data.name;
      nameResult = nameResult.split(' ');

      await setCookie(res.data.data.accesstoken, true);

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
    mutationLogin,
  };
};
