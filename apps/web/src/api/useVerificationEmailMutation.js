'use client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useVerificationEmailMutation = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async ({ accesstoken }) => {
      return await axios.post(
        'http://localhost:8000/auth/register/user-verification',
        {},
        {
          headers: {
            accesstoken: accesstoken,
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
