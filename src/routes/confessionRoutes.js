import { Router } from 'express';
import ConfessionController from '../controllers/ConfessionController.js';
import middlewares  from '../middlewares/index.js';

const router = Router();
const confessionController = new ConfessionController();

router.get('/', middlewares.verifyAccessToken,confessionController.getAllApprovedConfessions);
router.post('/', middlewares.verifyAccessToken,confessionController.createConfession);
router.get('/:id', middlewares.verifyAccessToken, confessionController.getConfessionById);
router.put('/:id', middlewares.verifyAccessToken, confessionController.updateConfessionById);
router.delete('/:id', middlewares.verifyAccessToken, confessionController.deleteConfessionById);
router.post('/pending', middlewares.verifyAccessToken, confessionController.getAllPendingConfessions);
router.put('/:id/approve', middlewares.verifyAccessToken, confessionController.approveConfessionById);


export default router;