import { prisma } from '../../infrastructure/prisma/client.js';
import { ApiError } from '../../utils/api-error.js';
import { CreateAuthorDto, UpdateAuthorDto } from './dto';
import { AuthorWithArticleCount } from './types';

export class AuthorService {
  async findAll(): Promise<AuthorWithArticleCount[]> {
    return prisma.author.findMany({
      include: {
        _count: {
          select: { articles: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string): Promise<AuthorWithArticleCount> {
    const author = await prisma.author.findUnique({
      where: { id },
      include: {
        _count: {
          select: { articles: true },
        },
      },
    });

    if (!author) {
      throw ApiError.notFound('Author not found');
    }

    return author;
  }

  async create(data: CreateAuthorDto): Promise<AuthorWithArticleCount> {
    return prisma.author.create({
      data,
      include: {
        _count: {
          select: { articles: true },
        },
      },
    });
  }

  async update(id: string, data: UpdateAuthorDto): Promise<AuthorWithArticleCount> {
    await this.findById(id);

    return prisma.author.update({
      where: { id },
      data,
      include: {
        _count: {
          select: { articles: true },
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    const author = await this.findById(id);

    const articleCount = author._count.articles;
    if (articleCount > 0) {
      throw ApiError.badRequest(`Cannot delete author with ${articleCount} articles`);
    }

    await prisma.author.delete({ where: { id } });
  }
}

export const authorService = new AuthorService();
