import { Router } from 'express';
import middlewares from '../middlewares/index.js';
import ViewController from '../controllers/ViewController.js';

const router = Router();
const viewController = new ViewController();

router.post('/', middlewares.verifyAccessToken, viewController.createView);
router.get('/:id', middlewares.verifyAccessToken, viewController.getViewsByConfessionId);
router.get('/count/:id', middlewares.verifyAccessToken, viewController.getTotalViewsByConfessionId);
router.get('/user/:id', middlewares.verifyAccessToken, viewController.getViewsByUserId);
router.delete('/:id', middlewares.verifyAccessToken, viewController.deleteView);

export default router;