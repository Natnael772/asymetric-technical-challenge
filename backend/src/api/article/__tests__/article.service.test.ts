import { ArticleService } from '../article.service.js';
import { prisma } from '../../../prisma/client.js';
import { ApiError } from '../../../utils/ApiError.js';

// Mock Prisma client
jest.mock('../../../prisma/client.js', () => ({
  prisma: {
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
  },
}));

// Type the mocked prisma client for proper TypeScript support
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
    id: 'article-1',
    title: 'Test Article',
    excerpt: 'This is a test',
    content: 'Full content here',
    htmlContent: null,
    imageUrl: null,
    readingTime: 5,
    publishedAt: new Date(),
    authorId: 'author-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    author: mockAuthor,
  };

  beforeEach(() => {
    articleService = new ArticleService();
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return paginated articles', async () => {
      (mockedPrisma.article.findMany as jest.Mock).mockResolvedValue([mockArticle]);
      (mockedPrisma.article.count as jest.Mock).mockResolvedValue(1);

      const result = await articleService.findAll({ page: 1, limit: 10 });

      expect(result.articles).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
    });

    it('should filter by authorId', async () => {
      (mockedPrisma.article.findMany as jest.Mock).mockResolvedValue([mockArticle]);
      (mockedPrisma.article.count as jest.Mock).mockResolvedValue(1);

      await articleService.findAll({ authorId: 'author-1' });

      expect(prisma.article.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { authorId: 'author-1' },
        })
      );
    });
  });

  describe('findById', () => {
    it('should return article when found', async () => {
      (mockedPrisma.article.findUnique as jest.Mock).mockResolvedValue(mockArticle);

      const result = await articleService.findById('article-1');

      expect(result).toEqual(mockArticle);
    });

    it('should throw ApiError when not found', async () => {
      (mockedPrisma.article.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(articleService.findById('invalid-id')).rejects.toThrow(ApiError);
    });
  });

  describe('create', () => {
    it('should create article when author exists', async () => {
      (mockedPrisma.author.findUnique as jest.Mock).mockResolvedValue(mockAuthor);
      (mockedPrisma.article.create as jest.Mock).mockResolvedValue(mockArticle);

      const result = await articleService.create({
        title: 'Test Article',
        excerpt: 'This is a test',
        content: 'Full content here',
        publishedAt: new Date().toISOString(),
        authorId: 'author-1',
      });

      expect(result).toEqual(mockArticle);
    });

    it('should throw ApiError when author not found', async () => {
      (mockedPrisma.author.findUnique as jest.Mock).mockResolvedValue(null);

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
    it('should delete article when found', async () => {
      (mockedPrisma.article.findUnique as jest.Mock).mockResolvedValue(mockArticle);
      (mockedPrisma.article.delete as jest.Mock).mockResolvedValue(mockArticle);

      await articleService.delete('article-1');

      expect(prisma.article.delete).toHaveBeenCalledWith({ where: { id: 'article-1' } });
    });
  });
});
