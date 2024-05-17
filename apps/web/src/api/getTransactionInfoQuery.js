import { useQuery } from '@tanstack/react-query';
import { axiosInstanceInterceptor } from '../utils/axiosInstanceInterceptor';

export const getTransactionInfoQuery = (eventId, ticketId, ticketQty) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['TransactionInfo', eventId, ticketId, ticketQty],
    queryFn: async () => {
      return await axiosInstanceInterceptor.get(
        `/transaction?event=${eventId}&ticket=${ticketId}&qty=${ticketQty}`,
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
