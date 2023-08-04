import { InfiniteData, useQuery, useQueryClient } from '@tanstack/react-query';

import { pictureByDateKey } from '@/hooks/usePictureByDate';
import { picturesKey } from '@/hooks/usePictures';
import { InfinitePictures } from '@/schemas/InfinitePicture';
import { Picture } from '@/schemas/Picture';

/**
 * This hook is used to retrieve an item from tanstack query cache using source
 * parameter to know in which query to search
 * @param source
 * @param date
 */
const usePicture = ({
  source,
  date,
}: {
  source: 'picture' | 'pictures';
  date?: string;
}) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['picture', { source, date }],
    queryFn: async () => {
      if (source === 'picture') {
        return queryClient.getQueryData<Picture>(pictureByDateKey(date!));
      }

      return queryClient
        .getQueryData<InfiniteData<InfinitePictures>>(picturesKey)
        ?.pages.flatMap((page) => page.data)
        ?.find((item) => item.date === date);
    },
  });
};

export default usePicture;
