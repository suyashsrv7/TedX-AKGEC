const express = require('express');
var pg = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const sequelize = require('./utils/database');
pg.defaults.ssl = true;

app.use(cors());
// app.get('/welcome', (req, res) => {
//   res.status(200).send("welcome to followup");
// })
app.get('/', (req, res)=>{
  res.send("Hello")
})


sequelize
  .sync()
  .then(res => {
    app.listen(port, function () {
      console.log('Example app listening on port ' + port);
    })
  })
  .catch(err => console.log(err));