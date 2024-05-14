import { useGetEventByEOIdQuery } from './../api/useGetEventByEOIdQuery';

export const useGetEventByEOId = () => {
  const { data: eventInfo, isLoading, error } = useGetEventByEOIdQuery();

  return { eventInfo, isLoading, error };
};
