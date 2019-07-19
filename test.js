
function handler() {
    var json = { 
      type: "request",
      value: "startbattle"
    };
    json = JSON.stringify(json);
    connection.send(json);
    addMessage('Send json: '+json)
  }
  
elem.addEventListener("click", handler);

//-------------------------------------------------------------------------------------
var connection = new WebSocket('ws://127.0.0.1:5000');


connection.onopen = function () {
      // first we want users to enter their names
      // тут выполняем при открытии коннекта 
      document.getElementById('status').innerHTML = "Connected";
    };


connection.onerror = function (error) {
      // just in there were some problems with connection...
      addMessage('Sorry, but there\'s some problem with your '
      + 'connection or the server is down.')
      document.getElementById('status').innerHTML = "Connection failed";
    };


    // most important part - incoming messages
connection.onmessage = function (message) {
    try {
      var json = JSON.parse(message.data);
    } catch (e) {
      console.log('Invalid JSON: ', message.data);
      return;
      }
    
    if (json.type === 'msg') { 
        addMessage(json.message)
    } else {
        console.log('Hmm..., I\'ve never seen JSON like this:', json);
      }

     
    };

function addMessage(message) {
        var br = document.createElement("br");
        content.prepend(message); 
        content.prepend(br);
      }