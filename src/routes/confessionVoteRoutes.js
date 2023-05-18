import { Router } from 'express';
import ConfessionVoteController from '../controllers/ConfessionVotesController.js';
import middlewares  from '../middlewares/index.js';

const router = Router();
const confessionVoteController = new ConfessionVoteController();

router.post('/up', middlewares.verifyAccessToken, confessionVoteController.createConfessionUpVote);
router.post('/down', middlewares.verifyAccessToken, confessionVoteController.createConfessionDownVote);
router.put('/up', middlewares.verifyAccessToken, confessionVoteController.updateConfessionUpVote);
router.put('/down', middlewares.verifyAccessToken, confessionVoteController.updateConfessionDownVote);
router.delete('/up', middlewares.verifyAccessToken, confessionVoteController.deleteConfessionUpVote);
router.delete('/down', middlewares.verifyAccessToken, confessionVoteController.deleteConfessionDownVote);

export default router;