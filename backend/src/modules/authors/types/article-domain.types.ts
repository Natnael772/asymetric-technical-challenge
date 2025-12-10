import { Author } from '@prisma/client';

export type AuthorWithArticleCount = Author & { _count: { articles: number } };
