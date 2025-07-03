// models/PostSection.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

module.exports = (sequelize,DataTypes) => 
{const PostSection = sequelize.define('PostSection', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});
  return PostSection;
}




