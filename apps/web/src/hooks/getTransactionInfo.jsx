import { getTransactionInfoQuery } from '../api/getTransactionInfoQuery';

export const getTransactionInfo = (eventId, ticketId, ticketQty) => {
  const {
    data: getTransaction,
    isLoading,
    error,
    isError,
  } = getTransactionInfoQuery(eventId, ticketId, ticketQty);

  return {
    getTransaction,
    isLoading,
    error,
    isError,
  };
};
