const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const passport = require('passport');

router.post('/admin-login', auth.login);
router.post('/create-admin', auth.createAdmin);
router.get('/protected', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send("Hello you are in");
});

module.exports = router;