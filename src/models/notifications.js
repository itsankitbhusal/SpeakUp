/* eslint-disable camelcase */
import { DataTypes } from 'sequelize';
import dbConfig from '../config/dbConfig.js';

const notifications = dbConfig.define('notifications', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  message: {
    type: new DataTypes.STRING,
    allowNull: false
  },
  is_viewed:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default notifications;