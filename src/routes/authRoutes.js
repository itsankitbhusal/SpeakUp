import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';

const router = Router();
const authController = new AuthController();
router.post('/register', authController.addUser);
router.get('/verify/:token', authController.verifyUser);
router.post('/login', authController.loginUser);

export default router;