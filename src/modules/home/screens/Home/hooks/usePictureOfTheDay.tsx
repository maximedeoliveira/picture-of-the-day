import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { z } from 'zod';

import { api } from '@/services/api';

const schema = z.object({
  date: z.string(),
  explanation: z.string(),
  hdurl: z.string(),
  media_type: z.enum(['image']),
  service_version: z.enum(['v1']),
  title: z.string(),
  url: z.string(),
});

const usePictureOfTheDay = () => {
  return useQuery({
    queryKey: ['picture-of-the-day'],
    queryFn: async () => {
      const response = await api({
        params: {
          date: dayjs().format('YYYY-MM-DD'),
        },
      });

      return schema.parse(response);
    },
  });
};

export default usePictureOfTheDay;
