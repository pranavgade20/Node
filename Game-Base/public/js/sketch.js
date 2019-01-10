var id = 0;
var responses = [];

function setup(){
   createCanvas(500, 500);
   background(200);
   getID();
   sendData(mouseX, mouseY);

   frameRate(10);
}

function draw(){
   background(200);
   fill(255);
   ellipse(mouseX, mouseY, 100, 100);
   fill(255, 255, 0);
   for (var i = responses.length - 1; i >= 0; i--) {
      ellipse(responses[i].x, responses[i].y, 100, 100);
   }
   sendData(mouseX, mouseY);
}

function sendData(mx, my) {
   var xhttp = new XMLHttpRequest();
   xhttp.open("POST", "sendData", true);
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         var serverResponse = JSON.parse(this.responseText);
         handleServerResponse(serverResponse);
      }
   };
   xhttp.setRequestHeader("Content-type", "application/json");
   var data = JSON.stringify({"id":id, "x":mx, "y":my});
   xhttp.send(data);
}
function handleServerResponse(res) {
   var arr = res.response;
   arr[id].x = -100;
   arr[id].y = -100;

   responses = arr;
}

function getID() {
   var xhttp = new XMLHttpRequest();

   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         var serverResponse = JSON.parse(this.responseText);
         id = serverResponse.yourID;
      }
   };

   xhttp.open('GET',"/getID",true);

   xhttp.send();
}