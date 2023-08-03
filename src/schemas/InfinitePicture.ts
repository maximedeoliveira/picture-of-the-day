import { z } from 'zod';

import { pictureSchema } from '@/schemas/Picture';

export const infinitePictureSchema = z.object({
  data: z.array(pictureSchema),
  meta: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }),
});

export type InfinitePictures = z.infer<typeof infinitePictureSchema>;
