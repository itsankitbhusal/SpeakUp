/* eslint-disable camelcase */
import { DataTypes } from 'sequelize';
import dbConfig from '../Config/DBConfig';

const comment_votes = dbConfig.define('comment_votes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    required: true
  },
  comment_id: {
    type: DataTypes.INTEGER,
    required: true
  },
  vote_type: {
    type: DataTypes.ENUM('up', 'down'),
    required: true,
    validate: {
      isIn: [['up', 'down']]
    }
  }

}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default comment_votes;