
const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Team = sequelize.define('team', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    designation:{
        type: Sequelize.STRING
    },
    imgurl:{
        type: Sequelize.STRING
    }
});

module.exports = Team;