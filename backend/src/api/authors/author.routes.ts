import { Router } from 'express';
import { authorController } from './author.controller';
import { validateRequest } from '../../middleware/validate-request';
import { asyncHandler } from '../../middleware/async-handler';
import { createAuthorSchema, getAuthorSchema, updateAuthorSchema } from './validators';

const router = Router();

router.get('/', asyncHandler(authorController.getAll));

router.get('/:id', validateRequest(getAuthorSchema), asyncHandler(authorController.getById));

router.post('/', validateRequest(createAuthorSchema), asyncHandler(authorController.create));

router.patch('/:id', validateRequest(updateAuthorSchema), asyncHandler(authorController.update));

router.delete('/:id', validateRequest(getAuthorSchema), asyncHandler(authorController.delete));

export const authorRoutes = router;
