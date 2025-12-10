import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { AuthorService } from '../author.service';
import { ApiError } from '../../../utils/api-error.js';
import type { Author } from '@prisma/client';

// ESM-safe Jest mock
jest.mock('../../prisma/client.js', () => {
  const prisma = {
    author: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
  };
  return { prisma, default: { prisma } };
});

// IMPORT + CAST as mocked Prisma
import { prisma } from '../../prisma/client.js';
const mockedPrisma = prisma as jest.Mocked<typeof prisma>;

describe('AuthorService', () => {
  let authorService: AuthorService;

  const mockAuthor: Author & { _count: { articles: number } } = {
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
      mockedPrisma.author.findMany.mockResolvedValue([mockAuthor]);

      const result = await authorService.findAll();
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('John Doe');
    });
  });

  describe('findById', () => {
    it('should return author when found', async () => {
      mockedPrisma.author.findUnique.mockResolvedValue(mockAuthor);

      const result = await authorService.findById('author-1');
      expect(result).toEqual(mockAuthor);
    });

    it('should throw ApiError when not found', async () => {
      mockedPrisma.author.findUnique.mockResolvedValue(null);

      await expect(authorService.findById('invalid-id')).rejects.toThrow(ApiError);
    });
  });

  describe('create', () => {
    it('should create a new author', async () => {
      mockedPrisma.author.create.mockResolvedValue(mockAuthor);

      const result = await authorService.create({
        name: 'John Doe',
        bio: 'A writer',
      });

      expect(result.name).toBe('John Doe');
    });
  });

  describe('delete', () => {
    it('should delete the author if no articles exist', async () => {
      mockedPrisma.author.findUnique.mockResolvedValue(mockAuthor);
      mockedPrisma.author.delete.mockResolvedValue(mockAuthor);

      await authorService.delete('author-1');

      expect(mockedPrisma.author.delete).toHaveBeenCalledWith({
        where: { id: 'author-1' },
      });
    });

    // it('should throw ApiError if author has articles', async () => {
    //   mockedPrisma.author.findUnique.mockResolvedValue({
    //     ...mockAuthor,
    //     _count: { articles: 3 },
    //   });

    //   await expect(authorService.delete('author-1')).rejects.toThrow(ApiError);
    // });
  });
});
