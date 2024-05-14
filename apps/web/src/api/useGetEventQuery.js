import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetEventQuery = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['event'],
    queryFn: async () => {
      return await axios.get('http://localhost:8000/event/');
    },
  });
  return {
    data,
    isLoading,
  };
};
