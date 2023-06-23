import { faker } from '@faker-js/faker';
import models from '../src/models/index.js';

const generateFakeConfessionVoteData = (users, confessions) => {
  const user = faker.helpers.arrayElement(users);
  const confession = faker.helpers.arrayElement(confessions);
  const vote_type = faker.helpers.arrayElement(['up', 'down']);
  const created_at = faker.date.past();
  const updated_at = faker.date.past();

  return {
    user_id: user.id,
    confession_id: confession.id,
    vote_type,
    created_at,
    updated_at
  };
};

const bulkCreateFakeConfessionVotes = async (num, users, confessions) => {
  try {
    const fakeConfessionVotes = [];
    for (let i = 0; i < num; i++) {
      const confessionVoteData = generateFakeConfessionVoteData(users, confessions);
      fakeConfessionVotes.push(confessionVoteData);
    }
    await models.confessionVotes.bulkCreate(fakeConfessionVotes);
    console.log(`${ num } confession votes created successfully.`);
  } catch (error) {
    console.log(error);
  }
};

const numberToCreate = 100;
const users = await models.users.findAll(); // Fetch existing users from the database
const confessions = await models.confessions.findAll(); // Fetch existing confessions from the database

if (users.length > 0 && confessions.length > 0) {
  bulkCreateFakeConfessionVotes(numberToCreate, users, confessions);
} else {
  console.log('No existing users or confessions found.');
}
