import models from '../models/index.js';
import message from '../utils/message.js';
import { Op } from 'sequelize';

class AnalyticsController{
  // user growth rate
  getGrowthRate = async (req, res) => {
    try{
      const date = [];
      const growthRate = [];
      for (let i = 0; i < 12; i++) {
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - (i + 1) * 7);
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date();
        endOfWeek.setDate(endOfWeek.getDate() - i * 7);
        endOfWeek.setHours(23, 59, 59, 999);

        const weekUserCount = await models.users.count({
          where: {
            created_at: {
              [Op.between]: [startOfWeek, endOfWeek]
            }
          }
        });
        date.push(startOfWeek.toLocaleDateString());
        growthRate.push(weekUserCount);
      }
      // now return the data in reverse order
      for (let i = 0; i < date.length; i++) {
        date[i] = `Week ${ i + 1 }`;
      }
      // reverse growth rate
      growthRate.reverse();
      return res.send(message.success({
        date,
        growthRate
      }));
    } catch (error) {
      res.send(message.error(error.message));
    }
  };
  // user role distribution
  userRoleDistribution = async (req, res) => {
    try {
      const userRoleDistribution = await models.users.findAndCountAll({
        attributes: ['role'],
        group: ['role']
      });

      return res.send(message.success(userRoleDistribution.count));
    } catch (error) {
      res.send(message.error(error.message));
    }
  };

  // user verification status
  verificationStatus = async (req, res) => {
    try {
      const verificationStatus = await models.users.findAndCountAll({
        attributes: ['is_verified'],
        group: ['is_verified']
      });

      return res.send(message.success(verificationStatus.count));
    } catch (error) {
      res.send(message.error(error.message));
    }
  };
  // confession approval status
  confessionApprovalStatus = async (req, res) => {
    try {
      const confessionApprovalStatus = await models.confessions.findAndCountAll({
        attributes: ['is_approved'],
        group: ['is_approved']
      });

      return res.send(message.success(confessionApprovalStatus.count));
    } catch (error) {
      res.send(message.error(error.message));
    }
  };
  // up/down vote ratio
  upDownVoteRatio = async (req, res) => {
    try {
      const upDownVoteRatio = await models.confessionVotes.findAndCountAll({
        attributes: ['vote_type'],
        group: ['vote_type']
      });

      return res.send(message.success(upDownVoteRatio.count));

    } catch (error) {
      res.send(message.error(error.message));
    }
  };
}

export default AnalyticsController;