// ---------- server --------------
var express = require('express');
var app = express();
// var db = require('./db.js');

const port = 3000;

app.use(express.json());

// ----------- connection to database ---------------
var mysql = require('mysql');
var connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'multistep_checkout'
});

connection.connect();

var query = (queryStr, values, callback) => {
  connection.query(queryStr, values, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  })
};

// ------------ server & routes -------------------
app.get('/users', (req, res) => {
  query('SELECT name FROM user_accounts', [], (err, results) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.json(results);
    }
  })
})

app.post('/user', (req, res) => {
  var data = req.body;
  console.log('data', data)
  var queryStr = "INSERT INTO user_accounts (name, email, password) VALUES (?, ?, ?);";
  var values = [data.name, data.email, data.password];
  query(queryStr, values, (err, results) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.sendStatus(201);
    }
  })
})

app.use(express.static('public'))

app.listen(port, () => {
  console.log('listening to port: ', port);
})