import models from '../models/index.js';
import message from '../utils/message.js';
import { sanitizeInput } from '../utils/index.js';

class ReportingController{
  // create reporting
  createReporting = async (req, res) => {
    const { reportType, description } = req.body;
    let {  confessionId, commentId } = req.body;
    if (!reportType || !description) {
      return res.send(message.error('Missing required fields'));
    }
    //   check if confessionId or commentId is available as one of them is required
    if (!confessionId && !commentId) {
      return res.send(message.error('Missing required fields'));
    }
    try {
      // get userId from access token
      const { id:userId } = req.user;
      if (!userId) {
        return res.send(message.error('Reporter not found'));
      }
      // first sanitize the input
      const sanitizedDescription = await sanitizeInput(description);
      // limit to 300 characters
      if (sanitizedDescription.length > 300) {
        return res.send(message.error('Description should be less than 300 characters'));
      }
      if (reportType !== 'confession' && reportType !== 'comment') {
        return res.send(message.error('Invalid report type'));
      }
      // if one report type is confession then commentId should be null
      if (reportType === 'confession') {
        commentId = null;
        if (!confessionId) {
          return res.send(message.error('Missing required fields'));
        }
      }
      // if one report type is comment then confessionId should be null
      if (reportType === 'comment') {
        confessionId = null;
        if (!commentId) {
          return res.send(message.error('Missing required fields'));
        }
      }
      // check if the reporter has already reported the same object
      const existingReporting = await models.reportings.findOne({
        where: {
          reporter_id: userId,
          reported_object_type: reportType,
          confession_id: confessionId,
          comment_id: commentId
        }
      });
      if (existingReporting) {
        return res.send(message.error('You have already reported this object'));
      }
      const reporting = await models.reportings.create({
        reporter_id: reporterId,
        reported_object_type: reportType,
        confession_id: confessionId,
        comment_id: commentId,
        description: sanitizedDescription
      });
      return res.send(message.success( reporting));
    }
    catch (error) {
      return res.send(message.error(error.message));
    }
  };
  // get all reportings
  getAllReportings = async (req, res) => {
    try {
      const reportings = await models.reportings.findAll();
      return res.send(message.success(reportings));
    } catch (error) {
      res.send(message.error(error.message));
    }
  };
  // get reporting by id
  getReportingById = async (req, res) => {
    const { id } = req.params;
    try {
      const reporting = await models.reportings.findOne({ where: { id } });
      return res.send(message.success(reporting));
    } catch (error) {
      return res.send(message.error(error.message));
    }
  };
  // update reporting is_resolved
  updateReporting = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.send(message.error('Missing required fields'));
    }
    try {
      const reporting = await models.reportings.update(
        { is_resolved: true },
        { where: { id } }
      );
      return res.send(message.success(reporting));
    } catch (error) {
      return res.send(message.error(error.message));
    }
  };
  // delete reporting
  deleteReporting = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.send(message.error('Missing required fields'));
    }
    try {
      const reporting = await models.reportings.destroy({ where: { id } });
      return res.send(message.success(reporting));
    } catch (error) {
      return res.send(message.error(error.message));
    }
  };
  // get all reportings by reporter id
  getAllReportingsByReporterId = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.send(message.error('Missing required fields'));
    }
    try {
      const reportings = await models.reportings.findAll({
        where: { reporter_id: id }
      });
      return res.send(message.success(reportings));
    } catch (error) {
      return res.send(message.error(error.message));
    }
  };

  // get reportings by reported object type
  getAllReportingsByReportedObjectType = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.send(message.error('Missing required fields'));
    }
    // check id is confession or comment
    if (id !== 'confession' && id !== 'comment') {
      return res.send(message.error('Invalid reported object type'));
    }
    try {
      const reportings = await models.reportings.findAll({
        where: { reported_object_type: id }
      });
      return res.send(message.success(reportings));
    } catch (error) {
      return res.send(message.error(error.message));
    }
  };
  // get all reportings by resolved ssatus
  getAllReportingsByResolvedStatus = async (req, res) => {
    let { id } = req.params;
    if (!id) {
      return res.send(message.error('Missing required fields'));
    }
    // check id is confession or comment
    if (id !== 'true' && id !== 'false') {
      return res.send(message.error('Invalid resolved status'));
    }
    if (id === 'true') {
      id = true;
    } else {
      id = false;
    }
    try {
      const reportings = await models.reportings.findAll({
        where: { is_resolved: id }
      });
      return res.send(message.success(reportings));
    } catch (error) {
      return res.send(message.error(error.message));
    }
  };
}

export default ReportingController;