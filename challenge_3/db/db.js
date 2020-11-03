var mysql = require('mysql');
var connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'multistep checkout'
});

connection.connect();