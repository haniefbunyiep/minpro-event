import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useCreateTicketEventMutation = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async ({ eventId, name, price, quantity }) => {
      console.log('Mutate Triger');
      return await axios.post('http://localhost:8000/ticket/register', {
        eventId,
        name,
        price,
        quantity,
      });
    },
    onSuccess,
    onError,
  });
  return {
    mutate,
  };
};
