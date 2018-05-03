import socket from '../socket/socket';

class MessageApi {
  static changeLanguage(language) {
    return new Promise((resolve, reject) => {
      try {
        const lang = JSON.stringify({type: 'language', language: language});
        console.log(lang);
        socket.send(lang);
        resolve(language);
      } catch(err) {
        reject(err);
      }
    });
  }
}

export default MessageApi;
