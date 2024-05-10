import axios from 'axios';
import { useEffect, useState } from 'react';
import { getCookie } from './../utils/Cookies';
import { useGetUserInfoQuery } from '@/api/useGetUserInfoMutation';

export const getUserHooks = () => {
  const [userDashboard, setUserDashboard] = useState(null);

  const handleFetch = async () => {
    const cookie = await getCookie();
    try {
      const res = await axios.post(
        'http://localhost:8000/dashboard/user',
        {},
        {
          headers: {
            accesstoken: cookie.value,
          },
        },
      );
      setUserDashboard({ data: res });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { handleFetch };
};
