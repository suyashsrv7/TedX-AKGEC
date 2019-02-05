const Users = require('./users');
const Speakers = require('./speaker');
const About = require('./about');
const Team = require('./team');
const Sponsors = require('./sponsors');

const db = {
    Users: Users,
    Speakers: Speakers,
    About: About,
    Team: Team,
    Sponsors: Sponsors
}

module.exports = db;