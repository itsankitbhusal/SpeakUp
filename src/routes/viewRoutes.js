import { Router } from 'express';
import middlewares from '../middlewares/index.js';
import ViewController from '../controllers/ViewController.js';

const router = Router();
const viewController = new ViewController();

router.post('/', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, viewController.createView);
router.get('/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, viewController.getViewsByConfessionId);
router.get('/count/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, viewController.getTotalViewsByConfessionId);
router.get('/user/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, viewController.getViewsByUserId);
router.delete('/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, viewController.deleteView);

export default router;