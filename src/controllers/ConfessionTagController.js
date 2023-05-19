import models from '../models/index.js';
import { message } from '../utils/index.js';

class ConfessionTagController{
  // create confession tag
  createConfessionTag = async (req, res) => { 
    const { confessionId, tagId } = req.body;
    if (!confessionId || !tagId) {
      return res.send(message.error('Missing required fields'));
    }
    try {
      const confessionTag = await models.confessionTags.create({
        confession_id: confessionId,
        tag_id: tagId
      });
      return res.send(message.success(confessionTag));
    } catch (error) {
      return res.send(message.error(error.message));
    }
  };
    
  // delete confession tag
  deleteConfessionTag = async (req, res) => { 
    const { confessionId, tagId } = req.body;
    if (!confessionId || !tagId) {
      return res.send(message.error('Missing required fields'));
    }
    try {
      const deleteConfessionTag = await models.confessionTags.destroy({
        where: {
          confession_id: confessionId,
          tag_id: tagId
        }
      });
      if (deleteConfessionTag) {
        return res.send(message.success('Delete confession tag successfully'));
      }else{
        return res.send(message.error('Delete confession tag failed'));
      }
    } catch (error) {
      res.send(message.error(error.message));
    }
  };
  // get tags by confession id
  getTagsByConfessionId = async (req, res) => {
    const { id: confessionId } = req.params;
    if (!confessionId) {
      return res.send(message.error('Missing required fields'));
    }
    try {
      const allTags = await models.confessionTags.findAll({
        where: {
          confession_id: confessionId
        },
        attributes: {
          exclude: ['confession_id', 'tag_id']
        },
        include: {
          model: models.tags,
          attributes: ['name']
        }
      });
      return res.send(message.success(allTags));
    } catch (error) {
      res.send(message.error(error.message));
    }
  };
  // get all confessions associated with a tag
  getConfessionsByTagId = async (req, res) => {
    const { id: tagId } = req.params;
    if (!tagId) {
      return res.send(message.error('Missing required fields'));
    }
    try {
      const allConfessions = await models.confessionTags.findAll({
        where: {
          tag_id: tagId
        },
        attributes: {
          exclude: ['confession_id', 'tag_id']
        },
        include: {
          model: models.confessions,
          attributes: ['title', 'upvote_count', 'downvote_count'],
          include: {
            model: models.users,
            attributes: ['handle']
          }
        }
      });
      return res.send(message.success(allConfessions));
    } catch (error) {
      res.send(message.error(error.message));
    }
  };
}

export default ConfessionTagController;