const Message = require("../models/Message");



/***
 * get message
 * @param arg {from,to,message,status}
 */

function saveMessage(arg) {
  const message = new Message(arg);
  return message.save()
    .then(res => {
      return {success: true, result: res}
    })
    .catch(err => {
      console.error(err);
      return {success: false, error: err}
    });
}

function getMessage(arg) {
  return Message.find({...arg})
    .then(res => {
      return res;
    });
}

function updateAllUnsentMessage(arg) {
  return Message.find({from: arg.from, to: arg.to, status: 'unsent'})
    .then(messages => {
      return Promise.all(messages.map(m => {
        m.set({status: 'sent'});
        return m.save();
      }))
    });
}

module.exports = {saveMessage, getMessage, updateAllUnsentMessage};

