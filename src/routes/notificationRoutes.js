import { Router } from 'express';
import middlewares from '../middlewares/index.js';
import NotificationController from '../controllers/NotificationController.js';

const router = Router();
const notificationController = new NotificationController();

router.post('/', middlewares.verifyAccessToken, notificationController.createNotification);
router.get('/user/:id', middlewares.verifyAccessToken, notificationController.getNotificationsByUserId);
router.get('/:id', middlewares.verifyAccessToken, notificationController.getNotificationById);
router.put('/:id', middlewares.verifyAccessToken, notificationController.updateNotificationViewedStatus);
router.delete('/:id', middlewares.verifyAccessToken, notificationController.deleteNotification);

export default router;