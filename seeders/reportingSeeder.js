import { faker } from '@faker-js/faker';
import models from '../src/models/index.js';

const generateFakeReportingData = (users, comments, confessions) => {
  const reporter = faker.helpers.arrayElement(users);
  const reported_object_type = faker.helpers.arrayElement(['comment', 'confession']);
  const comment = reported_object_type === 'comment' ? faker.helpers.arrayElement(comments) : null;
  const confession = reported_object_type === 'confession' ? faker.helpers.arrayElement(confessions) : null;
  const description = faker.lorem.sentence();
  const is_resolved = faker.helpers.arrayElement([true, false]);
  const created_at = faker.date.past();
  const updated_at = faker.date.past();

  return {
    reporter_id: reporter.id,
    reported_object_type,
    comment_id: comment ? comment.id : null,
    confession_id: confession ? confession.id : null,
    description,
    is_resolved,
    created_at,
    updated_at
  };
};

const bulkCreateFakeReportings = async (num, users, comments, confessions) => {
  try {
    const fakeReportings = [];
    for (let i = 0; i < num; i++) {
      const reportingData = generateFakeReportingData(users, comments, confessions);
      fakeReportings.push(reportingData);
    }
    await models.reportings.bulkCreate(fakeReportings);
    console.log(`${ num } reportings created successfully.`);
  } catch (error) {
    console.log(error);
  }
};

const numberToCreate = 100;
const users = await models.users.findAll(); // Fetch existing users from the database
const comments = await models.comments.findAll(); // Fetch existing comments from the database
const confessions = await models.confessions.findAll(); // Fetch existing confessions from the database

if (users.length > 0 && (comments.length > 0 || confessions.length > 0)) {
  bulkCreateFakeReportings(numberToCreate, users, comments, confessions);
} else {
  console.log('No existing users, comments, or confessions found.');
}
