const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')

const Employees = sequelize.define('employee',{
    id :{
        type: DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true,
    },
    name:{
        type : DataTypes.STRING(128),
        allowNull : false
    },
    email_id : {
        type : DataTypes.STRING(254),
        allowNull : false,
        validate : {
            isEmail : true
        },
        unique : true
    },
    phone_no : {
        type : DataTypes.STRING(15),
        allowNull : false,
    },
    role : {
        type : DataTypes.ENUM('Application Developer' ,'Full Stack Developer', 'HR'),
        allowNull : false
    },
    department : {
        type : DataTypes.ENUM('HR', 'IT' ,'Sales','Admin'),
        allowNull : false
    },
    password : {
        type: DataTypes.STRING(60),
        allowNull: false
    }
})
module.exports = Employees;