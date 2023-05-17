import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';
import middlewares from '../middlewares/index.js';

const router = Router();
const authController = new AuthController();
router.post('/register', authController.addUser);
router.get('/verify/:token', authController.emailVerification);
router.post('/login', authController.loginUser);
router.post('/token', authController.getNewAccessToken);

router.get('/users', middlewares.verifyAccessToken,authController.getAllUsers);
router.get('/user/:id', middlewares.verifyAccessToken,authController.getSingleUser);
router.get('/me', middlewares.verifyAccessToken,authController.getMe);
router.delete('/user/:id',middlewares.verifyAccessToken, authController.deleteUser);
router.post('/user/reset', middlewares.verifyAccessToken, authController.resetPassword);

export default router;