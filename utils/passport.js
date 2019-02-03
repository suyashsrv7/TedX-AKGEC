const JwtStrategy = require('passport-jwt').Strategy;
const  ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const authConfig = require('./authConfig');
const db = require('../models/index');
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = authConfig.secretKey;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    const user = getUser(jwt_payload.id);
    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }
}));
async function getUser(id) {
    const user = await db.Users.findById(id);
    return user;
}