import { faker } from '@faker-js/faker';
import models from '../src/models/index.js';

const generateFakeViewData = (users, confessions) => {
  const user = faker.helpers.arrayElement(users);
  const confession = faker.helpers.arrayElement(confessions);
  const created_at = faker.date.past();
  const updated_at = faker.date.past();

  return {
    user_id: user.id,
    confession_id: confession.id,
    created_at,
    updated_at
  };
};

const bulkCreateFakeViews = async (num, users, confessions) => {
  try {
    const fakeViews = [];
    for (let i = 0; i < num; i++) {
      const viewData = generateFakeViewData(users, confessions);
      fakeViews.push(viewData);
    }
    await models.views.bulkCreate(fakeViews);
    console.log(`${ num } views created successfully.`);
  } catch (error) {
    console.log(error);
  }
};

const numberToCreate = 100;
const users = await models.users.findAll(); // Fetch existing users from the database
const confessions = await models.confessions.findAll(); // Fetch existing confessions from the database

if (users.length > 0 && confessions.length > 0) {
  bulkCreateFakeViews(numberToCreate, users, confessions);
} else {
  console.log('No existing users or confessions found.');
}
