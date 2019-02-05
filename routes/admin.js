const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const content = require('../controllers/content');
const passport = require('passport');
const multer = require('multer');


router.post('/admin-login', auth.login);
router.post('/create-admin', auth.createAdmin);

router.post('/create-about-us', passport.authenticate('jwt', {session: false}), content.createAboutUsContent);
router.post('/update-about-us', passport.authenticate('jwt', {session: false}), content.updateAboutUsContent);

router.post('/create-speakers', passport.authenticate('jwt', {session: false}), content.createSpeakers);
router.post('/create-sponsors', passport.authenticate('jwt', {session: false}), content.createSponsors);
router.post('/create-team', passport.authenticate('jwt', {session: false}), content.createTeam);
router.get('/get-all',passport.authenticate('jwt', {session: false}), content.getAll);
router.post('/send-mail', passport.authenticate('jwt', {session: false}), content.sendMail);

router.get('/get-about-us', passport.authenticate('jwt', {session: false}), content.getAbotUsContent);
router.get('/get-speakers', passport.authenticate('jwt', {session: false}), content.getSpeakers);
router.get('/get-sponsors', passport.authenticate('jwt', {session: false}), content.getSponsors);
router.get('/get-team', passport.authenticate('jwt', {session: false}), content.getTeam);



module.exports = router;