import { AuthorService } from '../author.service';
import { prisma } from '../../../prisma/client';
import { ApiError } from '../../../utils/ApiError';

// Mock Prisma client
jest.mock('../../../prisma/client', () => ({
  prisma: {
    author: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe('AuthorService', () => {
  let authorService: AuthorService;

  const mockAuthor = {
    id: 'author-1',
    name: 'John Doe',
    avatar: null,
    bio: 'A writer',
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: { articles: 0 },
  };

  beforeEach(() => {
    authorService = new AuthorService();
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all authors', async () => {
      (prisma.author.findMany as jest.Mock).mockResolvedValue([mockAuthor]);

      const result = await authorService.findAll();

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('John Doe');
    });
  });

  describe('findById', () => {
    it('should return author when found', async () => {
      (prisma.author.findUnique as jest.Mock).mockResolvedValue(mockAuthor);

      const result = await authorService.findById('author-1');

      expect(result).toEqual(mockAuthor);
    });

    it('should throw ApiError when not found', async () => {
      (prisma.author.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(authorService.findById('invalid-id')).rejects.toThrow(ApiError);
    });
  });

  describe('create', () => {
    it('should create a new author', async () => {
      (prisma.author.create as jest.Mock).mockResolvedValue(mockAuthor);

      const result = await authorService.create({
        name: 'John Doe',
        bio: 'A writer',
      });

      expect(result.name).toBe('John Doe');
    });
  });

  describe('delete', () => {
    it('should delete author when no articles exist', async () => {
      (prisma.author.findUnique as jest.Mock).mockResolvedValue(mockAuthor);
      (prisma.author.delete as jest.Mock).mockResolvedValue(mockAuthor);

      await authorService.delete('author-1');

      expect(prisma.author.delete).toHaveBeenCalledWith({ where: { id: 'author-1' } });
    });

    it('should throw ApiError when author has articles', async () => {
      const authorWithArticles = { ...mockAuthor, _count: { articles: 3 } };
      (prisma.author.findUnique as jest.Mock).mockResolvedValue(authorWithArticles);

      await expect(authorService.delete('author-1')).rejects.toThrow(ApiError);
    });
  });
});
