import { Router } from 'express';
import middlewares from '../middlewares/index.js';
import NotificationController from '../controllers/NotificationController.js';

const router = Router();
const notificationController = new NotificationController();

router.post('/', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, notificationController.createNotification);
router.get('/user/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, notificationController.getNotificationsByUserId);
router.get('/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, notificationController.getNotificationById);
router.put('/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, notificationController.updateNotificationViewedStatus);
router.delete('/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, notificationController.deleteNotification);

export default router;