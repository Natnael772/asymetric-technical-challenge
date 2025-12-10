import { Router } from 'express';
import { articleRoutes } from '../modules/article/article.routes';
import { authorRoutes } from '../modules/authors/author.routes.js';

const router = Router();

router.use('/articles', articleRoutes);
router.use('/authors', authorRoutes);

export const routes = router;
