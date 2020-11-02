var express = require('express');
var app = express();

const port = 3000;

app.get('/test', (req, res) => {
  res.send('hello world');
})

app.use(express.static('public'))

app.listen(port, () => {
  console.log('listening to port: ', port);
})