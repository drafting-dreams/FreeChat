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

function getHistoryMessage(sender, receiver) {
  return Promise.all([
    getMessage({sender, receiver}),
    getMessage({sender: receiver, receiver: sender}),
  ])
      .then(res => {
        const merged = res[0].concat(res[1]);
        const result =
            merged
                .sort((a, b) => {
                  if (a.timestamp < b.timestamp) {
                    return -1;
                  }
                  return 1;
                })
                .map(m => ({
                  sender: m.sender,
                  receiver: m.receiver,
                  content: m.message,
                  translated: m.translated
                }));

        return result;
      })
}

module.exports = {saveMessage, getMessage, updateAllUnsentMessage, getHistoryMessage};

