const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const multer = require('multer');
var pg = require('pg');
const showEndpoints = require('node-express-docs');

const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;


const passportConfig = require('./utils/passport');
const sequelize = require('./utils/database');
const routes = require('./routes/admin');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },

  filename: (req, file, cb) => {
    let date = new Date();
    let filename =date.valueOf().toString() + "-" +file.originalname ;
    cb(null, filename);
  }
});

pg.defaults.ssl = true;

app.use(cors());
app.use(bodyParser.urlencoded({limit:'50mb', extended: false}));
app.use(multer({storage: storage}).array('image', 20)) ;
app.use('/api/uploads', express.static(__dirname + '/uploads'));

// app.use(bodyParser.json({limit:'50mb'}));

app.use(passport.initialize());
app.get('/', (req, res) => {
  res.send("sflkgndkjsfhkjshdflk");
})
app.use('/api', routes);
app.get("/__docs", (req, res, err)=> {
  if(req.query.pass === 'YOUR_SECRET'){
    res.send(showEndpoints(app));
  }
  else{
    res.send("<html><body><h2>UnAuthorized</h2></body></html>")
  }
});


sequelize
  .sync()
  .then(res => {
    app.listen(port, function () {
      console.log('Example app listening on port ' + port);
    })
  })
  .catch(err => console.log(err));