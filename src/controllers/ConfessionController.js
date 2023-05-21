import models from '../models/index.js';
import { sanitizeInput, message } from '../utils/index.js';

class ConfessionController {

  // get all confessions
  getAllConfessions = async (req, res) => {
    try {
      const confessions = await models.confessions.findAll();
      return res.send(message.success(confessions));
    } catch (err) {
      return res.send(message.error(err.message));
    }
  };

  // create confession
  createConfession = async (req, res) => {
    let { title, body } = req.body;

    // get handle from access token 
    const { id:userId } = req.user;

    // validate inputs
    title = await sanitizeInput(title);
    body = await sanitizeInput(body);

    // for title only limit to 150 characters
    if (title.length > 150) {
      title = title.substr(0,150);
    }
    if (!title || !body) {
      return res.send(message.error('Missing title or body!'));
    }
    try {
      const confession = await models.confessions.create({ title,body,user_id: userId });
      return res.send(message.success(confession));
    } catch (err) {
      return res.send(message.error(err.message));
    }
  };

  // get confession by id
  getConfessionById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.send(message.error('Missing id!'));
    }
    try {
      const confession = await models.confessions.findByPk(req.params.id, {
        include: [
          {
            model: models.users,
            attributes: ['handle']
          }
        ]
      });
      delete confession.dataValues.user_id;

      return res.send(message.success(confession));
    } catch (err) {
      return res.send(message.error(err.message));
    }
  };

  // update confession by id
  updateConfessionById = async (req, res) => {
    const { id } = req.params;
    let { title, body } = req.body;

    // validate inputs
    title = await sanitizeInput(title);
    body = await sanitizeInput(body);

    if (!id) {
      return res.send(message.error('Missing id!'));
    }
    if (!title || !body) {
      return res.send(message.error('Missing title or body!'));
    }
    // check if confession exists and data are changed
    const confession = await models.confessions.findByPk(id);
    if (!confession) {
      return res.send(message.error('Confession not found!'));
    }
    if (confession.title === title && confession.body === body) {
      return res.send(message.error('Nothing to update!'));
    }
    try {
      const updatedConfession = await models.confessions.update({ title, body }, { where: { id } });
      return res.send(message.success(updatedConfession));
    }
    catch (err) {
      return res.send(message.error(err.message));
    }
  };

  // delete confession by id
  deleteConfessionById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.send(message.error('Missing id!'));
    }
    try {
      const deletedConfession = await models.confessions.destroy({ where: { id } });
      return res.send(message.success(deletedConfession));
    } catch (err) {
      return res.send(message.error(err.message));
    }
  };

  // approve confession by id
  approveConfessionById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.send(message.error('Missing id!'));
    }
    try {
      const approvedConfession = await models.confessions.update({ is_approved: true }, { where: { id } });
      return res.send(message.success(approvedConfession));
    } catch (err) {
      return res.send(message.error(err.message));
    }
  }; 
  // get all approved confessions with pagination
  getAllApprovedConfessions = async (req, res) => {
    // parse query params page and limit
    let { page = 0, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const offset = page * limit;
    const limitPerPage = parseInt(limit);
    try {
      const confessions = await models.confessions.findAll({
        where: { is_approved: true },
        limit: limitPerPage,
        offset,
        attributes: { exclude: ['user_id'] },
        include: [{
          model: models.users,
          attributes: ['handle']
        }]
      });
      
      // include pagination info to response
      const response = {
        confessions,
        page,
        limit
      };
      return res.send(message.success(response));
    } catch (err) {
      return res.send(message.error(err.message));
    }
  };
  // get all pending confessions with pagination
  getAllPendingConfessions = async (req, res) => {
    // parse query params page and limit
    let { page = 0, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const offset = page * limit;
    const limitPerPage = parseInt(limit);
    try {
      const confessions = await models.confessions.findAll({
        where: { is_approved: false },
        limit: limitPerPage,
        offset,
        attributes: { exclude: ['user_id'] },
        include: [{
          model: models.users,
          attributes: ['handle']
        }]
      });
      
      // include pagination info to response
      const response = {
        confessions,
        page,
        limit
      };
      return res.send(message.success(response));
    } catch (err) {
      return res.send(message.error(err.message));
    }
  };
}
export default ConfessionController;