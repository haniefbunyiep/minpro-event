import { useGetEventQuery } from '../api/useGetEventQuery';

export const useGetEvent = () => {
  const { data, isLoading } = useGetEventQuery();

  return {
    data,
    isLoading,
  };
};
