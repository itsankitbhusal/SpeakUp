import { getTrendingConfessions } from '../recommendations/recommendationService.js';
import { Router } from 'express';
import middlewares from '../middlewares/index.js';

const router = Router();

router.get('/', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, getTrendingConfessions);

export default router;