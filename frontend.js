$(function () {
    "use strict";
    // for better performance - to avoid searching in DOM
    var content = $('#content');
    var input = $('#input');
    var status = $('#ip');
    //var elem = $('#elem');
    // my color assigned by the server
    var myColor = false;
    // my name sent to the server
    var myName = false;
    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    // if browser doesn't support WebSocket, just show
    // some notification and exit
    
    elem.onclick = function {
      /*var command = new Object();
      command.type = 'request'
      command.value = 'startbattle'
      var json = JSON.stringify(command)
      connection.send(json);
      addMessage( "-- THE BUTTON WAS PRESSED. I sent JSON: "+json);
      */
     alert( 'Клик!' );
    });

    if (!window.WebSocket) {
      content.html($('<p>',
        { text:'Sorry, but your browser doesn\'t support WebSocket.'}
      ));
      input.hide();
      $('span').hide();
      return;
    }
    // open connection
    var connection = new WebSocket('ws://127.0.0.1:5000');
    connection.onopen = function () {
      // first we want users to enter their names
      // тут выполняем при открытии коннекта 
      status.text('Connected')
    };
    connection.onerror = function (error) {
      // just in there were some problems with connection...
      content.html($('<p>', {
        text: 'Sorry, but there\'s some problem with your '
           + 'connection or the server is down.'
      }));
    };
    // most important part - incoming messages
    connection.onmessage = function (message) {
      // try to parse JSON message. Because we know that the server
      // always returns JSON this should work without any problem but
      // we should make sure that the massage is not chunked or
      // otherwise damaged.
      try {
        var json = JSON.parse(message.data);
      } catch (e) {
        console.log('Invalid JSON: ', message.data);
        return;
      }
      // NOTE: if you're not sure about the JSON structure
      // check the server source code above
      // first response from the server with user's color
      if (json.type === 'msg') { 
         addMessage(json.message)
      } 
      /*
      else if (json.type === 'history') { // entire message history
        // insert every single message to the chat window
        for (var i=0; i < json.data.length; i++) {
        addMessage(json.data[i].author, json.data[i].text,
            json.data[i].color, new Date(json.data[i].time));
        }
      } else if (json.type === 'message') { // it's a single message
        // let the user write another message
        input.removeAttr('disabled'); 
        addMessage(json.data.author, json.data.text,
                   json.data.color, new Date(json.data.time));
      } 
      */
      else {
        console.log('Hmm..., I\'ve never seen JSON like this:', json);
      }
    };
    /**
     * This method is optional. If the server wasn't able to
     * respond to the in 3 seconds then show some error message 
     * to notify the user that something is wrong.
     */
    setInterval(function() {
      if (connection.readyState !== 1) {
        status.text('Error');
        input.attr('disabled', 'disabled').val(
            'Unable to communicate with the WebSocket server.');
      }
    }, 3000);
    /**
     * Add message to the chat window
    
    function addMessage(author, message, color, dt) {
      content.prepend('<p><span style="color:' + color + '">'
          + author + '</span> @ ' + (dt.getHours() < 10 ? '0'
          + dt.getHours() : dt.getHours()) + ':'
          + (dt.getMinutes() < 10
            ? '0' + dt.getMinutes() : dt.getMinutes())
          + ': ' + message + '</p>');
    }
     */

    function addMessage(message) {
      content.prepend('<p>' + message + '</p>'); 
    }
  });