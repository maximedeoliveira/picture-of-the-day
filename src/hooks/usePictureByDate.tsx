import { useQuery } from '@tanstack/react-query';

import { pictureSchema } from '@/schemas/Picture';
import { api } from '@/services/api';

export const pictureByDateKey = (date: string) => ['picture-by-date', { date }];

export const fetchPictureByDate = async (date: string) => {
  const response = await api({
    params: {
      date: date,
    },
  });

  return pictureSchema.parse(response);
};

const usePictureByDate = (date?: string) => {
  return useQuery({
    queryKey: pictureByDateKey(date!),
    queryFn: () => fetchPictureByDate(date!),
    enabled: !!date,
  });
};

export default usePictureByDate;
