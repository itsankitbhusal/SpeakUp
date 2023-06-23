import { faker } from '@faker-js/faker';
import models from '../src/models/index.js';

const generateFakePostData = users => {
  const user = faker.helpers.arrayElement(users);
  const title = faker.lorem.sentence();
  const body = faker.lorem.paragraphs({ min: 1, max: 5 });
  const is_approved = faker.helpers.arrayElement([true, false]);
  const created_at = faker.date.past();
  const updated_at = faker.date.past();

  return {
    title,
    body,
    user_id: user.id,
    is_approved,
    created_at,
    updated_at
  };
};

const bulkCreateFakePosts = async (num, users) => {
  try {
    const fakePosts = [];
    for (let i = 0; i < num; i++) {
      const postData = generateFakePostData(users);
      fakePosts.push(postData);
    }
    await models.confessions.bulkCreate(fakePosts);
    console.log(`${ num } posts created successfully.`);
  } catch (error) {
    console.log(error);
  }
};

const numberToCreate = 100;
const users = await models.users.findAll(); // Fetch existing users from the database

bulkCreateFakePosts(numberToCreate, users);
