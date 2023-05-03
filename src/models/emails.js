/* eslint-disable camelcase */
import { DataTypes } from 'sequelize';
import dbConfig from '../Config/DBConfig';

const emails =  dbConfig.define('emails', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default emails;