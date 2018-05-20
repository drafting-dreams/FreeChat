import {receiveAMessage} from "../actions/messageActions";
import store from '../store/configureStore';
/* eslint-disable no-console */
let websocket = null;


export default function getWebSocket(email) {
  if (!websocket) {
    return new Promise((resolve, reject) => {
      websocket = new WebSocket("ws://localhost:1337");
      websocket.addEventListener("message", function (event) {
        store.dispatch(receiveAMessage(JSON.parse(event.data)));
      });

      websocket.addEventListener('open', function () {
        console.log('client open');
        websocket.send(JSON.stringify({type: 'init', email}));
        resolve(websocket);
      });

      websocket.addEventListener('error', function () {
        reject('WebSocket connect failed');
      });

      websocket.addEventListener('close', function () {
        websocket = null;
      })
    });

  }
  return websocket;
}

