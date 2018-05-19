import socket from '../socket/socket';

class LanguageApi {
  static changeLanguage(language) {
    return new Promise((resolve, reject) => {
      try {
        const lang = JSON.stringify({type: 'language', language: language});
        const sock = socket();
        sock.send(lang);
        resolve(language);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default LanguageApi;
