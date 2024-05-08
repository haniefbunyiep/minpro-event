import { useQueries } from '@tanstack/react-query';
import axios from 'axios';

export const useGetCategoryQuery = () => {
  const [categoryQuery] = useQueries({
    queries: [
      {
        queryKey: ['category'],
        queryFn: async () => {
          return await axios.get('http://localhost:8000/category/');
        },
      },
    ],
  });
  return {
    categoryQuery,
  };
};
