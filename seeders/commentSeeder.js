import { faker } from '@faker-js/faker';
import models from '../src/models/index.js';

const generateFakeCommentData = (users, confessions) => {
  const user = faker.helpers.arrayElement(users);
  const confession = faker.helpers.arrayElement(confessions);
  const body = faker.lorem.lines();
  const created_at = faker.date.past();
  const updated_at = faker.date.past();

  return {
    body,
    user_id: user.id,
    confession_id: confession.id,
    created_at,
    updated_at
  };
};

const bulkCreateFakeComments = async (num, users, confessions) => {
  try {
    const fakeComments = [];
    for (let i = 0; i < num; i++) {
      const commentData = generateFakeCommentData(users, confessions);
      fakeComments.push(commentData);
    }
    await models.comments.bulkCreate(fakeComments);
    console.log(`${ num } comments created successfully.`);
  } catch (error) {
    console.log(error);
  }
};

const numberToCreate = 100;
const users = await models.users.findAll(); // Fetch existing users from the database
const confessions = await models.confessions.findAll(); // Fetch existing confessions from the database

if (users.length > 0 && confessions.length > 0) {
  bulkCreateFakeComments(numberToCreate, users, confessions);
} else {
  console.log('No existing users or confessions found.');
}
