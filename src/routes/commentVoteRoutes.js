import { Router } from 'express';
import CommentVoteController from '../controllers/CommentVoteController.js';
import middlewares  from '../middlewares/index.js';

const router = Router();
const commentVoteController = new CommentVoteController();

router.post('/up/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, commentVoteController.createCommentUpVote);
router.post('/down/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, commentVoteController.createCommentDownVote);
router.put('/up/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, commentVoteController.updateCommentUpVote);
router.put('/down/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, commentVoteController.updateCommentDownVote);
router.delete('/up/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, commentVoteController.deleteCommentUpVote);
router.delete('/down/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, commentVoteController.deleteCommentDownVote);

// get vote count by comment id
router.get('/count/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, commentVoteController.getCommentVoteCountByCommentId);
// get comment vote by user id logged one
router.get('/comment/:commentId', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, commentVoteController.getCommentVoteByUserId);

export default router;