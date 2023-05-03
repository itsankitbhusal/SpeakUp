/* eslint-disable camelcase */
import { DataTypes } from 'sequelize';
import dbConfig from '../Config/DBConfig';

const comments = dbConfig.define('comments', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  body: {
    type: DataTypes.TEXT,
    required: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    required: true
  },
  confession_id: {
    type: DataTypes.INTEGER,
    required: true
  },
  upvote_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  downvote_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default comments;