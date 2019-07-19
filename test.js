//const param =  import ('./params.js');
import * as param from './params.js'

/* 
BUTTONS HANDLERS
*/
function startbattle_handler() {
    var json = { 
      type: "request",
      value: "startbattle"
    };
    json = JSON.stringify(json);
    connection.send(json);
    addMessage('Send json: '+json)
  }

function getrandomship_handler() {
    var json = { 
      type: "request",
      value: "getrandomship"
    };
    json = JSON.stringify(json);
    connection.send(json);
    addMessage('Send json: '+json)
  }
  
btn_startbattle.addEventListener("click", startbattle_handler);
btn_randomship.addEventListener("click", getrandomship_handler);

//-------------------------------------------------------------------------------------
var connection = new WebSocket(param.srvipaddr);

// получилось или нет подключиться
connection.onopen = function () {
      document.getElementById('status').innerHTML = "Connected";
    };
connection.onerror = function (error) {
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
    // разбираем json.type, вызываем ф-ии
    if (json.type === 'msg') { 
        addMessage(json.message)
    } else if (json.type === 'shipinfo') {
        UpdateShipInfo(json)
      }
     else {
        console.log('Hmm..., I\'ve never seen JSON like this:', json);
      }   
    };

function addMessage(message) {
        var br = document.createElement("br");
        content.prepend(message); 
        content.prepend(br);
      }

function UpdateShipInfo(json) {
  // выполняем мероприятия по обновлению инфы на кораблях на экране
}