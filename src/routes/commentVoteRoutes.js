import { Router } from 'express';
import CommentVoteController from '../controllers/CommentVoteController.js';
import middlewares  from '../middlewares/index.js';

const router = Router();
const commentVoteController = new CommentVoteController();

router.post('/up', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, commentVoteController.createCommentUpVote);
router.post('/down', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, commentVoteController.createCommentDownVote);
router.put('/up', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, commentVoteController.updateCommentUpVote);
router.put('/down', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, commentVoteController.updateCommentDownVote);
router.delete('/up', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, commentVoteController.deleteCommentUpVote);
router.delete('/down', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, commentVoteController.deleteCommentDownVote);

export default router;