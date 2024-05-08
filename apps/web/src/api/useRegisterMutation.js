import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useRegisterMutation = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async ({ name, email, username, password, useReferral }) => {
      return await axios.post('http://localhost:8000/auth/register', {
        name,
        email,
        username,
        password,
        useReferral,
      });
    },
    onSuccess,
    onError,
  });

  return {
    mutate,
  };
};
