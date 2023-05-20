import { Router } from 'express';
import middlewares from '../middlewares/index.js';
import ReportingController from '../controllers/ReportingController.js';

const router = Router();
const reportingController = new ReportingController();

router.get('/', middlewares.verifyAccessToken, reportingController.getAllReportings);
router.get('/:id', middlewares.verifyAccessToken, reportingController.getReportingById);
router.post('/', middlewares.verifyAccessToken, reportingController.createReporting);
router.put('/:id', middlewares.verifyAccessToken, reportingController.updateReporting);
router.delete('/:id', middlewares.verifyAccessToken, reportingController.deleteReporting);

router.get('/user/:id', middlewares.verifyAccessToken, reportingController.getAllReportingsByReporterId);
router.get('/object/:id', middlewares.verifyAccessToken, reportingController.getAllReportingsByReportedObjectType);
router.get('/resolved/:id', middlewares.verifyAccessToken, reportingController.getAllReportingsByResolvedStatus);

export default router;