const db = require('../models/index');
const bcrypt = require('bcryptjs');
const authConfig = require('../utils/authConfig');

module.exports = {
    createAdmin: (req, res) => {
       const user = {
           username: req.body.username,
           password: req.body.password,
           role: 0   
       }
       // role can be changed
       db.Users.create(user).then(saved => {
           res.status(200).json({success: true});
       })
       .catch(err => {
           res.status(500).json({success: false, err: err});
       })

    },

    login: (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        console.log(username, password);
        
        const query = db.Users.findOne({
            where: {
                username: username
            }
        });
        const verifyPassword = query.then(exists => {
            if(exists)
                return bcrypt.compare(password, exists.password);
            else 
                return 0;
        });

        Promise.all([query, verifyPassword]).then(([resA, resB]) => {
            if(resB === true && resA.role == 0) {
                const token = authConfig.generateToken({id: resA.id}, '3h');
                resA.password = undefined;
                resA.id = undefined;
                res.status(200).json({success: true, token: token});
            } else if(resB === false || resA.role != 0) {
                res.status(401).json({success: false, err: "Unauthorized"});
            } else if(resB === 0) {
                res.status(404).json({success: false, err: "Not found"});
            }
        })
        .catch((err) => {
            res.status(500).json({success: false, err: err});
        })
    }
}