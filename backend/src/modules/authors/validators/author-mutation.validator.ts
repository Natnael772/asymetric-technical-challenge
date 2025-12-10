import { z } from 'zod';

export const createAuthorSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').max(100),
    avatar: z.string().url().optional(),
    bio: z.string().max(500).optional(),
  }),
});

export const updateAuthorSchema = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    avatar: z.string().url().optional(),
    bio: z.string().max(500).optional(),
  }),
});
