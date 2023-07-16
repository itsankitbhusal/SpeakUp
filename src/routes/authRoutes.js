import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';
import middlewares from '../middlewares/index.js';

const router = Router();
const authController = new AuthController();
router.post('/register', authController.addUser);
router.get('/verify/:token', authController.emailVerification);
router.post('/reset/:token', authController.resetVerification);
router.post('/login', authController.loginUser);
router.get('/token', authController.getNewAccessToken);
router.post('/forget', authController.resetPassword);

router.get('/users', middlewares.verifyAccessToken,middlewares.verifyRefreshToken, authController.getAllUsers);
router.put('/:id/admin', middlewares.verifyAccessToken,middlewares.verifyRefreshToken, authController.upgradeToAdmin);
router.get('/user/:handle', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, authController.getSingleUser);
router.get('/me', middlewares.verifyAccessToken,middlewares.verifyRefreshToken, authController.getMe);
router.delete('/user/:id',middlewares.verifyAccessToken, middlewares.verifyRefreshToken, authController.deleteUser);
router.put('/user/reset', middlewares.verifyAccessToken,middlewares.verifyRefreshToken, authController.resetPassword);

export default router;