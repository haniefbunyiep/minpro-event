import { useGetEventImagesQuery } from '../api/useGetEventImagesQuery';

export const useGetEventImages = () => {
  const { data } = useGetEventImagesQuery();

  return {
    data,
  };
};
