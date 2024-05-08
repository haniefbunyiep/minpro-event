import { useGetEventQuery } from '../api/useGetEventQuery';

export const useGetEvent = () => {
  const { data } = useGetEventQuery();

  return {
    data,
  };
};
