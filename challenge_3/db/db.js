var mysql = require('mysql');
var connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'multistep_checkout'
});

connection.connect();

var query = connection.query(queryStr, callback) => {
  if (err) {
    callback(err);
  } else {
    callback(null, results);
  }
};

module.exports = query;