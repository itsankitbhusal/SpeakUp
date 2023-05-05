import { DataTypes } from 'sequelize';
import dbConfig from '../Config/DBConfig';

const reportings = dbConfig.define('reportings', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  reporter_id: {
    type: DataTypes.INTEGER,
    required: true
  },
  reported_id: {
    type: DataTypes.INTEGER,
    required: true
  },
  reported_object_type: {
    type: DataTypes.ENUM('confession', 'comment'),
    allowNull: false
  },
  reported_object_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    required: true
  },
  is_resolved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default reportings;