import { useQuery } from '@tanstack/react-query';
import { axiosInstanceInterceptor } from './../utils/axiosInstanceInterceptor';

export const getEventByIdQuery = (eventID) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['EventById', eventID],
    queryFn: async () => {
      return await axiosInstanceInterceptor.get(
        `/dashboard/event-organizer/event/${eventID}`,
      );
    },
  });
  return {
    data,
    isLoading,
    error,
    isError,
  };
};
