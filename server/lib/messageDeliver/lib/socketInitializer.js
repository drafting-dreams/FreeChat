const store = require("./socketStore");
const messenger = require("./messenger");
const logger = require("../utils/getLogger");

const socketToId = {};

function hookUpEvent(wss) {
  wss.on('connection', function (ws) {
    ws.send(JSON.stringify({connected: true}));
    ws.on('message', function (data) {
      const message = JSON.parse(data);
      logger.debug("socket receive ", message);

      switch (message.type) {
        case "init": {
          socketToId[ws] = message.email;
          storeSocket(ws, message.email);
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