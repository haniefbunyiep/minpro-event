import { useGetCategoryQuery } from '../api/useGetCategoryQuery';

export const useGetCategory = () => {
  const { categoryQuery, locationQuery, ticketQuery } = useGetCategoryQuery();

  return {
    dataCategory: categoryQuery?.data?.data?.data,
    dataLocation: locationQuery?.data?.data?.data,
    dataTicket: ticketQuery?.data?.data?.data,
  };
};
