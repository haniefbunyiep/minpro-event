import { useGetEventAll } from '../api/useGetEventAllQuery';

export const useGetAllEvent = () => {
  const { data } = useGetEventAll();

  return {
    data,
  };
};
