const models = {};
import users from './users.js';
import confessions from './confessions.js';
import emails from './emails.js';
import comments from './comments.js';
import confessionVotes from './confessionVotes.js';
import commentVotes from './commentVotes.js';
import notifications from './notifications.js';
import reportings from './reportings.js';
import tags from './tags.js';
import views from './views.js';

models.users = users;
models.confessions = confessions;
models.confessionVotes = confessionVotes;
models.comments = comments;
models.commentVotes = commentVotes;
models.emails = emails;
models.notifications = notifications;
models.reportings = reportings;
models.tags = tags;
models.views = views;

// users relations
users.hasMany(confessions, { foreignKey: 'user_id' });
users.hasMany(comments, { foreignKey: 'user_id' });
users.hasMany(commentVotes, { foreignKey: 'user_id' });
users.hasMany(confessionVotes, { foreignKey: 'user_id' });
users.hasMany(notifications, { foreignKey: 'user_id' });
users.belongsToMany(reportings, { through: 'user_reportings_assoc', foreignKey: 'reporter_id' });
users.belongsToMany(reportings, { through: 'user_reportings_assoc', foreignKey: 'reported_id' });

// comments relations
comments.belongsToMany(commentVotes, { through: 'comment_votes_assoc', foreignKey: 'comment_id' });

// confessions relations
confessions.belongsTo(users, { foreignKey: 'user_id' });
confessions.hasMany(comments, { foreignKey: 'confession_id' });
confessions.belongsToMany(tags, { through: 'confession_tags_assoc', foreignKey: 'confession_id' });
confessions.belongsToMany(confessionVotes, { through: 'confession_votes_assoc', foreignKey: 'confession_id' });

// tags relations
tags.belongsToMany(confessions, { through: 'confession_tags_assoc', foreignKey: 'tag_id' });

export default models;