import models from '../models/index.js';
import message from '../utils/message.js';
import { sanitizeInput } from '../utils/index.js';

class CommentController {
  // create comment
  createComment = async (req, res) => { 
    const { confessionId } = req.body;
    let { body } = req.body;
    // sanitize input
    body = await sanitizeInput(body);
    //   limit body to 300 characters
    body = await body.substring(0, 300);
    //   get userId from req.user handle 
    const { handle } = req.user;
    const user = await models.users.findOne({ where: { handle } });
    const userId = user.id;
      
    if (!body || !userId || !confessionId) {
      return res.send(message.error('Please fill all fields'));
    }
    try {
      const comment = await models.comments.create({
        body,
        user_id: userId,
        confession_id:confessionId
      });
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
    const { handle } = req.user;
    const user = await models.users.findOne({ where: { handle } });
    const userId = user?.id;
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
        { body },
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
    const { handle } = req.user;
    const user = await models.users.findOne({ where: { handle } });
    const userId = user?.id;
    const comment = await models.comments.findOne({ where: { id } });
    if (comment?.user_id !== userId) {
      return res.send(message.error('You are not authorized to delete this comment'));
    }
    try {
      const deletedComment = await models.comments.destroy({ where: { id } });
      return res.send(message.success(deletedComment));
    } catch (error) {
      return res.send(message.error('Something went wrong'));
    }
  };

}

export default CommentController;