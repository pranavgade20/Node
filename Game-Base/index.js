var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static('public'));

var port = 8081;

var idNum = -1;
var data = [];

app.get('/', function (req, res) {
   res.sendFile(__dirname + '/public/index.html');
});

app.get('/getID', function (req, res) {
   idNum+=1;
   data.push({id:idNum});
   res.send({yourID : idNum});
})

app.post('/sendData', function (req, res) {
   data[req.body.id] = req.body;

   res.send({response : data});
});


app.listen(port);

console.log('Listening on port '+port+'!');