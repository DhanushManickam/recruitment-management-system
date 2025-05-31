const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('rms', 'postgres', 'kiot2003',{
    host : 'localhost',
    dialect : 'postgres'
})

module.exports = sequelize;
