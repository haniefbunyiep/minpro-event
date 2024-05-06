import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { getCookie } from './../utils/Cookies';

export const useReferralCodeMutation = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async ({ useReferral }) => {
      console.log(useReferral);
      const cookie = await getCookie();

      return await axios.post(
        'http://localhost:8000/auth/use-referral',
        {
          useReferral,
        },
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
