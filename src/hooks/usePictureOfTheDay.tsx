import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { pictureSchema } from '@/schemas/Picture';
import { api } from '@/services/api';

export const pictureOfTheDayKey = ['picture-of-the-day'];

const usePictureOfTheDay = () => {
  return useQuery({
    queryKey: pictureOfTheDayKey,
    queryFn: async () => {
      const response = await api({
        params: {
          date: dayjs().format('YYYY-MM-DD'),
        },
      });

      return pictureSchema.parse(response);
    },
  });
};

export default usePictureOfTheDay;
