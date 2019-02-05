

const db = require('../models/index');
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

        db.About.findOne({
            where: {
                id: 1
            }
        })
        .then(saved => {
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

    createSpeakers: (req, res) => {
       console.log(req.files, req.body);
        const files = req.files;
        const info = req.body;

       const speakers = new Array();
       for(let i=0; i<files.length; i++) {
           let speaker = {
               name: info.name[i],
               designation: info.designation[i],
               description: info.description[i],
               imgurl: files[i].path
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
       });
    }
       
}