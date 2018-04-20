import delay from './delay';

class MessageApi {
  static sendMessage(message) {
    return new Promise((resolve, reject) => {
      //translateAndSend()
      setTimeout(() => {
        if(!message.trim())
          reject("Can't send empty message.");
        resolve(message);
      }, delay);
    });
  }
}

export default MessageApi;
