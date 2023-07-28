import { getMostViewedConfessions } from '../recommendations/recommendationService.js';
import { Router } from 'express';
import middlewares from '../middlewares/index.js';

const router = Router();

router.get('/', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, getMostViewedConfessions);

export default router;