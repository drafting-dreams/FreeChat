const WebSocketServer = require('ws').Server;
const webSocketsServerPort = process.env.SOCKET_PORT;
const wss = new WebSocketServer({port: webSocketsServerPort});
const initializer = require("./lib/socketInitializer");

initializer.hookUpEvent(wss);
