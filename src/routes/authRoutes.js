import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';
import { verifyAccessToken, verifyRefreshToken } from '../middlewares/authMiddleware.js';

const router = Router();
const authController = new AuthController();
router.post('/register', authController.addUser);
router.get('/verify/:token', authController.emailVerification);
router.post('/login', authController.loginUser);
router.post('/token', authController.getNewAccessToken);

// router.post('/test', verifyAccessToken, (req, res) => {
//   res.send('protected route');
// });


export default router;