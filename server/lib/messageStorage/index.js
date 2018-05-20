const messageManager = require("./lib/messageManager");
const logger = require("./utils/getLogger");


function saveMessage(arg) {
  logger.info('save message', arg);
  return messageManager.saveMessage(arg);
}

function getMessage(arg) {
  logger.info('get message', arg);
  return messageManager.getMessage(arg);
}

function updateAllUnsentMessage(arg) {
  logger.info('update message', arg);
  return messageManager.updateAllUnsentMessage(arg)
}

module.exports = {saveMessage, getMessage, updateAllUnsentMessage};


