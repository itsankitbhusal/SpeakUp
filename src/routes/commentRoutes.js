import { Router } from 'express';
import middlewares  from '../middlewares/index.js';
import CommentController  from '../controllers/CommentController.js';

const router = Router();
const commentController = new CommentController();

router.post('/', middlewares.verifyAccessToken, commentController.createComment);
router.get('/:id', middlewares.verifyAccessToken, commentController.getCommentById);
router.put('/:id', middlewares.verifyAccessToken, commentController.updateComment);
router.delete('/:id', middlewares.verifyAccessToken, commentController.deleteComment);

export default router;