const WebSocketServer = require('websocket').server;
const http = require('http');
const webSocketsServerPort = 1337;
const clients = [];
const indices = [];
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
  // we need to know client index to remove them on 'close' event
  let index = clients.push(connection) - 1;
  indices.push(index);
  console.log((new Date()) + ' Connection accepted.');

  // user sent some message
  // connection.on('message', function (message) {
  //   if(message.type === 'utf8') {
  //     const date = message.utf8Data;
  //     //broadcast message to all connected clients
  //     for (let i=0; i < clients.length; i++) {
  //       clients[i].send(data);
  //     }
  //     // clients.filter((value, ind) => ind !== index).forEach((client) => {
  //     //   client.send(message);
  //     // });
  //   }
  //   //console.log(JSON.stringify(message));
  // });

  connection.on('close', function (connection) {
    //If the prev windows closes before those backward windows, the index is wrong now
    //So we need to get the real index for now
    const currentIndex = indices.findIndex((value) => { return value === index; });

    console.log((new Date()) +
      + connection.remoteAddress + " disconnected.");
    // close user connection
    clients.splice(currentIndex, 1);
    indices.splice(currentIndex, 1);
  });

  // user sent some message
  connection.on('message', function(message) {
    const currentIndex = indices.findIndex((value) => { return value === index; });
    if(message.type === 'utf8') {
      const data = message.utf8Data;
      //broadcast message to all connected clients
      // for(let i=0; i<clients.length; i++)
      //   clients[i].send(data);
      clients.filter((value, ind) => ind !== currentIndex).forEach((client) => {client.send(data);});
    }
  });

});
