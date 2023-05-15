import { Router } from 'express';
import ConfessionController from '../controllers/ConfessionController.js';
import { verifyAccessToken } from '../middlewares/authMiddleware.js';

const router = Router();
const confessionController = new ConfessionController();

router.get('/', verifyAccessToken,confessionController.getAllApprovedConfessions);
router.post('/', verifyAccessToken,confessionController.createConfession);
router.get('/:id', verifyAccessToken, confessionController.getConfessionById);
router.put('/:id', verifyAccessToken, confessionController.updateConfessionById);
router.delete('/:id', verifyAccessToken, confessionController.deleteConfessionById);

export default router;