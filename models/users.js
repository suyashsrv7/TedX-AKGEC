const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const bcrypt = require('bcryptjs');


// role 0 => admin
// role 1 => any user 

const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey: true
        },

        username: {
            type: Sequelize.STRING,
            allowNull:false,
            unique: true
        },

        password: {
            type: Sequelize.STRING,
            allowNull:false
        },

        role: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        hooks: {
            beforeCreate: (user, options) => {
                return bcrypt.hash(user.password, 10).then((hash) => {
                    user.password = hash;
                });
            }
        }
    }
);

module.exports = User;