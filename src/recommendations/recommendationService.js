import models from '../models/index.js';
import { Op, literal } from 'sequelize';
import { message } from '../utils/index.js';

const getMostViewedConfessions = async (req, res) => {
  const currentDate = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  oneMonthAgo.setHours(0, 0, 0, 0);
  currentDate.setHours(23, 59, 59, 999);

  // group the views by confession_id and count the number of views
  const topViewedConfessionIds = await models.views.findAll({
    attributes: [
      'confession_id',
      [literal('COUNT(*)'), 'views']
    ],
    where: {
      created_at: {
        [Op.between]: [oneMonthAgo, currentDate]
      }
    },
    group: ['confession_id'],
    order: [[literal('views'), 'DESC']],
    limit: 5 // Get the top 5 viewed confessions
  });

  const topViewedConfessionIdsArray = topViewedConfessionIds.map(confession => confession.confession_id);

  // top 5 most upvoted confessions in a month
  const topUpvotedConfessionIds = await models.confessionVotes.findAll({
    attributes: [
      'confession_id',
      [literal('COUNT(*)'), 'upvotes']
    ],
    where: {
      vote_type: 'up',
      created_at: {
        [Op.between]: [oneMonthAgo, currentDate]
      }
    },
    attributes: ['confession_id', [literal('COUNT(*)'), 'upvotes']],
    group: ['confession_id'],
    order: [[literal('upvotes'), 'DESC']],
    limit: 5
  });

  const topUpvotedConfessionIdsArray = topUpvotedConfessionIds.map(confession => confession.confession_id);

  // top 5 up/down ratio confession ids
  const topUpvoteDownvoteRatioConfessionIds = await models.confessionVotes.findAll({
    attributes: [
      'confession_id',
      [literal('SUM(CASE WHEN vote_type = \'up\' THEN 1 ELSE 0 END)'), 'upVotes'],
      [literal('SUM(CASE WHEN vote_type = \'down\' THEN 1 ELSE 0 END)'), 'downVotes']
    ],
    where: {
      created_at: {
        [Op.between]: [oneMonthAgo, new Date()]
      }
    },
    group: ['confession_id'],
    order: [
      [literal('upVotes'), 'DESC'],
      [literal('downVotes'), 'ASC']
    ],
    limit: 5
  });
  const topUpvoteDownvoteRatioConfessionIdsArray = topUpvoteDownvoteRatioConfessionIds.map(confession => confession.confession_id);

  // top 5 most commented confessions
  const topCommentedConfessionIds = await models.comments.findAll({
    attributes: [
      'confession_id',
      [literal('COUNT(*)'), 'comments']
    ],
    where: {
      created_at: {
        [Op.between]: [oneMonthAgo, currentDate]
      }
    },
    group: ['confession_id'],
    order: [[literal('comments'), 'DESC']],
    limit: 5
  });

  const topCommentedConfessionIdsArray = topCommentedConfessionIds.map(confession => confession.confession_id);

  // merge the 4 arrays with the confession_id as the key
  const mergedConfessionIds = [...topViewedConfessionIdsArray, ...topUpvotedConfessionIdsArray, ...topUpvoteDownvoteRatioConfessionIdsArray, ...topCommentedConfessionIdsArray];

  // uniqueConfessionIds set object
  const uniqueConfessionIds = sortArray(mergedConfessionIds);

  const confessions = await models.confessions.findAll({
    where: { id: [...uniqueConfessionIds] },
    attributes: {
      include: [
        [literal('(SELECT COUNT(DISTINCT views.id) FROM views WHERE views.confession_id = confessions.id)'), 'views_count']
      ], exclude: ['user_id']
    },
    include: [{
      model: models.users,
      attributes: ['handle']
    }]
  });

  // now sort the confessions by the uniqueConfessionIds array
  const sortedConfessions = [];
  for (const id of uniqueConfessionIds) {
    const confession = confessions.find(confession => confession.id === id);
    sortedConfessions.push(confession);
  }
  res.send(message.success(sortedConfessions));

};

// custom sorting algorithm
const sortArray = array => {
  const result = {};
  for (const element of array) {
    const num = element;
    if (!result[num]) {
      result[num] = 1;
    } else {
      result[num] += 1;
    }
  }
  return new Set(array.sort((a, b) => result[b] - result[a]));
};
export { getMostViewedConfessions };