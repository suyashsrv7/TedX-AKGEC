const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Speakers = sequelize.define('speaker', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },

    name: {
        type: Sequelize.STRING
    },

    designation: {
        type: Sequelize.STRING
    },

    description: {
        type: Sequelize.TEXT
    },

    imgurl: {
        type: Sequelize.STRING
    }

});

module.exports = Speakers;