import { useGetEventQuery } from '../api/useGetEventQuery';

export const useGetEvent = (city, category) => {
  const { data } = useGetEventQuery(city, category);

  return {
    data,
  };
};
