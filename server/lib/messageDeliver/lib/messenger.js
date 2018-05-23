const socketStore = require("./socketStore");
const messageStorage = require("../../messageStorage");
const translator = require("./translateApi");
const logger = require("../utils/getLogger");

function sendMessage(arg) {
  const senderConf = socketStore.get(arg.sender);
  const receiverConf = socketStore.get(arg.receiver);

  logger.debug("send message", arg);

  if (!receiverConf) {
    return _saveMessage(arg, 'unsent');
  }

  const message = {...arg};
  if (senderConf.language !== receiverConf.language) {
    logger.debug(`translate ${senderConf.language} to ${receiverConf.language}`);
    translator(arg.content, senderConf.language, receiverConf.language)
        .then(translated => {
          message.translated = translated;
          logger.debug(`translated message ${translated}`);
          _sendAndSaveMessage(message, receiverConf.socket);
        })
        .catch(err => {
          console.error("translate error: ", err);
        });
  } else {
    _sendAndSaveMessage(message, receiverConf.socket);
  }
}

function _sendAndSaveMessage(message, ws) {
  _saveMessage(message, 'sent');

  const m = {
    type: "messaging",
    sender: message.sender,
    receiver: message.receiver,
    content: message.content,
    translated: message.translated
  };
  ws.send(JSON.stringify(m));
}

function _saveMessage(arg, status) {
  const obj = {
    sender: arg.sender,
    receiver: arg.receiver,
    message: arg.content,
    status
  };

  if (arg.translated) {
    obj.translated = arg.translated;
  }

  messageStorage.saveMessage(obj);
}

module.exports = {sendMessage};
