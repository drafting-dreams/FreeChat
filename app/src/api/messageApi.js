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
  static sendMessage(message) {
    message.type = "messaging";
    // todo: to be refactored
    const sock = socket();
    sock.send(JSON.stringify(message));
  }

  static getHistoryMessage(user, friend, end) {
    return new Promise((resolve) => {
      const userMessageList = historyMessage.find(value => user === value.to);
      if (userMessageList) {
        const history = userMessageList.message.filter(message => message.from === friend);
        history.forEach(v => {
          v.read = true;
        });
        let recentHistory = [];
        let nextEnd;
        if (end < 0) {
          recentHistory = history.slice(-20).map(message => Object.assign(message, {to: user}));
          nextEnd = history.length - recentHistory.length;
        }
        else {
          recentHistory = history.slice(end - 20, end).map(message => Object.assign(message, {to: user}));
          nextEnd = end - recentHistory.length;
        }
        //const moreHistory = history.length > recentHistory.length;
        //console.log('nextEnd', nextEnd, recentHistory);
        if (recentHistory)
          resolve({history: recentHistory, end: nextEnd, friend: friend});
        else
          resolve({history: [], end: nextEnd, friend: friend});
      }
    });
  }

  static getRecentUnreadMessage(user, friend, end) {
    return new Promise((resolve) => {
      const userMessageList = historyMessage.find(value => user === value.to);
      if (userMessageList) {
        const history = userMessageList.message.filter(message => message.from === friend);
        const unreadHistory = history.filter(message => message.read === false);
        unreadHistory.forEach(v => {
          v.read = true;
        });
        const recentUnreadHistory = unreadHistory.slice(-20).map(message => Object.assign(message, {to: user}));
        const nextEnd = history.length - recentUnreadHistory.length;
        //const moreHistory = history.length > recentHistory.length;
        if (recentUnreadHistory.length > 0) {
          resolve({history: recentUnreadHistory, end: nextEnd, friend: friend});
        }
        else {
          if (end === -1)
            resolve({history: [], end: history.length - 1, friend: friend});
          else
            resolve({history: [], end: end, friend: friend});
        }
      } else {
        historyMessage.push({
          to: user,
          message: [],
        });
        resolve({history: [], end: end, friend: friend});
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
