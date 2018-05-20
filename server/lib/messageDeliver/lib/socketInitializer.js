const store = require("./socketStore");
const messenger = require("./messenger");

const socketToId = {};

function hookUpEvent(wss) {
  wss.on('connection', function (ws) {
    ws.on('message', function (data) {
      const message = JSON.parse(data);

      switch (message.type) {
        case "init": {
          socketToId[ws] = message.userId;
          storeSocket(ws, message.userId);
          break;
        }

        case "changeLanguage": {
          changeLanguage(socketToId[ws], message.language);
          break;
        }

        case "messaging": {
          messenger.sendMessage(message);
          break;
        }
      }
    })
  })
}

function storeSocket(ws, id) {
  store.set(id, {socket: ws});
}

function changeLanguage(id, lan) {
  const conf = store.get(id);
  conf.language = lan;
}

module.exports = {hookUpEvent};