import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useLoginMutation = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async ({ email, password }) => {
      return await axios.post('http://localhost:8000/auth/login', {
        email,
        password,
      });
    },
    onSuccess,
    onError,
  });

  return {
    mutate,
  };
};
