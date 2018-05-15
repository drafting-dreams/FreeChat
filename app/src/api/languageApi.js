import socket from '../socket/socket';

class MessageApi {
  static changeLanguage(language) {
    return new Promise((resolve, reject) => {
      try {
        const lang = JSON.stringify({type: 'language', language: language});
        const sock = socket();
        sock.send(lang);
        resolve(language);
      } catch(err) {
        reject(err);
      }
    });
  }
}

export default MessageApi;
