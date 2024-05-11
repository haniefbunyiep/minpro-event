'use client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useEOVerificationEmailMutation = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async ({ accesstoken }) => {
      return await axios.post(
        'http://localhost:8000/auth/register/eo-verification',
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
