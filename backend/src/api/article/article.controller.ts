import { Request, Response } from 'express';
import { articleService } from './article.service';
import { successResponse } from '../../utils/api-response.js';
import { ArticleQueryDto, CreateArticleDto, UpdateArticleDto } from './dto';

export class ArticleController {
  async getAll(req: Request, res: Response): Promise<void> {
    const query: ArticleQueryDto = {
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      authorId: req.query.authorId as string | undefined,
    };

    const { articles, total, page, limit } = await articleService.findAll(query);

    res.status(200).json(
      successResponse(articles, {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      })
    );
  }

  async getById(req: Request, res: Response): Promise<void> {
    const article = await articleService.findById(req.params.id);
    res.status(200).json(successResponse(article));
  }

  async create(req: Request, res: Response): Promise<void> {
    const data: CreateArticleDto = req.body;
    const article = await articleService.create(data);
    res.status(201).json(successResponse(article));
  }

  async update(req: Request, res: Response): Promise<void> {
    const data: UpdateArticleDto = req.body;
    const article = await articleService.update(req.params.id, data);
    res.status(201).json(successResponse(article));
  }

  async delete(req: Request, res: Response): Promise<void> {
    await articleService.delete(req.params.id);
    res.status(204).send();
  }
}

export const articleController = new ArticleController();
