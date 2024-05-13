import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstanceInterceptor } from './../utils/axiosInstanceInterceptor';

export const useGetRoleQuery = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['role'],
    queryFn: async () => {
      return await axiosInstanceInterceptor.get('/auth/role');
    },
  });
  return { data, isLoading, error };
};
