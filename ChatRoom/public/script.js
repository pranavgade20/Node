var textArrayLength = 1;

////////////////////////////
// This function sends a GET request to the server asking for the list of
// messages.
////////////////////////////
function getServerResponse() {
   var xhttp = new XMLHttpRequest();

   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         var serverResponse = JSON.parse(this.responseText);
         setPText(serverResponse);
      }
   };

   xhttp.open('GET',"/getResponse",true);

   xhttp.send();

   setTimeout(getServerResponse, 500);
}

////////////////////////////
// This part sends a POST request to the server sending what is typed in
// the text box and also asks for the list of messages.
////////////////////////////
function sendServerRequest(argument) {
   var requestText = text1.value;
   text1.value = '';

   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         var serverResponse = JSON.parse(this.responseText);
         setPText(serverResponse);
      }
   };
   xhttp.open("POST", "sendRequest", true);
   xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   xhttp.send("text="+requestText);
}

////////////////////////
// Other functions required above
//////////////////////// 

//this function gets the JSON response fron the server; 
//and sets(currently) the innerHTML of the paragraph
function setPText(arr) {
   if(arr.response.length != textArrayLength){

      for (var i = textArrayLength; i < arr.response.length; i++) {
         var box = document.createElement("div");
         box.className = "container";

         var para = document.createElement("p");
         para.style.fontSize = "xx-large";
         para.appendChild(document.createTextNode(arr.response[i]));
         box.appendChild(para);

         document.getElementById("div1").appendChild(box);
      }
      textArrayLength = arr.response.length;
   }
}