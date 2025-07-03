const {DataTypes} = require('sequelize');
const sequelize = require('../config/db')

module.exports =(sequelize,DataTypes) =>{
const User = sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true,
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    role:{
        type: DataTypes.ENUM('admin','member'),
        defaultValue:'member',
    },
},{
    timestamps:true,
});
 return User;
}


