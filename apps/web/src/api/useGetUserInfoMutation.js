import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstanceInterceptor } from './../utils/axiosInstanceInterceptor';

export const useGetUserInfoQuery = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['userDashboard'],
    queryFn: async () => {
      return await axiosInstanceInterceptor.get('/dashboard/user');
    },
  });
  return { data, isLoading, error };
};
