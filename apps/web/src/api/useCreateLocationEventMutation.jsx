import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useCreateLocationEventMutation = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async ({ address, city, zip }) => {
      return await axios.post('http://localhost:8000/location/new', {
        address,
        city,
        zip,
      });
    },
    onSuccess,
    onError,
  });
  return {
    mutate,
  };
};
