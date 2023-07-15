import { literal, Op } from 'sequelize';
import models from '../models/index.js';
import { sanitizeInput, extractHashtags, message, replaceHashtags } from '../utils/index.js';
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
    const { id: userId } = req.user;

    // validate inputs
    title = sanitizeInput(title);
    body = sanitizeInput(body);

    const { hashtags, ids } = extractHashtags(body);

    // for title only limit to 150 characters
    if (title.length > 150) {
      title = title.substr(0, 150);
    }
    if (!title || !body) {
      return res.send(message.error('Missing title or body!'));
    }
    // after extracting body replace format "#[new](16)" or  "#[tech](tech)" with #tech like this
    const bodyToSave = replaceHashtags(body);
    try {
      const confession = await models.confessions.create({ title, body: bodyToSave, user_id: userId });

      if (hashtags.length > 0) {
        // create hashtag
        // as this doesn't work well with promises making use of for loop
        // hashtags.forEach(async hashtag => {
        //   await models.tags.findOrCreate({ where: { name: hashtag } });
        // });
        // create hashtag
        for (const hashtag of hashtags) {
          await models.tags.findOrCreate({ where: { name: hashtag } });
        }
        // now add confession and hashtags to confession_tags table
        const confessionId = confession.id;
        // hashtags.forEach(async hashtag => {
        //   const tag = await models.tags.findOne({ where: { name: hashtag } });
        //   const tagId = tag.id;
        //   await models.confessionTags.create({ confession_id: confessionId, tag_id: tagId });
        // });
        for (const hashtag of hashtags) {
          const tag = await models.tags.findOne({ where: { name: hashtag } });
          const tagId = tag.id;
          await models.confessionTags.create({ confession_id: confessionId, tag_id: tagId });
        }
      }
      if (ids.length > 0) {
        // for each id with confession id create entry in confession tags table
        const confessionId = confession.id;
        // ids.forEach(async id => {
        //   await models.confessionTags.create({ confession_id: confessionId, tag_id: id });
        // });
        for (const id of ids) {
          await models.confessionTags.create({ confession_id: confessionId, tag_id: id });
        }
      }
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
      // create notification for user who created this confession
      const confession = await models.confessions.findByPk(id);
      const userId = confession.user_id;
      // trimmed notification title to 50 characters and add "..." at the end if title is longer than 50 characters else use the title as it is
      const trimmedTitle = confession.title.length > 50 ? `${ confession.title.substr(0, 50) }...` : confession.title;
      const notificationMessage = `Your confession with title "${ trimmedTitle }" has been approved!`;
      const confessionId = confession.id;

      await models.notifications.create({
        user_id: userId,
        confession_id: confessionId,
        message: notificationMessage
      });

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
        attributes: {
          include: [
            [literal('(SELECT COUNT(DISTINCT views.id) FROM views WHERE views.confession_id = confessions.id)'), 'views_count']
          ], exclude: ['user_id']
        },
        include: [{
          model: models.users,
          attributes: ['handle']
        }],
        order: [['created_at', 'DESC'], [literal('(confessions.upvote_count - confessions.downvote_count)'), 'DESC']]
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
    let { page = 0, limit = 30 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const offset = page * limit;
    const limitPerPage = parseInt(limit);
    try {
      const confessions = await models.confessions.findAll({
        where: { is_approved: false },
        limit: limitPerPage,
        offset,
        attributes: { exclude: ['user_id', 'body'] },
        include: [{
          model: models.users,
          attributes: ['handle']
        }],
        order: [['id', 'DESC']]
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
  // get confession with pagination by user id
  getConfessionsByUserId = async (req, res) => {
    // const userId = req.params.id;
    let userId;
    if (req.params.id) {
      userId = req.params.id;
    } else if (req.user) {
      userId = req.user.id;
    } else {
      return res.send(message.error('Missing user id!'));
    }
    let { page = 0, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = page * limit;
    const limitPerPage = parseInt(limit);
    try {
      const confessions = await models.confessions.findAll({
        where: { user_id: userId },
        limit: limitPerPage,
        offset,
        attributes: { exclude: ['user_id'] },
        include: [{
          model: models.users,
          attributes: ['handle']
        }],
        order: [['id', 'DESC']]
      });
      // include pagination info to response
      const response = {
        confessions,
        page,
        limit
      };
      return res.send(message.success(response));
    } catch (error) {
      res.send(message.error(error.message));
    }
  };
  // get confession by user handle
  getConfessionsByUserHandle = async (req, res) => {
    const { handle } = req.params;
    let showAllConfession;
    if (handle === req.user.handle) {
      showAllConfession = true;
    }
    if (!handle) {
      return res.send(message.error('Missing handle!'));
    }
    const { page = 0, limit = 10 } = req.query;
    const offset = page * limit;
    const limitPerPage = parseInt(limit);
    try {
      const confessions = await models.confessions.findAll({
        where: showAllConfession ? { '$user.handle$': handle } : { '$user.handle$': handle, is_approved: true },
        limit: limitPerPage,
        offset,
        attributes: { exclude: ['user_id'] },
        include: [{
          model: models.users,
          attributes: ['handle']
        }],
        order: [['id', 'DESC']]
      });
      // include pagination info to response
      const response = {
        confessions,
        page,
        limit
      };
      return res.send(message.success(response));
    } catch (error) {
      return res.send(message.error(error.message));
    }

  };

  // search confession by title
  searchConfessionByTitle = async (req, res) => {
    const { title } = req.query;
    if (!title) {
      return res.send(message.error('Missing title!'));
    }
    const { page = 0, limit = 10 } = req.query;
    const offset = page * limit;
    const limitPerPage = parseInt(limit);
    try {
      const confessions = await models.confessions.findAll({
        where: { title: { [Op.like]: `%${ title }%` }, is_approved: true },
        limit: limitPerPage,
        offset,
        attributes: { exclude: ['user_id'] },
        include: [{
          model: models.users,
          attributes: ['handle']
        }],
        order: [['id', 'DESC']]
      });
      // include pagination info to response
      const response = {
        confessions,
        page,
        limit
      };
      return res.send(message.success(response));
    }
    catch (err) {
      return res.send(message.error(err.message));
    }
  };
}
export default ConfessionController;