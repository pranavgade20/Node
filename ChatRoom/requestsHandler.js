var iterator = 0;

const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'test';

// Use connect method to connect to the server
var abcClient;
var abcCollection;

mongoClient.connect(url, function(err, client) {
   assert.equal(null, err);
   console.log("Connected to server.");

   var db = client.db(dbName);

   var collection = db.collection('documents');

   abcClient = client;
   abcCollection = collection;

   // set the value of the iterator
   collection.find({_id : 0}).toArray(function(err, docs) {
      assert.equal(err, null);

      iterator = docs[0].text;
      //console.log(docs);
   });

   collection.find({_id : {$gt : 0}}).toArray(function(err, docs) {
      assert.equal(err, null);

      for (var i = 0; i < docs.length; i++) {
         text.push(docs[i].text);
      }
      //console.log(docs);
   });
});

function closeClientConnection() {
   abcCollection.replaceOne({ }, {
      _id : 0,
      text : iterator
   });

   abcClient.close();
}

function addElement(val) {
   abcCollection.insertOne({
      _id : iterator,
      text : val
   }, function(err, r) {
      assert.equal(null, err);
   });
   iterator++;

   abcCollection.replaceOne({ }, {
      _id : 0,
      text : iterator
   });
}

var text = [];

function addData(requestBody) {
   if(requestBody.text == 'close'){
      closeClientConnection();
   }

   if(requestBody.text != "") {
      text.push(requestBody.text);
      addElement(requestBody.text);
   }
}

function sendData(response) { //takes the response object as a parameter
   response.send({response : text});
}

module.exports = {
   handleRequest : addData,
   sendResponse : sendData
};