/* eslint-disable camelcase */
import { DataTypes } from 'sequelize';
import dbConfig from '../Config/DBConfig';

const confessionTags = dbConfig.define('confession_tags', {
  confession_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tag_id: {
    type: new DataTypes.INTEGER,
    allowNull: false
  }
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default confessionTags;