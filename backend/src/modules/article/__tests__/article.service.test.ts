import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { ArticleService } from '../article.service.js';
import { ApiError } from '../../../utils/api-error.js';

// ESM-safe Jest mock
jest.mock('../../prisma/client.js', () => {
  const prisma = {
    article: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    author: {
      findUnique: jest.fn(),
    },
  };

  return { prisma, default: { prisma } };
});

// IMPORT + CAST as mocked Prisma
import { prisma } from '../../prisma/client.js';
const mockedPrisma = prisma as jest.Mocked<typeof prisma>;

describe('ArticleService', () => {
  let articleService: ArticleService;

  const mockAuthor = {
    id: 'author-1',
    name: 'John Doe',
    avatar: null,
    bio: 'A writer',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockArticle = {
    id: '1',
    title: 'Test Article',
    excerpt: 'Short excerpt',
    content: 'Full content',
    htmlContent: null,
    imageUrl: null,
    readingTime: 5,
    publishedAt: new Date(),
    authorId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: [],
    author: mockAuthor,
  };

  beforeEach(() => {
    articleService = new ArticleService();
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return paginated articles', async () => {
      mockedPrisma.article.findMany.mockResolvedValue([mockArticle]);
      mockedPrisma.article.count.mockResolvedValue(1);

      const result = await articleService.findAll({ page: 1, limit: 10 });

      expect(result.articles).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should filter by authorId', async () => {
      mockedPrisma.article.findMany.mockResolvedValue([mockArticle]);
      mockedPrisma.article.count.mockResolvedValue(1);

      await articleService.findAll({ authorId: 'author-1' });

      expect(mockedPrisma.article.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { authorId: 'author-1' },
        })
      );
    });
  });

  describe('findById', () => {
    it('should return article when found', async () => {
      mockedPrisma.article.findUnique.mockResolvedValue(mockArticle);

      const result = await articleService.findById('article-1');
      expect(result).toEqual(mockArticle);
    });

    it('should throw error when not found', async () => {
      mockedPrisma.article.findUnique.mockResolvedValue(null);

      await expect(articleService.findById('invalid')).rejects.toThrow(ApiError);
    });
  });

  describe('create', () => {
    it('should create when author exists', async () => {
      mockedPrisma.author.findUnique.mockResolvedValue(mockAuthor);
      mockedPrisma.article.create.mockResolvedValue(mockArticle);

      const result = await articleService.create({
        title: 'Test Article',
        excerpt: 'This is a test',
        content: 'Full content here',
        publishedAt: new Date().toISOString(),
        authorId: 'author-1',
      });

      expect(result).toEqual(mockArticle);
    });

    it('should throw when author not found', async () => {
      mockedPrisma.author.findUnique.mockResolvedValue(null);

      await expect(
        articleService.create({
          title: 'Test Article',
          excerpt: 'This is a test',
          content: 'Full content here',
          publishedAt: new Date().toISOString(),
          authorId: 'invalid-author',
        })
      ).rejects.toThrow(ApiError);
    });
  });

  describe('delete', () => {
    it('should delete article', async () => {
      mockedPrisma.article.findUnique.mockResolvedValue(mockArticle);
      mockedPrisma.article.delete.mockResolvedValue(mockArticle);

      await articleService.delete('article-1');

      expect(mockedPrisma.article.delete).toHaveBeenCalledWith({
        where: { id: 'article-1' },
      });
    });
  });
});
