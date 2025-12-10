import { z } from 'zod';

export const getAuthorSchema = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
});
