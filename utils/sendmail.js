const nodeMailer = require('nodemailer');
const emailTemplate = require('email-templates');
const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'akgecscrolls18@gmail.com', 
        pass: 'hashakgec18'
    }
}); 


module.exports = {
    sendYourMail: function(from, to, subject, message, callback) {
        let mailOptions = {
            from: from,
            to: to,
            subject: subject,
            text: message
        }
        transporter.sendMail(mailOptions, function(error, response) {
            if (error) {
                console.log(error);
                callback(error);
            } else {
                callback(null, response);
            }
        });
    }
}