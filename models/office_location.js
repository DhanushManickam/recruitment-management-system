const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const office_locations = sequelize.define('office_location',{
    location_id :{
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    name : {
        type : DataTypes.STRING(255),
        allowNull : false,
    },
    city : {
        type : DataTypes.STRING(64),
        allowNull: false,
    }
})

module.exports = office_locations;