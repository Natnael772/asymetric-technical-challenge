import { Request, Response } from 'express';
import { authorService } from './author.service';
import { successResponse } from '../../utils/api-response';
import { CreateAuthorDto, UpdateAuthorDto } from './dto';

export class AuthorController {
  async getAll(_req: Request, res: Response): Promise<void> {
    const authors = await authorService.findAll();
    res.json(successResponse(authors));
  }

  async getById(req: Request, res: Response): Promise<void> {
    const author = await authorService.findById(req.params.id);
    res.json(successResponse(author));
  }

  async create(req: Request, res: Response): Promise<void> {
    const data: CreateAuthorDto = req.body;
    const author = await authorService.create(data);
    res.status(201).json(successResponse(author));
  }

  async update(req: Request, res: Response): Promise<void> {
    const data: UpdateAuthorDto = req.body;
    const author = await authorService.update(req.params.id, data);
    res.json(successResponse(author));
  }

  async delete(req: Request, res: Response): Promise<void> {
    await authorService.delete(req.params.id);
    res.status(204).send();
  }
}

export const authorController = new AuthorController();
