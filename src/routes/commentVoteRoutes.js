import { Router } from 'express';
import CommentVoteController from '../controllers/CommentVoteController.js';
import middlewares  from '../middlewares/index.js';

const router = Router();
const commentVoteController = new CommentVoteController();

router.post('/up', middlewares.verifyAccessToken, commentVoteController.createCommentUpVote);
router.post('/down', middlewares.verifyAccessToken, commentVoteController.createCommentDownVote);
router.put('/up', middlewares.verifyAccessToken, commentVoteController.updateCommentUpVote);
router.put('/down', middlewares.verifyAccessToken, commentVoteController.updateCommentDownVote);
router.delete('/up', middlewares.verifyAccessToken, commentVoteController.deleteCommentUpVote);
router.delete('/down', middlewares.verifyAccessToken, commentVoteController.deleteCommentDownVote);

export default router;