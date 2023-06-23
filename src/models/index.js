const models = {};
import users from './users.js';
import confessions from './confessions.js';
import emails from './emails.js';
import comments from './comments.js';
import confessionVotes from './confessionVotes.js';
import confessionTags from './confessionTags.js';
import commentVotes from './commentVotes.js';
import notifications from './notifications.js';
import reportings from './reportings.js';
import tags from './tags.js';
import views from './views.js';

models.users = users;
models.confessions = confessions;
models.confessionVotes = confessionVotes;
models.confessionTags = confessionTags;
models.comments = comments;
models.commentVotes = commentVotes;
models.emails = emails;
models.notifications = notifications;
models.reportings = reportings;
models.tags = tags;
models.views = views;

// users relations
users.hasMany(confessions, { foreignKey: 'user_id', onDelete: 'CASCADE' });
users.hasMany(comments, { foreignKey: 'user_id', onDelete: 'CASCADE' });
users.hasMany(commentVotes, { foreignKey: 'user_id', onDelete: 'CASCADE' });
users.hasMany(confessionVotes, { foreignKey: 'user_id', onDelete: 'CASCADE' });
users.hasMany(notifications, { foreignKey: 'user_id', onDelete: 'CASCADE' });
users.hasMany(reportings, { foreignKey: 'reporter_id', onDelete: 'CASCADE' });
users.hasMany(views, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// comments relations
comments.belongsTo(users, { foreignKey: 'user_id', onDelete: 'CASCADE' });
comments.belongsTo(confessions, { foreignKey: 'confession_id', onDelete: 'CASCADE' });
comments.hasMany(commentVotes, { foreignKey: 'comment_id', onDelete: 'CASCADE' });
comments.hasMany(reportings, { foreignKey: 'comment_id', onDelete: 'CASCADE' });

// confessions relations
confessions.belongsTo(users, { foreignKey: 'user_id', onDelete: 'CASCADE' });
confessions.hasMany(comments, { foreignKey: 'confession_id', onDelete: 'CASCADE' });
confessions.hasMany(confessionVotes, { foreignKey: 'confession_id', onDelete: 'CASCADE' });
confessions.hasMany(views, { foreignKey: 'confession_id', onDelete: 'CASCADE' });
confessions.belongsToMany(tags, { through: confessionTags, foreignKey: 'confession_id' });
confessions.hasMany(reportings, { foreignKey: 'confession_id', onDelete: 'CASCADE' });
confessions.hasMany(notifications, { foreignKey: 'confession_id', onDelete: 'CASCADE' });
// confession tags relations
confessionTags.belongsTo(tags, { foreignKey: 'tag_id' });
confessionTags.belongsTo(confessions, { foreignKey: 'confession_id' });

// confession votes relation
confessionVotes.belongsTo(users, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// comment votes relation
commentVotes.belongsTo(users, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// tags relations
tags.belongsToMany(confessions, { through: confessionTags, foreignKey: 'tag_id', onDelete: 'CASCADE' });

// notifications relations
notifications.belongsTo(users, { foreignKey: 'user_id', onDelete: 'CASCADE' });
notifications.belongsTo(confessions, { foreignKey: 'confession_id', onDelete: 'CASCADE' });

// views relations
views.belongsTo(users, { foreignKey: 'user_id', onDelete: 'CASCADE' });
views.belongsTo(confessions, { foreignKey: 'confession_id', onDelete: 'CASCADE' });


export default models;