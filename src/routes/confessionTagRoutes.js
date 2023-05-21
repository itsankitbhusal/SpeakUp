import { Router } from 'express';
import ConfessionTagController from '../controllers/ConfessionTagController.js';
import middlewares from '../middlewares/index.js';

const router = Router();
const confessionTagController = new ConfessionTagController();

router.post('/', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionTagController.createConfessionTag);
router.delete('/', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionTagController.deleteConfessionTag);
router.get('/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionTagController.getTagsByConfessionId);
router.get('/tag/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionTagController.getConfessionsByTagId);

export default router;