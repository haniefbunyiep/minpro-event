import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetEventQuery = (city, category) => {
  const { data } = useQuery({
    queryKey: ['event', city, category],
    queryFn: async () => {
      return await axios.get(`http://localhost:8000/event?`, {
        params: {
          city: city[0],
          category: category[0],
        },
      });
    },
  });
  return {
    data,
  };
};
