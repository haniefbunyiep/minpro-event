import { useMutation } from '@tanstack/react-query';
import { getCookie } from '@/utils/Cookies';
import axios from 'axios';

export const useKeepLoginMutation = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async () => {
      const cookie = await getCookie();

      return await axios.post(
        'http://localhost:8000/auth/login/keep-login',
        {},
        {
          headers: {
            accesstoken: cookie.value,
          },
        },
      );
    },
    onSuccess,
    onError,
  });

  return {
    mutate,
  };
};
