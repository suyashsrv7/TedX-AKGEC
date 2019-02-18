

const db = require('../models/index');
const mail = require('../utils/sendmail');
function countRemainingDays(date) {
    let newDate = new Date(date);
    let dateNow = new Date();
    let add = (5*3600 + 30*60) * 1000;
    let futureTime = newDate.getTime() + add;
    // console.log(newDate);
    let istDAte = new Date(dateNow.getTime()+add);
    // console.log(istDAte);
    let currentTime = istDAte.getTime();
    let daysLeft = (futureTime - currentTime) / (24*3600*1000);
    // console.log(Math.ceil(daysLeft));
    return daysLeft;


} 

module.exports = {
    createAboutUsContent: (req, res) => {
        let aboutUs = {
            ted: req.body.ted,
            tedx: req.body.tedx,
            tedx_akgec: req.body.tedx_akgec,
            footer: req.body.footer
        }

        db.About.create(aboutUs)
            .then(saved => { res.status(200).json({success: true, saved: saved })})
            .catch(err => { res.status(500).json({success: false, err: err })})
    },

    updateAboutUsContent: (req, res) => {
        let aboutUs = {
            ted: req.body.ted,
            tedx: req.body.tedx,
            tedx_akgec: req.body.tedx_akgec,
            footer: req.body.footer
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
                tedx_akgec: aboutUs.tedx_akgec,
                footer: aboutUs.footer
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
       if(typeof(req.body.name) === "string" && typeof(req.body.designation) === "string" && typeof(req.body.description) === "string") {
            let speaker = {
                name: req.body.name,
                designation: req.body.designation,
                description: req.body.description,
                imgurl: files[0].filename
            }
            speakers.push(speaker);
        } else {
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
        let members = new Array();
        console.log(files, info);
        if(typeof(req.body.name) === "string" && typeof(req.body.designation) === "string") {
            let member = {
                name: req.body.name,
                designation: req.body.designation,
                imgurl: files[0].filename
            }
            members.push(member);
        } else {
            for(let i=0; i<files.length; i++) {
                let filename = files[i].filename;
                let member = {
                    name: info.name[i],
                    designation: info.designation[i],
                    imgurl: filename
                }
    
                members.push(member);
            }
        }
        
        

        db.Team.bulkCreate(members)
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
        const eventDate = db.EventDate.findAll();
        Promise.all([aboutUs, speakers, team, eventDate]).then(([resA, resB, resC, resD]) => {
            let data;
            if(resA && resB && resC && resD) {
                console.log(resD[0].event_date);
                 data = {
                    aboutUs: resA,
                    speakers: resB,
                    team: resC,
                    eventDate: countRemainingDays(resD[0].event_date)
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
        message = message + " "
        mail.sendYourMail(senderMail, mailTo, subject, message, function(err, resp) {
            if(err) res.status(200).json({success: false, err: "Mail could not be sent"});
            else res.status(200).json({success: true, msg: "Mail sent successfully"});
        })

    },

    createDate: (req, res) => {
        let date = req.body.date;
        db.EventDate.create({event_date: date })
        .then(saved => {
            if(saved)
                res.status(200).json({success: true, saved: saved});
            else 
                res.status(500).json({success: false, err: "Internal Error"});
        })
        .catch(err => {
            res.status(500).json({success: false, err: err});
        })
    },

    getEventDate: (req, res) => {
        db.EventDate.findAll()
        .then(date => {
            if(date.length > 0){
                var diffDays = countRemainingDays(date[0].event_date);
                res.status(200).json({success: true, diffDays: diffDays, id:date[0].id});
            } 
            else res.status(200).json({success: false, err: "Not found"});
        })
        .catch(err => {
            res.status(500).json({success: false, err: err});
        })
    },

    updateEventDate: (req, res) => {
        db.EventDate.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(event_date => {
            if(event_date) 
                return event_date.update({
                    event_date: req.body.date
                }) 
        })
        .then(() => {
            return db.EventDate.findAll();
        })
        .then((savedDate => {
            res.status(200).json({success: true, date: savedDate});
        }))
        .catch(err => {
            res.status(500).json({success: false, err: errd})
        })
    },

    updateSpeaker: (req, res) => {
        db.Speakers.findOne({
            where: {
                id: req.body.id
            }
        })
        .then((found) => {
            if(found) return found.update({
                name: req.body.name,
                designation: req.body.designation,
                description: req.body.description,
                imgurl: req.files[0].filename
            })
        })
        .then(() => {
            return db.Speakers.findAll()
        })
        .then((allSpeakers) => {
            res.status(200).json({success: true, allSpeakers: allSpeakers});
        })
        .catch(err => {
            res.status(500).json({success: false, err: err});
        })
    },

    updateSponsor: (req, res) => {
        db.Sponsors.findOne({
            where: {
                id: req.body.id
            }
        })
        .then((found) => {
            if(found) return found.update({
                imgurl: req.files[0].filename
            })
        })
        .then(() => {
            return db.Sponsors.findAll()
        })
        .then((allSponsors) => {
            res.status(200).json({success: true, allSponsors: allSponsors});
        })
        .catch(err => {
            res.status(500).json({success: false, err: err});
        })
    },

    updateTeamMember: (req, res) => {
        db.Team.findOne({
            where: {
                id: req.body.id
            }
        })
        .then((found) => {
            if(found) return found.update({
                name: req.body.name,
                designation: req.body.designation,
                imgurl: req.files[0].filename
            })
        })
        .then(() => {
            return db.Team.findAll()
        })
        .then((allMembers) => {
            res.status(200).json({success: true, allMembers: allMembers});
        })
        .catch(err => {
            res.status(500).json({success: false, err: err});
        })
    },

    deleteSpeaker: (req, res) => {
        db.Speakers.destroy({
            where: {
                id: req.body.id
            }
        })
        .then((affectedRows) => {
            if(affectedRows > 0) res.status(200).json({succesS: true})
            else res.status(500).json({success: false});
        })
        .catch(err => {
            res.status(500).json({success: false, err:err});
        })
    },

    deleteSponsor: (req, res) => {
        db.Sponsors.destroy({
            where: {
                id: req.body.id
            }
        })
        .then((affectedRows) => {
            if(affectedRows > 0) res.status(200).json({succesS: true})
            else res.status(500).json({success: false});
        })
        .catch(err => {
            res.status(500).json({success: false, err:err});
        })
    },

    deleteTeamMember: (req, res) => {
        db.Team.destroy({
            where: {
                id: req.body.id
            }
        })
        .then((affectedRows) => {
            if(affectedRows > 0) res.status(200).json({succesS: true})
            else res.status(500).json({success: false});
        })
        .catch(err => {
            res.status(500).json({success: false, err:err});
        })
    }

       
}