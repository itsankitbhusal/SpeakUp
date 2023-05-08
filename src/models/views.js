/* eslint-disable camelcase */
import { DataTypes } from 'sequelize';
import dbConfig from '../config/dbConfig.js';

const views = dbConfig.define('views', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  confession_id: {
    type: new DataTypes.INTEGER,
    allowNull: false
  }
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default views;