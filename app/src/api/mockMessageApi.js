import delay from './delay';

class MessageApi {
  static sendMessage(message) {
    return new Promise((resolve, reject) => {
      //translateAndSend()
      setTimeout(() => {
        if(!message.content.trim())
          reject("Can't send empty message.");
        resolve(message);
      }, delay);
    });
  }

  static listening() {
    return new Promise((resolve, reject) => {
      //listening()
      //and then get a translatedMessage
      const translatedMessage = {sender: 'friend', content:"I'm from your friend!"};
      setTimeout(() => {
        if(!translatedMessage)
          reject("Can't receive nothing.");
        resolve(translatedMessage);
      })
    });
  }
}


export default MessageApi;
