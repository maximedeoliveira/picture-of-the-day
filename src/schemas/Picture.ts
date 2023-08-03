import { z } from 'zod';

export const pictureSchema = z.object({
  date: z.string(),
  explanation: z.string(),
  hdurl: z.string(),
  media_type: z.enum(['image']),
  service_version: z.enum(['v1']),
  title: z.string(),
  url: z.string(),
  copyright: z.string().optional(),
});

export type Picture = z.infer<typeof pictureSchema>;
