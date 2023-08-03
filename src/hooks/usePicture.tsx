import { InfiniteData, useQuery, useQueryClient } from '@tanstack/react-query';

import { usePictureOfTheDayKey } from '@/hooks/usePictureOfTheDay';
import {
  InfinitePictures,
  PictureItem,
  usePicturesKey,
} from '@/hooks/usePictures';

const usePicture = ({
  source,
  date,
}: {
  source: 'pictures' | 'pictureOfTheDay';
  date?: string;
}) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['picture'],
    queryFn: async () => {
      if (source === 'pictureOfTheDay') {
        return queryClient.getQueryData<PictureItem>(usePictureOfTheDayKey);
      }

      return queryClient
        .getQueryData<InfiniteData<InfinitePictures>>(usePicturesKey)
        ?.pages.flatMap((page) => page.data)
        ?.find((item) => item.date === date);
    },
  });
};

export default usePicture;
