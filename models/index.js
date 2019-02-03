const Users = require('./users');
const Speakers = require('./speakers');
const About = require('./about');

const db = {
    Users: Users,
    Speakers: Speakers,
    ABout: About
}

module.exports = db;