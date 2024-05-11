import { useLoginMutation } from './../api/useLoginMutation';
import { toast } from 'react-toastify';
import { setCookie, getCookie } from './../utils/Cookies';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/supports/context/userContext';
import { useContext } from 'react';

export const useLogin = () => {
  const navigate = useRouter();
  const { userData, setUserData } = useContext(UserContext);
  const userRoleId = '1234';
  const adminRoleId = '5678';

  const { mutate: mutationLogin } = useLoginMutation({
    onSuccess: (res) => {
      console.log(res);
      let nameResult = res.data.data.name;
      nameResult = nameResult.split(' ');

      if (res.data.data.role == 3) {
        localStorage.setItem('usr', JSON.stringify({ role: userRoleId }));
      } else if (res.data.data.role == 1) {
        localStorage.setItem('usr', JSON.stringify({ role: adminRoleId }));
      }

      setCookie(res.data.data.accesstoken, true);
      setUserData({
        session: res.data.data.accesstoken,
        name: nameResult[0],
        role: res.data.data.role,
      });
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
