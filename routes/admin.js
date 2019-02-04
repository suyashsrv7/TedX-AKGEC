const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const content = require('../controllers/content');
const passport = require('passport');


router.post('/admin-login', auth.login);
router.post('/create-admin', auth.createAdmin);

router.get('/protected', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send("Hello you are in");
});
router.post('/create-about-us', passport.authenticate('jwt', {session: false}), content.createAboutUsContent);
router.post('/update-about-us', passport.authenticate('jwt', {session: false}), content.updateAboutUsContent);
router.post('/create-speakers', passport.authenticate('jwt', {session: false}), content.createSpeakers);

module.exports = router;