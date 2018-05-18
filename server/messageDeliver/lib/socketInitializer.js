const store = require("./socketStore");
const messenger = require("./messageSender");

function hookUpEvent(wss) {
  wss.on('connection', function (ws) {
    ws.on('message', function (data) {
      const message = JSON.parse(data);

      switch (message.type) {
        case "init": {
          storeSocket(ws, message.userId);
          break;
        }

        case "messaging": {
          messenger.sendMessage(data);
          break;
        }
      }
    })
  })
}

function storeSocket(ws, id) {
  store.set(id, ws);
}