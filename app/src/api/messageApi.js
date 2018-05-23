//import delay from './delay';
import socket from '../socket/socket';

class MessageApi {
  static sendMessage(message) {
    message.type = "messaging";
    // todo: to be refactored
    const sock = socket();
    sock.send(JSON.stringify(message));
  }

  static getHistoryMessage(user, friend) {
    socket().send(JSON.stringify({
      type: "getHistory",
      sender: user,
      receiver: friend
    }));
  }

  static _mapLocalMessageToHistoryMessage(message, read) {
    return {from: message.sender, content: message.content, read: read};
  }
}


export default MessageApi;
