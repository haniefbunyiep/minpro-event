import { useQuery } from '@tanstack/react-query';
import { axiosInstanceInterceptor } from './../utils/axiosInstanceInterceptor';

export const useGetEventByEOIdQuery = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['EventEODashboard'],
    queryFn: async () => {
      return await axiosInstanceInterceptor.get('/event/dashboard');
    },
  });
  return {
    data,
    isLoading,
  };
};
