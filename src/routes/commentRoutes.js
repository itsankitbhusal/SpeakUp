import { Router } from 'express';
import middlewares  from '../middlewares/index.js';
import CommentController  from '../controllers/CommentController.js';

const router = Router();
const commentController = new CommentController();

router.post('/', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, commentController.createComment);
router.get('/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, commentController.getCommentById);
router.put('/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, commentController.updateComment);
router.delete('/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, commentController.deleteComment);

export default router;