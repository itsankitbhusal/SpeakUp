import { Router } from 'express';
import AnalyticsController from '../controllers/AnalyticsController.js';
import middlewares from '../middlewares/index.js';

const router = Router();
const analyticsController = new AnalyticsController();

router.get('/growth-rate', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, analyticsController.getGrowthRate);
router.get('/roles', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, analyticsController.userRoleDistribution);
router.get('/verification', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, analyticsController.verificationStatus);
router.get('/confession-approval', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, analyticsController.confessionApprovalStatus);
router.get('/up-down', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, analyticsController.upDownVoteRatioOver12Weeks);

export default router;