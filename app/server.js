// dependencies
var express = require('express')
var path = require('path');
var bodyParser = require('body-parser')
var app = express();
var server = require("http").createServer(app)

app.set('views', './app/views');
app.set('view engine', 'jade');

// set base path
var baseDir = path.normalize(path.join(__dirname, '../public'));
app.use(express.static(baseDir));

var urlencodedParser = bodyParser.urlencoded({ extended: false })
// require db facility
var db = require('./db');

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

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

server.listen(3000);
console.log('app start listen to port 3000');