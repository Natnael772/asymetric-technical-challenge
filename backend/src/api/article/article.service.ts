import { prisma } from '../../infrastructure/prisma/client';
import { ApiError } from '../../utils/api-error';
import { CreateArticleDto, UpdateArticleDto, ArticleQueryDto } from './dto';
import { ArticleWithAuthor } from './types/article-domain.types';

export class ArticleService {
  async findAll(query: ArticleQueryDto): Promise<{
    articles: ArticleWithAuthor[];
    total: number;
    page: number;
    limit: number;
  }> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where = query.authorId ? { authorId: query.authorId } : {};

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
        include: { author: true },
      }),
      prisma.article.count({ where }),
    ]);

    return { articles, total, page, limit };
  }

  async findById(id: string): Promise<ArticleWithAuthor> {
    const article = await prisma.article.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!article) {
      throw ApiError.notFound('Article not found');
    }

    return article;
  }

  async create(data: CreateArticleDto): Promise<ArticleWithAuthor> {
    const author = await prisma.author.findUnique({
      where: { id: data.authorId },
    });

    if (!author) {
      throw ApiError.badRequest('Author not found');
    }

    return prisma.article.create({
      data: {
        ...data,
        publishedAt: new Date(data.publishedAt),
      },
      include: { author: true },
    });
  }

  async update(id: string, data: UpdateArticleDto): Promise<ArticleWithAuthor> {
    await this.findById(id);

    return prisma.article.update({
      where: { id },
      data: {
        ...data,
        ...(data.publishedAt && { publishedAt: new Date(data.publishedAt) }),
      },
      include: { author: true },
    });
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await prisma.article.delete({ where: { id } });
  }
}

export const articleService = new ArticleService();
