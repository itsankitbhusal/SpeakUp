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

// get all confession votes
router.get('/', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionVoteController.getAllConfessionVotes);
// get confession by user id logged one
router.get('/user/:id?', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionVoteController.getConfessionVoteByUserId);
// get getConfessionVoteByConfessionId
router.get('/confession/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionVoteController.getConfessionVoteByConfessionId);
// get vote count by confession id
router.get('/count/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionVoteController.getConfessionVoteCountByConfessionId);
export default router;