import { useQuery } from '@tanstack/react-query';
import { axiosInstanceInterceptor } from '../utils/axiosInstanceInterceptor';

export const getEventSalesQuery = (eventId, month, year) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['EventSales', eventId, month, year],
    queryFn: async () => {
      return await axiosInstanceInterceptor.get(
        // `/dashboard/event-organizer/sales?event=${eventId}`,
        `/dashboard/event-organizer/sales?event=${eventId}&month=${month}&year=${year}`,
      );
    },
  });

  // console.log(error);
  return {
    data,
    isLoading,
    error,
    isError,
  };
};
