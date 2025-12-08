import { z } from 'zod';

export const getArticleSchema = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
});

export const listArticlesSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1).optional(),
    limit: z.coerce.number().int().positive().max(100).default(10).optional(),
    authorId: z.string().cuid().optional(),
  }),
});
