import { Router } from 'express';
import TagsController from '../controllers/TagsController.js';

const router = Router();

const tagsController = new TagsController();

// chaining routes
router.route('/')
  .get(tagsController.getAllTags)
  .post(tagsController.createTag);
  
router.route('/:id')
  .get(tagsController.getSingleTag)
  .put(tagsController.updateTag)
  .delete(tagsController.deleteTag);

export default router;