import { Op } from 'sequelize';
import models from '../models/index.js';
import message from '../utils/message.js';

class TagsController{
  // get all the tags from the database
  getAllTags = async (req, res) => {
    try {
      const tag = await models.tags.findAll();
      return res.send(message.success(tag));
    } catch (error) {
      return res.send(message.error(error.message));
    }
  };

  // create a new tag
  createTag = async (req, res) => { 
    const { name } = req.body;
    if (!name) {
      return res.send(message.error('Please provide a name'));
    }
    // check if tag was already created
    const tagExists = await models.tags.findOne({ where: { name } });
    if (tagExists) {
      return res.send(message.error('Tag already exists'));
    }
    try {
      const tag = await models.tags.create({ name });
      // check if tag was already created
      return res.send(message.success(tag));
    } catch (error) {
      return res.send(message.error(error.message));
    }
  };

  // get a single tag
  getSingleTag = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.send(message.error('Please provide an id'));
    }
    try {
      const tag = await models.tags.findOne({ where: { id } });
      if (!tag) {
        return res.send(message.error('Tag not found'));
      }
      return res.send(message.success(tag));
    } catch (error) {
      return res.send(message.error(error.message));
    }
  };

  // update a tag
  updateTag = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!id || !name) {
      return res.send(message.error('Please provide an id and a name'));
    }
    try {
      const tag = await models.tags.findOne({ where: { id } });
      if (!tag) {
        return res.send(message.error('Tag not found'));
      }
      const updatedTag = await models.tags.update({ name }, { where: { id } });
      return res.send(message.success(updatedTag));
    } catch (error) {
      return res.send(message.error(error.message));
    }
  };

  // delete a tag
  deleteTag = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.send(message.error('Please provide an id'));
    }
    try {
      const tag = await models.tags.findOne({ where: { id } });
      if (!tag) {
        return res.send(message.error('Tag not found'));
      }
      await models.tags.destroy({ where: { id } });
      return res.send(message.success('Tag deleted successfully'));
    } catch (error) {
      return res.send(message.error(error.message));
    }
  };

  // search tags
  searchTags = async (req, res) => {
    const { name } = req.query;
    if (!name) {
      return res.send(message.error('Please provide a name'));
    }
    try {
      const response = await models.tags.findAll({
        where: {
          name: {
            [Op.like]: `%${ name }%`
          }
        },
        attributes: ['id', 'name']
      });
      return res.send(message.success(response));
    }
    catch (error) {
      return res.send(message.error(error.message));
    }
  };

}

export default TagsController;