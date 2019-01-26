const Sequelize = require('sequelize');
let url = process.env.DATABASE_URL || 'postgres://ohuuvutpdmqeyx:c6ba12eb1c88e52d100216590034241d16116e39699d8a3fc5650b45754ce347@ec2-54-163-246-159.compute-1.amazonaws.com:5432/d2nd6040r0rqh7';
const sequelize = new Sequelize(url, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    }
});
module.exports = sequelize;
