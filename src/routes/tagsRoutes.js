import { Router } from 'express';
import middlewares from '../middlewares/index.js';
import TagsController from '../controllers/TagsController.js';

const router = Router();

const tagsController = new TagsController();

router.get('/', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, tagsController.getAllTags); 
router.post('/', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, tagsController.createTag);
router.get('/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, tagsController.getSingleTag);
router.put('/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, tagsController.updateTag);
router.delete('/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, tagsController.deleteTag);
export default router;