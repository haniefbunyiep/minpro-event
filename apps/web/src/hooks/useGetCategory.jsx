import { useGetCategoryQuery } from '../api/useGetCategoryQuery';

export const useGetCategory = () => {
  const { categoryQuery } = useGetCategoryQuery();

  return {
    dataCategory: categoryQuery?.data?.data?.data,
  };
};
