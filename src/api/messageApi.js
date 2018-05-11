//import delay from './delay';
import socket from '../socket/socket';

class MessageApi {
  static sendMessage(message) {
    return new Promise((resolve, reject) => {
      //translateAndSend()
      // setTimeout(() => {
      //   if(!message.content.trim())
      //     reject("Can't send empty message.");
      //   resolve(message);
      // }, delay);
      try{
        const sock = socket();
        sock.send(JSON.stringify(message));
        resolve(message);
      } catch(err) {
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
      if(!message)
        reject("Can't receive nothing.");
      resolve(message);
    });
  }
}


export default MessageApi;
