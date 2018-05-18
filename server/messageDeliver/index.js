const WebSocketServer = require('ws').Server;

const webSocketsServerPort = process.env.SOCKET_PORT;
const wss = new WebSocketServer({port: webSocketsServerPort});

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
  });
});