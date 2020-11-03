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

var queryTest = (queryStr, values, callback) => {
  connection.query(queryStr, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  })
};

// ------------ server & routes -------------------
app.get('/users', (req, res) => {
  queryTest('SELECT * FROM users', [], (err, results) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.json(results);
    }
  })
})

app.post('/user', (req, res) => {
  res.send('user endpoint');
})
app.post('/shipping', (req, res) => {
  res.send('shipping endpoint');
})
app.post('/billing', (req, res) => {
  res.send('shipping endpoint');
})

app.use(express.static('public'))

app.listen(port, () => {
  console.log('listening to port: ', port);
})