import { faker } from '@faker-js/faker';
import models from '../src/models/index.js';

const generateFakeTagData = () => {
  const name = faker.lorem.word();
  const created_at = faker.date.past();
  const updated_at = faker.date.past();

  return {
    name,
    created_at,
    updated_at
  };
};

const bulkCreateFakeTags = async num => {
  try {
    const fakeTags = [];
    const uniqueNames = new Set();

    while (fakeTags.length < num) {
      const tagData = generateFakeTagData();
      
      if (!uniqueNames.has(tagData.name)) {
        fakeTags.push(tagData);
        uniqueNames.add(tagData.name);
      }
    }

    await models.tags.bulkCreate(fakeTags);
    console.log(`${ num } tags created successfully.`);
  } catch (error) {
    console.log(error);
  }
};

const numberToCreate = 50;

bulkCreateFakeTags(numberToCreate);
