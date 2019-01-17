var iterator = 0;
var text = [];

function addData(requestBody) {
   if(requestBody.text != "") {
      text.push(requestBody.text);
      console.log(requestBody.text)
   }
}

function sendData(response) { //takes the response object as a parameter
   response.send({response : text});
}

module.exports = {
   handleRequest : addData,
   sendResponse : sendData
};