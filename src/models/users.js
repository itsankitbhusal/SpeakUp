/* eslint-disable camelcase */
import { DataTypes } from 'sequelize';
import dbConfig from '../config/dbConfig.js';

const users = dbConfig.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  handle: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    required: true
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    required: true,
    defaultValue: 'user',
    validate: {
      isIn: [['admin', 'user']]
    }
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  last_active_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default users;