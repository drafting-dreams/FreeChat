import translate from './translateApi';


const WebSocketServer = require('websocket').server;
const http = require('http');
const webSocketsServerPort = 1337;
let clients = [];
/* eslint-disable no-console */
const server = http.createServer(function (request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});

server.listen(webSocketsServerPort, function () {
  console.log((new Date()) + " Server is listening on port "
    + webSocketsServerPort);
});

// create the server
const wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', function (request) {
  console.log((new Date()) + ' Connection from origin '
    + request.origin + '.');
  // This is the most important callback for us, we'll handle
  // all messages from users here.
  const connection = request.accept(null, request.origin);
  const client = {connection: connection, language: 'zh', id: '', otherId: ''};
  clients.push(client);
  // we need to know client index to remove them on 'close' event
  console.log((new Date()) + ' Connection accepted.');

  connection.on('close', function (connection) {
    //If the prev windows closes before those backward windows, the index is wrong now
    //So we need to get the real index for now

    console.log((new Date()) +
      +connection.remoteAddress + " disconnected.");
    // close user connection
    clients = clients.filter(value => value !== client)
  });

  // user sent some message
  connection.on('message', function (message) {
    //const currentIndex = indices.findIndex((value) => { return value === index; });
    if (message.type === 'utf8') {
      const messageObj = JSON.parse(message.utf8Data);
      if (messageObj.type === 'language' && messageObj.language) {
        const index = clients.findIndex((value) => client === value);
        clients[index].language = messageObj.language;
        return;
      }
      if(messageObj.type === 'id' && messageObj.id) {
        client.id = messageObj.id;
        return;
      }
      if(messageObj.type === 'otherId' && messageObj.otherId) {
        client.otherId = messageObj.otherId;
        console.log(client);
        return;
      }
      console.log(message);
      const data = JSON.parse(message.utf8Data);
      //broadcast message to all connected clients
      // clients.filter(value => value !== client).forEach(value => {
      //   if (client.language !== value.language)
      //     translate(data.content, client.language, value.language).then(translated => {
      //       value.connection.send(JSON.stringify({sender: data.sender, content: translated}))
      //     });
      //   else
      //     value.connection.send(message.utf8Data);
      //   //value.connection.send(translatedMessage);
      // });
      const other = clients.find((value) => value.id === client.otherId);

      if (other) {
        if (client.language !== other.language) {
          translate(data.content, client.language, other.language).then(translated => {
            other.connection.send(JSON.stringify({sender: data.sender, content: translated}))
          });
        } else
          other.connection.send(message.utf8Data);
      }
    }
  });

});
