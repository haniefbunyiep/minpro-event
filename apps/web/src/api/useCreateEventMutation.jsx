'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useCreateEventMutation = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async (fd) => {
      return await axios.post('http://localhost:8000/event/create-event', fd);
    },
    onSuccess,
    onError,
  });
  return {
    mutate,
  };
};
