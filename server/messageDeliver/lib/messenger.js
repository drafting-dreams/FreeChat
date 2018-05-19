const socketStore = require("./socketStore");
const messageStorage = require("../../messageStorage");
const translator = require("./translateApi");

function sendMessage(arg) {
  const senderConf = socketStore.get(arg.sender);
  const receiverConf = socketStore.get(arg.receiver);

  if (!receiverConf) {
    return _saveMessage(arg, 'unsent');
  }

  const message = {...arg};
  if (senderConf.language !== receiverConf.language) {
    translator(arg.content, senderConf.language, receiverConf.language)
      .then(translated => {
        message.translated = translated;
        _sendAndSaveMessage(message, receiverConf.socket)
      })
      .catch(err => {
        console.error("translate error: ", err);
      });
  } else {
    _sendAndSaveMessage(message, receiverConf.socket)
  }
}

function _sendAndSaveMessage(message, ws) {
  _saveMessage(message, 'sent');
  ws.send(JSON.stringify(message));
}

function _saveMessage(arg, status) {
  const obj = {
    from: arg.sender,
    to: arg.receiver,
    content: arg.content,
    status
  };

  if (arg.translated) {
    obj.translated = arg.translated;
  }

  messageStorage.saveMessage(obj);
}

module.exports = {sendMessage};
