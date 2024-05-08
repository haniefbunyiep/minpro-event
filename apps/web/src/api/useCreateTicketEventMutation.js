import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useCreateTicketEventMutation = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async ({ name, price, quantity, eventId }) => {
      return await axios.post('http://localhost:8000/ticket/register', {
        name,
        price,
        quantity,
        eventId,
      });
    },
    onSuccess,
    onError,
  });
  return {
    mutate,
  };
};
