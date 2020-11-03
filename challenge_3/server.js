var express = require('express');
var app = express();

const port = 3000;

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

