

const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const About = sequelize.define('about', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    ted: {
        type: Sequelize.STRING
    },
    tedx:{
        type: Sequelize.STRING
    },
    tedx_akgec: {
        type: Sequelize.STRING
    }
});

module.exports = About;