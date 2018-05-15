import {receiveAMessage} from "../actions/messageActions";
import store from '../store/configureStore';
/* eslint-disable no-console */

// export default new Promise(async $export => {
//   const module = await Promise.resolve(
//     (function establishSocket() {
//       const websocket = new WebSocket("ws://localhost:1337");
//       //const websocket = new WebSocket("ws://localhost:8080/websocket");
//       websocket.addEventListener("message", function (event) {
//         store.dispatch(receiveAMessage(JSON.parse(event.data)));
//       })
//
//       websocket.addEventListener('open', function () {
//         console.log('client open');
//       });
//
//       return websocket
//     })()
//   );
//
//   $export(module);
// });
let websocket = null;


export default function getWebSocket() {
  if (!websocket) {
    return new Promise((resolve, reject) => {
      websocket = new WebSocket("ws://localhost:1337");
      websocket.addEventListener("message", function (event) {
        store.dispatch(receiveAMessage(JSON.parse(event.data)));
      });

      websocket.addEventListener('open', function () {
        console.log('client open');
        resolve(websocket);
      });

      websocket.addEventListener('error', function() {
        reject('WebSocket connect failed');
      });

      websocket.addEventListener('close', function() {
        websocket = null;
      })
    });

  }
  return websocket;
}

