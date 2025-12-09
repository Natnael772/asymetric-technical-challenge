import { Router } from 'express';
import { articleController } from './article.controller.js';
import { validateRequest } from '../../middleware/validate-request.js';
import { asyncHandler } from '../../middleware/async-handler.js';

import {
  getArticleSchema,
  listArticlesSchema,
  createArticleSchema,
  updateArticleSchema,
} from './validators';

const router = Router();

router.get('/', validateRequest(listArticlesSchema), asyncHandler(articleController.getAll));

router.get('/:id', validateRequest(getArticleSchema), asyncHandler(articleController.getById));

router.post('/', validateRequest(createArticleSchema), asyncHandler(articleController.create));

router.patch('/:id', validateRequest(updateArticleSchema), asyncHandler(articleController.update));

router.delete('/:id', validateRequest(getArticleSchema), asyncHandler(articleController.delete));

export const articleRoutes = router;
