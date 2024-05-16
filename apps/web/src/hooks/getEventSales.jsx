import { getEventSalesQuery } from './../api/getEventSales';

export const getEventSales = (eventId, month, year) => {
  const {
    data: getEventSalesInfo,
    isLoading,
    error,
    isError,
  } = getEventSalesQuery(eventId, month, year);

  return {
    getEventSalesInfo,
    isLoading,
    error,
    isError,
  };
};
