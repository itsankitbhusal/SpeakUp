import models from '../models/index.js';
import message from '../utils/message.js';
import { commentMileStone, sanitizeInput } from '../utils/index.js';

class CommentController {
  // create comment
  createComment = async (req, res) => { 
    const { confessionId } = req.params;
    let { body } = req.body;
    // sanitize input
    body = await sanitizeInput(body);
    //   limit body to 300 characters
    body = await body.substring(0, 300);
    const { id:userId } = req.user;
    if (!body || !userId || !confessionId) {
      return res.send(message.error('Please fill all fields'));
    }
    try {
      const comment = await models.comments.create({
        body,
        user_id: userId,
        confession_id:confessionId
      });
      // count the total number of comments for this confession
      const totalComments = await models.comments.count({ where: { confession_id: confessionId } });
      const milestones = [1, 10, 50, 100, 1000, 10000, 100000, 1000000];
      
      if ( milestones.includes(totalComments)) {
        const confession = await models.confessions.findOne({ where: { id: confessionId } });
        const confessionTitle = confession.title.length > 50 ? `${ confession.title.substring(0, 50) }...` : confession.title;
        const milestone = commentMileStone(totalComments, confessionTitle);
        if (milestone) {
          await models.notifications.create({
            user_id: userId,
            message: milestone,
            confession_id: confessionId
          });
        }
      }
      return res.send(message.success(comment));
    } catch (error) {
      return res.send(message.error('Something went wrong'));
    }
  };
    
  // get comment by id
  getCommentById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.send(message.error('Missing id!'));
    }
    try {
      const comment = await models.comments.findByPk(id,
        {
          attributes: { exclude: ['user_id'] },
          include: [{
            model: models.users,
            attributes: ['handle']
          }]
        });
      return res.send(message.success(comment));
    }
    catch (err) {
      return res.send(message.error(err.message));
    }
  };
    
  // update comment
  updateComment = async (req, res) => { 
    const { id } = req.params;
    let { body } = req.body;
      
    //   first of all check if the comment id and user id match
    const { id:userId } = req.user;
    const comment = await models.comments.findOne({ where: { id } });
    if (comment?.user_id !== userId) {
      return res.send(message.error('You are not authorized to update this comment'));
    }
    //   sanitize input
    body = await sanitizeInput(body);
    //   limit body to 300 characters
    body = await body.substring(0, 300);
    if (!id || !body) {
      return res.send(message.error('Please fill all fields'));
    }
    try {
      const updatedComment = await models.comments.update(
        { body, updated_at: new Date() },
        { where: { id } }
      );
      return res.send(message.success(updatedComment));
    } catch (error) {
      return res.send(message.error('Something went wrong'));
    }
  };
    
  // delete comment
  deleteComment = async (req, res) => {
    const { id } = req.params;
    //   first of all check if the comment id and user id match
    const { id: userId, role } = req.user;
    
    const comment = await models.comments.findOne({ where: { id } });
    if (role !== 'admin') {
      if (comment?.user_id !== userId) {
        return res.send(message.error('You are not authorized to delete this comment'));
      }
    }
    try {
      const deletedComment = await models.comments.destroy({ where: { id } });
      return res.send(message.success(deletedComment));
    } catch (error) {
      return res.send(message.error('Something went wrong'));
    }
  };
  // get comments by confession id, with pagination and sorting by date desc
  getCommentsByConfessionId = async (req, res) => {
    const { confessionId } = req.params;
    // pagination
    const { page = 1, size = 5 } = req.query;
    
    const limit = parseInt(size, 10);
    const offset = (page - 1) * size;
    try {
      const comments = await models.comments.findAndCountAll({
        where: { confession_id: confessionId },
        attributes: { exclude: ['user_id'] },
        include: [{
          model: models.users,
          attributes: ['handle']
        }],
        order: [['created_at', 'DESC']],
        limit,
        offset
      });
      return res.send(message.success(comments));
    } catch (error) {
      return res.send(message.error('Something went wrong'));
    }
  };

}

export default CommentController;