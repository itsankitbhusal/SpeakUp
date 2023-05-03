/* eslint-disable camelcase */
import { DataTypes } from 'sequelize';
import dbConfig from '../Config/DBConfig';

const confession_votes= dbConfig.define('confession_votes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    required: true
  },
  confession_id: {
    type: DataTypes.INTEGER,
    required: true
  },
  vote_types: {
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

export default confession_votes;