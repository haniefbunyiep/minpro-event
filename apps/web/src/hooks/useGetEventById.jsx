import { useGetEventByIdQuery } from '../api/useGetEventById';

export const useGetEventByIdMutate = (id) => {
  const { data } = useGetEventByIdQuery(id);
  console.log(data);
  return {
    data,
  };
};
