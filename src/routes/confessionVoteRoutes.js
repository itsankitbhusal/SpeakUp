import { Router } from 'express';
import ConfessionVotesController from '../controllers/ConfessionVotesController.js';
import middlewares  from '../middlewares/index.js';

const router = Router();
const confessionVotesController = new ConfessionVotesController();

router.post('/up', middlewares.verifyAccessToken, confessionVotesController.createConfessionUpVote);
router.post('/down', middlewares.verifyAccessToken, confessionVotesController.createConfessionDownVote);
router.put('/up', middlewares.verifyAccessToken, confessionVotesController.updateConfessionUpVote);
router.put('/down', middlewares.verifyAccessToken, confessionVotesController.updateConfessionDownVote);
router.delete('/up', middlewares.verifyAccessToken, confessionVotesController.deleteConfessionUpVote);
router.delete('/down', middlewares.verifyAccessToken, confessionVotesController.deleteConfessionDownVote);

export default router;