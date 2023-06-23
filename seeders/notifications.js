import { faker } from '@faker-js/faker';
import models from '../src/models/index.js';
    
const generateFakeNotificationData = async (users, confessions) => {
  const user = faker.helpers.arrayElement(users);
  const message = faker.lorem.sentence();
  const is_viewed = faker.helpers.arrayElement([true, false]);
  const created_at = faker.date.past();
  const updated_at = faker.date.past();
  const confession = faker.helpers.arrayElement(confessions);
  
  return {
    user_id: user.id,
    message,
    confessions_id: confession.id,
    is_viewed,
    created_at,
    updated_at,
    confession_id: confession.id
  };
};
  
const bulkCreateFakeNotifications = async (num, users, confessions) => {
  try {
    const fakeNotifications = [];
    for (let i = 0; i < num; i++) {
      const notificationData = await generateFakeNotificationData(users, confessions);
      fakeNotifications.push(notificationData);
    }
    await models.notifications.bulkCreate(fakeNotifications);
    console.log(`${ num } notifications created successfully.`);
  } catch (error) {
    console.log(error);
  }
};
  
const numberToCreate = 10;
const users = await models.users.findAll(); // Fetch existing users from the database
const confessions = await models.confessions.findAll(); // Fetch existing confessions from the database
  
bulkCreateFakeNotifications(numberToCreate, users, confessions);
  