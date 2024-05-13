import { useGetEventQuery } from '../api/useGetEventQuery';

export const useGetEvent = () => {
  const { data } = useGetEventQuery();
  console.log(data);
  return {
    data,
  };
};
