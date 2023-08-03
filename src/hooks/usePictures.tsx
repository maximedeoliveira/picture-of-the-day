import { useInfiniteQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { z } from 'zod';

import { api } from '@/services/api';

const itemSchema = z.object({
  date: z.string(),
  explanation: z.string(),
  media_type: z.enum(['image', 'video']),
  service_version: z.enum(['v1']),
  title: z.string(),
  url: z.string(),
  hdurl: z.string().optional(),
  copyright: z.string().optional(),
});

const schema = z.object({
  data: z.array(itemSchema),
  meta: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }),
});

export type PictureItem = z.infer<typeof itemSchema>;
export type InfinitePictures = z.infer<typeof schema>;

const LIMIT = 10;
const DATE_FORMAT = 'YYYY-MM-DD';

export const usePicturesKey = ['pictures'];

const usePictures = () => {
  return useInfiniteQuery({
    queryKey: usePicturesKey,
    queryFn: async ({ pageParam = dayjs() }) => {
      const startDate = pageParam.subtract(LIMIT, 'days');
      const endDate = pageParam;

      const response = await api({
        params: {
          start_date: startDate.format(DATE_FORMAT),
          end_date: endDate.format(DATE_FORMAT),
        },
      });

      return schema.parse({
        data: response,
        meta: {
          startDate: startDate.format(DATE_FORMAT),
          endDate: endDate.format(DATE_FORMAT),
        },
      });
    },
    getNextPageParam: (lastPage) => {
      // Return undefined means, there is no other page
      if (!lastPage?.meta?.startDate) return undefined;

      return dayjs(lastPage.meta.startDate, DATE_FORMAT).subtract(1, 'day');
    },
    // Remove non-image items & reverse data array
    select: (data) => ({
      pages: data.pages.map((page) => ({
        ...page,
        data: page.data.filter((item) => item.media_type === 'image').reverse(),
      })),
      pageParams: [...data.pageParams].reverse(),
    }),
  });
};

export default usePictures;
