const WebSocketServer = require('ws').Server;
const webSocketsServerPort = process.env.SOCKET_PORT;
const wss = new WebSocketServer({port: webSocketsServerPort});
const logger = require("../../utils/getLogger");

wss.on('connection', function (ws) {
  logger.info('new connection');
  ws.on('message', function (message) {
    logger.info('get message ', JSON.parse(message));
  });
});