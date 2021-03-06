var express = require('express')
var path = require('path');
var app = express();
var server = require("http").createServer(app)
var bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })
// require db facility
var db = require('./db');

// roughly allow cors request
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.post('/user', urlencodedParser, function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  console.log('saving ' + email + ' ' + password + ' into db');
  // save to db
  db.run('INSERT INTO "user" (email, password) VALUES ("' + email + '", "' + password + '")', function (err, r) {
    if (err) {
      res.status(500).send('stg wrong with db');
    } else {
      setTimeout(function () {
        res.status(200).send('successful');
      }, 4000);
    }
  });
})

app.get('/user', function (req, res) {
  db.all('SELECT * FROM user', function (err, users) {
    if (err) {
      console.error(err);
    } else {
      console.log('users: ', users);
      resObj = {'users': users};
      res.status(200).send(resObj);
    }
  }) 
})

server.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})

// set base path
baseDir = path.normalize(__dirname + "/../public");
app.use(express.static(baseDir));

