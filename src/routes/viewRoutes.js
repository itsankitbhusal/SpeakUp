import { Router } from 'express';
import middlewares from '../middlewares/index.js';
import ViewController from '../controllers/ViewController.js';

const router = Router();
const viewController = new ViewController();

router.post('/:confessionId', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, viewController.createView);
router.get('/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, viewController.getViewsByConfessionId);
router.get('/count/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, viewController.getTotalViewsByConfessionId);
router.get('/user/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, viewController.getViewsByUserId);
router.get('/user/confession/:cid', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, viewController.getConfessionViewsByUserId);
router.delete('/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, viewController.deleteView);

export default router;