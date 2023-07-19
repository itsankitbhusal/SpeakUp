import models from '../models/index.js';
import message from '../utils/message.js';
import { reportMessage, sanitizeInput } from '../utils/index.js';

class ReportingController {
  // create reporting
  createReporting = async (req, res) => {
    const { reportType, description } = req.body;
    let { confessionId, commentId } = req.body;
    if (!reportType || !description) {
      return res.send(message.error('Missing required fields'));
    }
    //   check if confessionId or commentId is available as one of them is required
    if (!confessionId && !commentId) {
      return res.send(message.error('Missing required fields'));
    }
    try {
      // get userId from access token
      const { id: userId } = req.user;
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
        reporter_id: userId,
        reported_object_type: reportType,
        confession_id: confessionId,
        comment_id: commentId,
        description: sanitizedDescription
      });
      // create notification for the user who created the confession
      if (reportType === 'confession') {
        const confession = await models.confessions.findOne({ where: { id: confessionId } });
        const confessionTitle = confession.title.length > 50 ? `${ confession.title.substring(0, 50) }...` : confession.title;
        const confessionUserId = confession.user_id;
        const confessionMessage = reportMessage('confession', confessionTitle);
        if (confessionMessage) {
          await models.notifications.create({
            user_id: confessionUserId,
            message: confessionMessage,
            confession_id: confessionId
          });
        }
      } if (reportType == 'comment') {
        const comment = await models.comments.findOne({ where: { id: commentId } });
        const commentTrimmed = comment.body.length > 50 ? `${ comment.body.substring(0, 50) }...` : comment.body;
        const commentUserId = comment.user_id;
        const commentMessage = reportMessage('comment', commentTrimmed);
        if (commentMessage) {
          await models.notifications.create({
            user_id: commentUserId,
            message: commentMessage
          });
        }
      }
      
      return res.send(message.success(reporting));
    }
    catch (error) {
      return res.send(message.error(error.message));
    }
  };
  // get all reportings
  getAllReportings = async (req, res) => {
    try {
      const reportings = await models.reportings.findAll({
        order: [['created_at', 'DESC']]
      });
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
        { is_resolved: true, updated_at: new Date() },
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
        where: { reporter_id: id },
        order: [['created_at', 'DESC']]
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
        where: { reported_object_type: id, is_resolved: false },
        order: [['created_at', 'DESC']]
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
  // resolve reporting by id and object type
  resolveCommentReporting = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.send(message.error('Missing required fields'));
    }
    try {
      // first check if the comment with the id exists in reporting table
      const existingReporting = await models.reportings.findOne({ where: { id } });
      if (!existingReporting) {
        return res.send(message.error('Reporting not found'));
      }
      if (existingReporting.reported_object_type !== 'comment') {
        return res.send(message.error('Invalid reported object type'));
      }
      const resolvedComment = await models.reportings.update({ is_resolved: true, updated_at: new Date() }, { where: { id } });
      console.log('resolbed comment', resolvedComment);
      return res.send(message.success(resolvedComment));
    } catch (error) {
      return res.send(message.error(error.message));
    }
  };
  // resolve confession reporting
  resolveConfessionReporting = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.send(message.error('Missing required fields'));
    }
    try {
      // first check if the confession with the id exists in reporting table
      const existingReporting = await models.reportings.findOne({ where: { id } });
      if (!existingReporting) {
        return res.send(message.error('Reporting not found'));
      }
      if (existingReporting.reported_object_type !== 'confession') {
        return res.send(message.error('Invalid reported object type'));
      }

      const resolvedConfession = await models.reportings.update({ is_resolved: true, updated_at: new Date() }, { where: { id } });
      return res.send(message.success(resolvedConfession));
    } catch (error) {
      return res.send(message.error(error.message));
    }
  };
}

export default ReportingController;