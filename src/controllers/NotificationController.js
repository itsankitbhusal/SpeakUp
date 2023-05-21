import models from '../models/index.js';
import { message } from '../utils/index.js';
class NotificationController{
// create a new notification
  createNotification = async (req, res) => {
    const { notificationMessage, userId } = req.body;
    if (!userId || !notificationMessage) {
      return res.send(message.error('Missing required fields'));
    }
    try {
      // check if user exists
      const foundUser = await models.users.findByPk(userId);
      if (!foundUser) {
        return res.send(message.error('User not found'));
      }
      const newNotification = await models.notifications.create({
        user_id: userId,
        message: notificationMessage
      });
      delete newNotification.dataValues.user_id;
      delete newNotification.dataValues.is_viewed;
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
          user_id: userId
        },
        order: [
          ['created_at', 'DESC']
        ],
        attributes: {
          exclude: ['user_id']
        },
        include: {
          model: models.users,
          attributes: ['handle']
        }
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
        include: {
          model: models.users,
          attributes: ['handle']
        }
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