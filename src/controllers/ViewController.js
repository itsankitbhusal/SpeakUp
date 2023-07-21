import models from '../models/index.js';
import message from '../utils/message.js';

class ViewController{
  // create view
  createView = async (req, res) => {
    const { confessionId } = req.params;
    const { id:userId } = req.user;
    if (!confessionId) {
      return res.send(message.error('Confession id is required'));
    }
    try {  
      const view = await models.views.findOrCreate({
        where: { user_id: userId, confession_id: confessionId }
      });
      return res.send(message.success(view));
    } catch (error) {
      res.send(message.error(error.message));
    }
  };
    // get views by cionfession id
  getViewsByConfessionId = async (req, res) => { 
    const { id: confessionId } = req.params;
    if (!confessionId) {
      return res.send(message.error('Confession id is required'));
    }
    try {
      const views = await models.views.findAll({
        where: { confession_id: confessionId }
      });
      if (!views) {
        return res.send(message.error('Views not found'));
      }
      return res.send(message.success(views));
    } catch (error) {
      res.send(message.error(error.message));
    }
  };
    
  // get total views by confession id
  getTotalViewsByConfessionId = async (req, res) => {
    const { id: confessionId } = req.params;
    if (!confessionId) {
      return res.send(message.error('Confession id is required'));
    }
    try {
      const totalViews = await models.views.count({ where: { confession_id: confessionId } });
      if (!totalViews) {
        return res.send(message.error('Views not found'));
      }
      return res.send(message.success(totalViews));
    }
    catch (error) {
      res.send(message.error(error.message));
    }
  };
    // get views by user id
  getViewsByUserId = async (req, res) => {
    const { id: userId } = req.params;
    if (!userId) {
      return res.send(message.error('User id is required'));
    }
    try {
      // first check if user exists
      const user = await models.users.findOne({ where: { id: userId } });
      if (!user) {
        return res.send(message.error('User not found'));
      }
      const views = await models.views.findAll({
        where: { user_id: userId }
      });
      if (!views) {
        return res.send(message.error('Views not found'));
      }
      return res.send(message.success(views));
    }
    catch (error) {
      res.send(message.error(error.message));
    }
  };
  // find if user has viewed confession
  getConfessionViewsByUserId = async (req, res) => {
    const { cid } = req.params;
    const { id: userId } = req.user;
    if (!cid) {
      return res.send(message.error('Confession id is required'));
    }
    try {
      // check if user has created views
      const views = await models.views.findOne({ where: { user_id: userId, confession_id: cid } });
      if (!views) {
        return res.send(message.error('Views not found'));
      }
      return res.send(message.success(views));
    }
    catch (error) {
      res.send(message.error(error.message));
    }
  };
  
  // delete view by id
  deleteView = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.send(message.error('View id is required'));
    }
    try {
      const view = await models.views.findOne({ where: { id } });
      if (!view) {
        return res.send(message.error('View not found'));
      }
      const deletedView = await models.views.destroy({ where: { id } });
      if (!deletedView) {
        return res.send(message.error('View not deleted'));
      }
      return res.send(message.success('View deleted successfully'));
    }
    catch (error) {
      res.send(message.error(error.message));
    }
  };
}

export default ViewController;