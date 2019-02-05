const Users = require('./users');
const Speakers = require('./speaker');
const About = require('./about');

const db = {
    Users: Users,
    Speakers: Speakers,
    About: About
}

module.exports = db;