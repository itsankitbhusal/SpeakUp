import { Router } from 'express';
import ConfessionVoteController from '../controllers/ConfessionVotesController.js';
import middlewares  from '../middlewares/index.js';

const router = Router();
const confessionVoteController = new ConfessionVoteController();

router.post('/up', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionVoteController.createConfessionUpVote);
router.post('/down', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionVoteController.createConfessionDownVote);
router.put('/up', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionVoteController.updateConfessionUpVote);
router.put('/down', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionVoteController.updateConfessionDownVote);
router.delete('/up', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionVoteController.deleteConfessionUpVote);
router.delete('/down', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionVoteController.deleteConfessionDownVote);

export default router;