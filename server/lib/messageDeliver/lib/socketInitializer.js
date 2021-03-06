const store = require("./socketStore");
const messenger = require("./messenger");
const logger = require("../utils/getLogger");
const messageStorage = require("../../messageStorage/index");

function hookUpEvent(wss) {
  wss.on('connection', function (ws) {
    ws.send(JSON.stringify({connected: true}));
    ws.on('message', function (data) {
      const message = JSON.parse(data);
      logger.debug(`socket receive `, message);

      switch (message.type) {
        case "init": {
          ws.email = message.email;
          storeSocket(ws, message.email);
          break;
        }

        case "changeLanguage": {
          changeLanguage(ws.email, message.language);
          break;
        }

        case "messaging": {
          messenger.sendMessage(message);
          break;
        }

        case "getHistory": {
          messageStorage.getHistoryMessage(message.sender, message.receiver)
            .then(messages => {
              ws.send(JSON.stringify({
                type: "historyMessage", messages,
                sender: message.sender,
                receiver: message.receiver
              }));
            })
        }

      }
    })
  })
}

function storeSocket(ws, id) {
  store.set(id, {socket: ws});
}

function changeLanguage(id, lan) {
  logger.debug(`change ${id}'s language to ${lan}`);
  const conf = store.get(id);
  conf.language = lan;
}

module.exports = {hookUpEvent};