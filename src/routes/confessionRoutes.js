import { Router } from 'express';
import ConfessionController from '../controllers/ConfessionController.js';
import middlewares  from '../middlewares/index.js';

const router = Router();
const confessionController = new ConfessionController();

router.get('/', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionController.getAllApprovedConfessions);
router.post('/', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionController.createConfession);
router.get('/pending', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionController.getAllPendingConfessions);
router.get('/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionController.getConfessionById);
router.put('/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionController.updateConfessionById);
router.delete('/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionController.deleteConfessionById);
router.put('/:id/approve', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionController.approveConfessionById);

// get confession by user
router.post('/user/:id?', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionController.getConfessionsByUserId);

// get confession by user handle
router.post('/user/handle/:handle?', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, confessionController.getConfessionsByUserHandle);

export default router;