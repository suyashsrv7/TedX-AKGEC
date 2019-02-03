const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Speaker = sequelize.define('speaker', {
    id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING
    },

    imgUrl: {
        type: Sequelize.STRING
    },


});

module.exports = Speaker;