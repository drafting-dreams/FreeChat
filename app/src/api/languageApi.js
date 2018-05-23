import socket from '../socket/socket';

function changeLanguage(lan) {
  socket().send(JSON.stringify({type: 'changeLanguage', language: lan}));
}

export default {changeLanguage};
