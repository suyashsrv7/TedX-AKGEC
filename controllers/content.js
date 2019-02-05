

const db = require('../models/index');
const sendMail = require('../utils/sendmail');

module.exports = {
    createAboutUsContent: (req, res) => {
        let aboutUs = {
            ted: req.body.ted,
            tedx: req.body.tedx,
            tedx_akgec: req.body.tedx_akgec
        }

        db.About.create(aboutUs)
            .then(saved => { res.status(200).json({success: true, saved: saved })})
            .catch(err => { res.status(500).json({success: false, err: err })})
    },

    updateAboutUsContent: (req, res) => {
        let aboutUs = {
            ted: req.body.ted,
            tedx: req.body.tedx,
            tedx_akgec: req.body.tedx_akgec
        }
        console.log(aboutUs);
        db.About.findOne({
            where: {
                id: 1
            }
        })
        .then(saved => {
            console.log(saved);
            if(saved) return saved.update({
                ted: aboutUs.ted,
                tedx: aboutUs.tedx,
                tedx_akgec: aboutUs.tedx_akgec
            });
        })
        .then(() => {
            return db.About.findAll();
        })
        .then((updated) => {
            res.status(200).json({success: true, updateed: updated});
        })
        .catch(err => {
            res.status(500).json({success: false, err: err});
        })
    },

    getAbotUsContent: (rew, res) => {
        db.About.findAll().then(aboutUs => {
            if(aboutUs.length > 0) res.status(200).json({success: true, data: aboutUs});
            else res.status(500).json({success: false, err: "Not found"});
        })
        .catch(err => {
            res.status(500).json({success: false, err: err});
        })
    },

    createSpeakers: (req, res) => {
       
       const files = req.files;
       const info = req.body;
       console.log(files);
       const speakers = new Array();
       for(let i=0; i<files.length; i++) {
           let fileName = files[i].filename;
           let speaker = {
               name: info.name[i],
               designation: info.designation[i],
               description: info.description[i],
               imgurl: fileName
           }

           speakers.push(speaker);
       }
       console.log(speakers);
       db.Speakers.bulkCreate(speakers)
       .then(() => {
           return db.Speakers.findAll()
       })
       .then((allSpeakers) => {
            res.status(200).json({success: true, allSpeakers: allSpeakers}) ;
       })
       .catch(err => {res.status(500).json({success: false, err: err})});;
    },

    getSpeakers: (req, res) => {
        db.Speakers.findAll().then(speakers => {
            if(speakers.length > 0) res.status(200).json({success: true, data:speakers});
            else res.status(404).json({success: false, err: "Not found"});
        })
        .catch(err => {
            res.status(500).json({success: false, err: err});
        });
    },

    createTeam: (req, res) => {
        const files = req.files;
        const info = req.body;
        console.log(files, info);
        let members = new Array();
        for(let i=0; i<files.length; i++) {
            let filename = files[i].filename;
            let member = {
                name: info.name[i],
                designation: info.designation[i],
                imgurl: filename
            }

            members.push(member);
        }

        db.Team.bulkCreate(speakers)
       .then(() => {
           return db.Team.findAll()
       })
       .then((allMembers) => {
            res.status(200).json({success: true, data: allMembers}) ;
       })
       .catch(err => {res.status(500).json({success: false, err: err})});
    },

    getTeam: (req, res) => {
        db.Team.findAll().then(teamMembers => {
            if(teamMembers.length > 0) {
                res.status(200).json({success: true, data: teamMembers});
            } else {
                res.status(404).json({success: false, err: "Not found"});
            }
        })
        .catch(err => {
            res.status(500).json({success: true, err: err });
        })
    },

    createSponsors: (req, res) => {
        const files = req.files;
        let sponsors = new Array();
        for(let i=0; i<files.length; i++) {
            let filename = files[i].filename;
            let sponsor = {
                imgurl: filename
            }
            sponsors.push(sponsor);
        }

        db.Sponsors.bulkCreate(sponsors).then(() => {
            return db.Sponsors.findAll();
        })
        .then(allSponsors => {
            res.status(200).json({success: true, data: allSponsors});
        })
        .catch(err => {
            res.status(500).json({success: false, err: err}); 
        })
    },

    getSponsors: (req, res) => {
        db.Sponsors.findAll().then(allSponsors => {
            if(allSponsors.length > 0) {
                res.status(200).json({success: true, data: allSponsors});
            } else {
                res.status(404).json({success: false, err: "Not found"});
            }
        })
        .catch(err => {
            res.status(500).json({success: false, err: err});
        })
    },
    
    getAll: (req, res) => {
        const aboutUs = db.About.findAll();
        const speakers = db.Speakers.findAll();
        const team = db.Team.findAll();
        Promise.all([aboutUs, speakers, team]).then(([resA, resB, resC]) => {
            let data;
            if(resA && resB && resC) {
                 data = {
                    aboutUs: resA,
                    speakers: resB,
                    team: resC
                }
            } else {
                 data = null;
            }
            
            if(data)
                res.status(200).json({success: true, data: data});
            else
                res.status(404).json({success: false, err: "Not found"});
        })
    },

    sendMail: (req, res) => {
        let senderMail = 'akgecscrolls18@gmail.com';
        let name = req.body.name;
        let mailTo = 'suyashsrv7@gmail.com';
        let message = req.body.message;
        let subject = "TedX-AKGEC "+name;
        message = meassgae + " "
        sendMail(senderMail, mailTo, subject, message, function(err, res) {
            if(err) res.status(200).json({success: false, err: "Mail could not be sent"});
            else res.status(200).json({success: true, msg: "Mail sent successfully"});
        })

    }

       
}