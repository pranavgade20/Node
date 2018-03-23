var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('public')); //expose the public directory
var handler = require('./requestsHandler'); //a module to handle requests

var port = 8080;

app.get('/', function(req, res) {
   res.sendFile(__dirname + '/public/index.html');
});

app.get('/getResponse', function(req, res) {
   //send response to the client
	handler.sendResponse(res);
});

app.post('/sendRequest', function(req, res) {
   //add the text from client to the array text
   handler.handleRequest(req.body);

   //send response to the client
   handler.sendResponse(res);
});

app.listen(port);

console.log('Running on port '+port+'!');