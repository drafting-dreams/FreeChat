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
  const client = {connection: connection, language: 'zh', id: '', otherId: '', friends: []};
  clients.push(client);
  // we need to know client index to remove them on 'close' event
  console.log((new Date()) + ' Connection accepted.');

  connection.on('close', function (connection) {
    //告诉我的在线好友，我下线了
    const onlineFriends = clients.filter(cli => client.friends.some(friend => friend.id === cli.id));
    onlineFriends.forEach(friend => {
      friend.connection.send(JSON.stringify({updateFriendId: client.id, state: false}))
    });

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

      if (messageObj.type === 'id' && messageObj.id) {
        client.friends = messageObj.friends.slice();
        client.id = messageObj.id;
        const onlineFriends = clients.filter(cli => client.friends.some(friend => friend.id === cli.id));

        //在我上线后，给我的在线好友发个消息，告诉他们我在线了
        onlineFriends.forEach(friend => {
          friend.connection.send(JSON.stringify({updateFriendId: client.id, state: true}))
        });

        //获取目前我的好友在线情况
        client.friends.forEach(friend => {
          if (clients.find(client => client.id === friend.id)) {
            friend.read = true;
          } else {
            friend.read = false
          }
        });
        client.connection.send(JSON.stringify({friendState: client.friends}));
        return;
      }
      if (messageObj.type === 'otherId' && messageObj.otherId) {
        client.otherId = messageObj.otherId;
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
            other.connection.send(JSON.stringify({
              sender: data.sender,
              content: translated,
              receiver: data.receiver
            }))
          });
        } else
          other.connection.send(message.utf8Data);
      }
    }
  });
});
