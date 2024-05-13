'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { axiosInstanceInterceptor } from './../utils/axiosInstanceInterceptor';

export const useCreateEventMutation = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async (fd) => {
      return await axiosInstanceInterceptor.post('/event/create-event', fd);
    },
    onSuccess,
    onError,
  });
  return {
    mutate,
  };
};
