import { Router } from 'express';
import ConfessionVoteController from '../controllers/ConfessionVotesController.js';
import middlewares  from '../middlewares/index.js';

const router = Router();
const confessionVoteController = new ConfessionVoteController();

router.post('/up/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionVoteController.createConfessionUpVote);
router.post('/down/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionVoteController.createConfessionDownVote);
router.put('/up/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionVoteController.updateConfessionUpVote);
router.put('/down/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionVoteController.updateConfessionDownVote);
router.delete('/up/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionVoteController.deleteConfessionUpVote);
router.delete('/down/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionVoteController.deleteConfessionDownVote);

export default router;