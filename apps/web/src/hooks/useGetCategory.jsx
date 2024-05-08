import { useGetCategoryQuery } from '../api/useGetCategoryQuery';

export const useGetCategory = () => {
  const { categoryQuery, locationQuery } = useGetCategoryQuery();

  return {
    dataCategory: categoryQuery?.data?.data?.data,
    dataLocation: locationQuery?.data?.data?.data,
  };
};
