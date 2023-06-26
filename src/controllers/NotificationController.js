import models from '../models/index.js';
import { message } from '../utils/index.js';
import { sanitizeInput } from '../utils/confessionUtils.js';
class NotificationController{
// create a new notification
  createNotification = async (req, res) => {
    const { userId, confessionId } = req.body;
    let { notificationMessage } = req.body;
    if (!userId || !notificationMessage) {
      return res.send(message.error('Missing required fields'));
    }
    notificationMessage = await sanitizeInput(notificationMessage);
    // limit notification message to 150 characters
    notificationMessage = await notificationMessage.substring(0, 150);
    try {
      // check if user exists
      const foundUser = await models.users.findByPk(userId);
      if (!foundUser) {
        return res.send(message.error('User not found'));
      }
      const newNotification = await models.notifications.create({
        user_id: userId,
        confession_id: confessionId,
        message: notificationMessage
      });
      delete newNotification.dataValues.user_id;
      return res.send(message.success(newNotification));
    } catch (error) {
      res.send(message.error(error.message));
    }
  };
  // get user notifications
  getNotificationsByUserId = async (req, res) => {
    const { id: userId } = req.params;
    if (!userId) {
      return res.send(message.error('Missing required fields'));
    }
    try {
      // check if user exists
      const foundUser = await models.users.findByPk(userId);
      if (!foundUser) {
        return res.send(message.error('User not found'));
      }
      const notifications = await models.notifications.findAll({
        where: {
          user_id: userId,
          is_viewed: false
        },
        order: [
          ['created_at', 'DESC']
        ],
        attributes: {
          exclude: ['user_id', 'confession_id']
        },
        include: [{
          model: models.users,
          attributes: ['handle']
        }, {
          model: models.confessions,
          attributes: ['id', 'title', 'is_approved']
        }]
      });
      return res.send(message.success(notifications));
    } catch (error) {
      res.send(message.error(error.message));
    }
  };
  // get notification by id
  getNotificationById = async (req, res) => { 
    const { id: notificationId } = req.params;
    if (!notificationId) {
      return res.send(message.error('Missing required fields'));
    }
    try {
      const notification = await models.notifications.findByPk(notificationId, {
        attributes: {
          exclude: ['user_id']
        },
        include: [
          {
            model: models.users,
            attributes: ['handle']
          },
          {
            model: models.confessions,
            attributes: ['id', 'title', 'is_approved']
          }
        ]
      });
      if (!notification) {
        return res.send(message.error('Notification not found'));
      }
      return res.send(message.success(notification));
    } catch (error) {
      res.send(message.error(error.message));
    }
  };

  // update notification
  updateNotificationViewedStatus = async (req, res) => { 
    const { id: notificationId } = req.params;
    if (!notificationId) {
      return res.send(message.error('Missing required fields'));
    }
    try {
      // check if notification exists
      const foundNotification = await models.notifications.findByPk(notificationId);
      if (!foundNotification) {
        return res.send(message.error('Notification not found'));
      }
      await models.notifications.update({ is_viewed: true }, {
        where: { id: notificationId } 
      });
      return res.send(message.success('Notification updated successfully'));
    } catch (error) {
      res.send(message.error(error.message));
    }
  };

  // delete notification
  deleteNotification = async (req, res) => { 
    const { id: notificationId } = req.params;
    if (!notificationId) {
      return res.send(message.error('Missing required fields'));
    }
    try {
      // check if notification exists
      const foundNotification = await models.notifications.findByPk(notificationId);
      if (!foundNotification) {
        return res.send(message.error('Notification not found'));
      }
      await models.notifications.destroy({
        where: { id: notificationId } 
      });
      return res.send(message.success('Notification deleted successfully'));
    }
    catch (error) {
      res.send(message.error(error.message));
    }
  };
}

export default NotificationController;