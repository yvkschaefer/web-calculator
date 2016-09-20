//https://web-calculator-yvkschaefer.c9users.io

var express = require('express');
var app = express();

require('longjohn');

app.use('/files', express.static(__dirname + '/src'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/src/index.html');
});

app.listen(process.env.PORT || 8080, function() {
  console.log('Server started', process.env.PORT);
});