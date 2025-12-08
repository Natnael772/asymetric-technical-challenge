import { Router } from 'express';
import { articleRoutes } from '../api/article/article.routes';
import { authorRoutes } from '../api/authors/author.routes.js';

const router = Router();

router.use('/articles', articleRoutes);
router.use('/authors', authorRoutes);

export const routes = router;
