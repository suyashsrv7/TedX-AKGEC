const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const content = require('../controllers/content');
const passport = require('passport');
const multer = require('multer');
const request = require('request');
const captchaKey = '6LeRVI8UAAAAADa6liEcK1-z96iDiIFVzGDqA-P7';
const verifyCaptcha = (req, res, next) => {
    var requestQuery = req.body;
    if( requestQuery != undefined && requestQuery != '' && requestQuery != null && requestQuery.response != undefined && requestQuery.response != '' && requestQuery.response != null ){
        var response = requestQuery.response;
            var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret="+ captchaKey +"&response=" +response;
            // Hitting GET request to the URL, Google will respond with success or error scenario.
            request(verificationUrl,function(error,response,body) {
                console.log(response, body);
                body = JSON.parse(body);
                console.log(body);
                // Success will be true or false depending upon captcha validation.
                if(body.success !== undefined && !body.success) {
                    res.send({"responseCode" : 1,"responseDesc" : "captcha not found"});
                }else{
                    next();
                }
            });
    }else{
        res.send({"responseCode" : 1,"responseDesc" : "Failed captcha verification *"});
    }
}


router.post('/admin-login', auth.login);
router.post('/create-admin', auth.createAdmin);

router.post('/create-about-us', passport.authenticate('jwt', {session: false}), content.createAboutUsContent);
router.post('/update-about-us', passport.authenticate('jwt', {session: false}), content.updateAboutUsContent);

router.post('/create-speakers', passport.authenticate('jwt', {session: false}), content.createSpeakers);
router.post('/create-sponsors', passport.authenticate('jwt', {session: false}), content.createSponsors);
router.post('/create-event-date', content.createDate);
router.post('/create-team', passport.authenticate('jwt', {session: false}), content.createTeam);
router.get('/get-all',passport.authenticate('jwt', {session: false}), content.getAll);
router.post('/send-mail', verifyCaptcha, content.sendMail);

router.get('/get-about-us', passport.authenticate('jwt', {session: false}), content.getAbotUsContent);
router.get('/get-speakers', passport.authenticate('jwt', {session: false}), content.getSpeakers);
router.get('/get-sponsors', passport.authenticate('jwt', {session: false}), content.getSponsors);
router.get('/get-team', passport.authenticate('jwt', {session: false}), content.getTeam);
router.get('/get-event-date', content.getEventDate);




module.exports = router;