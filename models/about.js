

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
        type: Sequelize.TEXT
    },
    tedx:{
        type: Sequelize.TEXT
    },
    tedx_akgec: {
        type: Sequelize.TEXT
    },

    footer: {
        type: Sequelize.TEXT
    }
});

module.exports = About;