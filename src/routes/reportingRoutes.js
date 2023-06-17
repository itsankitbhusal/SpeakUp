import { Router } from 'express';
import middlewares from '../middlewares/index.js';
import ReportingController from '../controllers/ReportingController.js';

const router = Router();
const reportingController = new ReportingController();

router.get('/', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, reportingController.getAllReportings);
router.get('/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, reportingController.getReportingById);
router.post('/', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, reportingController.createReporting);
router.put('/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, reportingController.updateReporting);
router.delete('/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, reportingController.deleteReporting);

router.get('/user/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, reportingController.getAllReportingsByReporterId);
router.get('/object/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, reportingController.getAllReportingsByReportedObjectType);
router.get('/resolved/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, reportingController.getAllReportingsByResolvedStatus);

router.put('/resolve/comment/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, reportingController.resolveCommentReporting);
router.put('/resolve/confession/:id', middlewares.verifyAccessToken, middlewares.verifyRefreshToken, reportingController.resolveConfessionReporting);
export default router;