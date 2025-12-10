import { Article, Author } from '@prisma/client';

export type ArticleWithAuthor = Article & { author: Author };
