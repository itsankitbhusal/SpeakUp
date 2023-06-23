import { faker } from '@faker-js/faker';
import models from '../src/models/index.js';

const generateFakeCommentVoteData = (users, comments) => {
  const user = faker.helpers.arrayElement(users);
  const comment = faker.helpers.arrayElement(comments);
  const vote_type = faker.helpers.arrayElement(['up', 'down']);
  const created_at = faker.date.past();
  const updated_at = faker.date.past();

  return {
    user_id: user.id,
    comment_id: comment.id,
    vote_type,
    created_at,
    updated_at
  };
};

const bulkCreateFakeCommentVotes = async (num, users, comments) => {
  try {
    const fakeCommentVotes = [];
    for (let i = 0; i < num; i++) {
      const commentVoteData = generateFakeCommentVoteData(users, comments);
      fakeCommentVotes.push(commentVoteData);
    }
    await models.commentVotes.bulkCreate(fakeCommentVotes);
    console.log(`${ num } comment votes created successfully.`);
  } catch (error) {
    console.log(error);
  }
};

const numberToCreate = 100;
const users = await models.users.findAll(); // Fetch existing users from the database
const comments = await models.comments.findAll(); // Fetch existing comments from the database

if (users.length > 0 && comments.length > 0) {
  bulkCreateFakeCommentVotes(numberToCreate, users, comments);
} else {
  console.log('No existing users or comments found.');
}
