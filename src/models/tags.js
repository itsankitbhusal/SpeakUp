import { DataTypes } from 'sequelize';
import dbConfig from '../config/dbConfig.js';

const tags =  dbConfig.define('tags', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: new DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      notContains: '  ',
      isLowercase: true,
      isNumeric: false
    }
  }
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default tags;