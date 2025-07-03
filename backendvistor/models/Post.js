const {DataTypes} = require('sequelize');
const sequelize = require('../config/db')

module.exports = (sequelize,DataTypes) =>
{const Post=sequelize.define('Post',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
    status:{
        type:DataTypes.ENUM('public','private'),
        defaultValue:'public',
    },
},{
    timestamps:true
});
return Post;
}
