import { faker } from '@faker-js/faker';
import models from '../src/models/index.js';

const generateFakeUsers = async () => {
  const handle = faker.internet.userName();
  const password = '$2a$10$ueMJfMBJGN9TQE6uim42Uek1dq/oAztxetIuLA/3xNAIWkTCVFC1K';
  const role = faker.helpers.arrayElement(['user']);
  const is_verified = faker.helpers.arrayElement([true, false]);
  // now created date and updated date make different
  const created_at = faker.date.anytime();
  return {
    handle,
    password,
    role,
    is_verified,
    created_at
  };
};

const bulkCreateFakeUsers = async num => {
  try {
    const fakeUsers = [];
    for (let i = 0; i < num; i++) {
      const userData = await generateFakeUsers();
      fakeUsers.push(userData);
    }
    await models.users.bulkCreate(fakeUsers);
    console.log(`${ num } users created successfully.`);
  } catch (error) {
    console.log(error);
  }
};

const numberToCreate = 100;

bulkCreateFakeUsers(numberToCreate);