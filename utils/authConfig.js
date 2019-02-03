
const jwt = require('jsonwebtoken');
const secretKey = 'Qdhyi59BhPZsjRkg';
module.exports = {
    secretKey: secretKey,
    generateToken: (payload, expiresIn) => {
        return jwt.sign(payload, secretKey, {expiresIn: expiresIn});
    },
    verifyToken: (token) => {
        return jwt.verify(token, secretKey);
    }
}