import { Router } from 'express';
import TagsController from '../controllers/TagsController.js';

const router = Router();

const tagsController = new TagsController();

router.get('/', tagsController.getAllTags);
router.post('/', tagsController.createTag);
router.get('/:id', tagsController.getSingleTag);
router.put('/:id', tagsController.updateTag);
router.delete('/:id', tagsController.deleteTag);

export default router;