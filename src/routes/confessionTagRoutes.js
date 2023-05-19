import { Router } from 'express';
import ConfessionTagController from '../controllers/ConfessionTagController.js';
import middleware from '../middlewares/index.js';

const router = Router();
const confessionTagController = new ConfessionTagController();

router.post('/', middleware.verifyAccessToken, confessionTagController.createConfessionTag);
router.delete('/', middleware.verifyAccessToken, confessionTagController.deleteConfessionTag);
router.get('/:id', middleware.verifyAccessToken, confessionTagController.getTagsByConfessionId);
router.get('/tag/:id', middleware.verifyAccessToken, confessionTagController.getConfessionsByTagId);

export default router;