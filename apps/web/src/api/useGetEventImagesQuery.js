import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetEventImagesQuery = () => {
  const { data } = useQuery({
    queryKey: ['event_images'],
    queryFn: async () => {
      return await axios.get('http://localhost:8000/event/test');
    },
  });
  return {
    data,
  };
};
