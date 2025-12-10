import { z } from 'zod';

export const createArticleSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').max(255),
    excerpt: z.string().min(1, 'Excerpt is required'),
    content: z.string().min(1, 'Content is required'),
    htmlContent: z.string().optional(),
    imageUrl: z.string().url().optional(),
    readingTime: z.number().int().positive().optional(),
    publishedAt: z.string().datetime(),
    authorId: z.string().cuid(),
  }),
});

export const updateArticleSchema = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
  body: z.object({
    title: z.string().min(1).max(255).optional(),
    excerpt: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    htmlContent: z.string().optional(),
    imageUrl: z.string().url().optional(),
    readingTime: z.number().int().positive().optional(),
    publishedAt: z.string().datetime().optional(),
  }),
});
