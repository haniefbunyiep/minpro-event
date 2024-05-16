import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetEventByIdQuery = (eventID) => {
  const { data } = useQuery({
    queryKey: ['event', eventID],
    queryFn: async () => {
      return await axios.get(`http://localhost:8000/event/${eventID}`);
    },
  });
  return {
    data,
  };
};
