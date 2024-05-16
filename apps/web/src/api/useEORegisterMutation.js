import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';

export const useEORegisterMutation = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async ({ name, email, password, username }) => {
      return await axios.post(
        'http://localhost:8000/auth/register/event-organizer',
        {
          name,
          email,
          username,
          password,
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
