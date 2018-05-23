import {receiveAMessage} from "../actions/messageActions";
import store from '../store/configureStore';
import handler from "./messageHandler";
/* eslint-disable no-console */
let websocket = null;


export default function getWebSocket(email) {
  if (!websocket) {
    return new Promise((resolve, reject) => {
      websocket = new WebSocket("ws://localhost:1337");
      websocket.addEventListener("message", function (event) {
        const m = JSON.parse(event.data);
        console.log("socket receive: ", JSON.parse(event.data));
        handler(m);
      });

      websocket.addEventListener('open', function () {
        console.log('client open');
        websocket.send(JSON.stringify({type: 'init', email}));
        websocket.send(JSON.stringify({type: 'changeLanguage', language: 'zh'}));
        resolve(websocket);
      });

      websocket.addEventListener('error', function () {
        console.log('WebSocket connect failed');
        reject('WebSocket connect failed');
      });

      websocket.addEventListener('close', function () {
        websocket = null;
      })
    });

  }
  return websocket;
}

