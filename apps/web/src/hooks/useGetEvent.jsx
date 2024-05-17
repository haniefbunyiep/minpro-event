import { useGetEventQuery } from '../api/useGetEventQuery';


export const useGetEvent = (city,category) => {
  const { data, isLoading } = useGetEventQuery(city, category);

  return {
    data,
    isLoading,
  };
};
