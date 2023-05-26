import { Router } from 'express';
import ConfessionTagController from '../controllers/ConfessionTagController.js';
import middlewares from '../middlewares/index.js';

const router = Router();
const confessionTagController = new ConfessionTagController();

router.post('/:confessionId/:tagId', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionTagController.createConfessionTag);
router.delete('/:confessionId/:tagId', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionTagController.deleteConfessionTag);
router.get('/:confessionId', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionTagController.getTagsByConfessionId);
router.get('/tag/:tagId', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionTagController.getConfessionsByTagId);

export default router;