import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetEventQuery = () => {
  const { data } = useQuery({
    queryKey: ['event'],
    queryFn: async () => {
      return await axios.get('http://localhost:8000/event/');
    },
  });
  return {
    data,
  };
};
