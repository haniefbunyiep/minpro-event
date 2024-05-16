import { getEventByIdQuery } from '../api/getEventByIdQuery';

export const getEventbyId = (id) => {
  const { data: getEvent, isLoading, error, isError } = getEventByIdQuery(id);

  return {
    getEvent,
    isLoading,
    error,
    isError,
  };
};
