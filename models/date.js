

const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const EventDate = sequelize.define('eventdate', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    event_date: {
        type: Sequelize.STRING
    }
});

module.exports = EventDate;