/* eslint-disable camelcase */
import { DataTypes } from 'sequelize';
import dbConfig from '../config/dbConfig.js';

const confessions = dbConfig.define('confessions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    required: true
  },
  body: {
    type: DataTypes.TEXT,
    required: true
  },
  user_id: {
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
  },
  is_approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }

}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [{
    type: 'FULLTEXT',
    fields: ['title'],
    name: 'title_fulltext_idx'
  }]
});



export default confessions;