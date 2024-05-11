import { useKeepLoginMutation } from '../api/useKeepLoginMutation';
import { toast } from 'react-toastify';
import { UserContext } from '@/supports/context/userContext';
import { useContext, useState } from 'react';

export const useKeepLogin = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [userName, setUserName] = useState(null);

  const { mutate: mutationKeepLogin } = useKeepLoginMutation({
    onSuccess: (res) => {
      let nameResult = res.data.data.name;
      nameResult = nameResult.split(' ');

      setUserData({
        session: res.data.data.session,
        name: nameResult[0],
        role: res.data.data.role,
      });
      // console.log(userName);
    },
    onError: (err) => {
      // console.log(err.response.data.message);
      // toast.error('Logout');
      // toast.success('Logout Success');
      console.log(err);
    },
  });

  return {
    mutationKeepLogin,
    userName,
  };
};
