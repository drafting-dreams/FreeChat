//import delay from './delay';
import socket from '../socket/socket';


const historyMessage = [
  {
    to: '1', message: [
      {from: '2', content: 'gg', read: true},
      {from: '2', content: 'aa', read: true},
      {from: '2', content: 'dd', read: false},
      {from: '2', content: 'gg', read: false},
      {from: '2', content: 'unread', read: false},
      {from: '2', content: 'yeah', read: false}
    ]
  },
  {to: '2', message: []},
];

class MessageApi {
  static sendMessage(message, read) {
    return new Promise((resolve, reject) => {
      //translateAndSend()
      // setTimeout(() => {
      //   if(!message.content.trim())
      //     reject("Can't send empty message.");
      //   resolve(message);
      // }, delay);
      try {
        const sock = socket();
        sock.send(JSON.stringify(message));

        if (!historyMessage.find(v => v.to===message.receiver)) {
          historyMessage.push({
            to: message.receiver,
            message: [],
          });
        }

        const userMessageList = historyMessage.find(value => message.receiver === value.to);
        userMessageList.message.push(this._mapLocalMessageToHistoryMessage(message, read));
        resolve(message);
      } catch (err) {
        reject(err);
      }
    });
  }

  static listening(message) {
    return new Promise((resolve, reject) => {
      //listening()
      //and then get a translatedMessage
      // const translatedMessage = {sender: 'friend', content:"I'm from your friend!"};
      // setTimeout(() => {
      //   if(!translatedMessage)
      //     reject("Can't receive nothing.");
      //   resolve(translatedMessage);
      // })
      if (!message)
        reject("Can't receive nothing.");
      resolve(message);
    });
  }

  static getHistoryMessage(user, friend, end) {
    return new Promise((resolve) => {
      const userMessageList = historyMessage.find(value => user === value.to);
      if (userMessageList) {
        const history = userMessageList.message.filter(message => message.from === friend);
        let recentHistory = null;
        if (end < 0)
          recentHistory = history.slice(-20).map(message => Object.assign(message, {to: user}));
        else
          recentHistory = history.slice(end - 20, end);
        const nextEnd = history.length - recentHistory.length;
        const moreHistory = history.length > recentHistory.length;
        if (recentHistory)
          resolve({history: recentHistory, more: moreHistory, end: recentHistory.length + end});
        else
          resolve({history: [], more: false, end: nextEnd});
      }
    });
  }

  static getRecentUnreadMessage(user, friend) {
    return new Promise((resolve) => {
      const userMessageList = historyMessage.find(value => user === value.to);
      if (userMessageList) {
        const history = userMessageList.message.filter(message => message.from === friend && message.read === false);
        history.forEach(v => {
          v.read = true;
        });
        const recentHistory = history.slice(-20).map(message => Object.assign(message, {to: user}));
        const nextEnd = history.length - recentHistory.length;
        const moreHistory = history.length > recentHistory.length;
        if (recentHistory) {
          console.log(recentHistory);
          resolve({history: recentHistory, more: moreHistory});
        }
        else
          resolve({history: [], more: false, end: nextEnd});
      }
    });
  }

  //TODO insertMessage to database
  // static insertNewMessage(message, read) {
  //   return new Promise((resolve) => {
  //     if (!historyMessage.find(message.receiver)) {
  //       historyMessage.push({
  //         to: message.receiver,
  //         message: [],
  //       });
  //     }
  //
  //     const userMessageList = historyMessage.find(value => message.receiver === value.to);
  //     userMessageList.message.push(this._mapLocalMessageToHistoryMessage(message, read));
  //
  //   });
  // }

  static _mapLocalMessageToHistoryMessage(message, read) {
    return {from: message.sender, content: message.content, read: read};
  }
}


export default MessageApi;
