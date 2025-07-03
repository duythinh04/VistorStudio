const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const db={};

db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.User=require('./User')(sequelize,Sequelize.DataTypes);
db.Post=require('./Post')(sequelize,Sequelize.DataTypes);
db.PostSection=require('./PostSection')(sequelize,Sequelize.DataTypes);

db.User.hasMany(db.Post,{foreignKey:'userId',onDelete:'CASCADE'})
db.Post.belongsTo(db.User,{foreignKey:'userId'})
db.Post.hasMany(db.PostSection, {foreignKey:'postId',onDelete:'CASCADE',as:'sections'});
db.PostSection.belongsTo(db.Post,{foreignKey:'postId'})
module.exports = db;