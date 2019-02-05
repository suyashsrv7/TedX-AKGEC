

const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Sponsors = sequelize.define('sponsor', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    imgurl: {
        type: Sequelize.STRING
    }
});

module.exports = Sponsors;