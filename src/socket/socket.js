import {receiveAMessage} from "../actions/messageActions";
import store from '../store/configureStore';
/* eslint-disable no-console */

export default (function establishSocket() {
  const websocket = new WebSocket("ws://localhost:1337");
  //const websocket = new WebSocket("ws://localhost:8080/websocket");
  websocket.addEventListener("message", function (event) {
    store.dispatch(receiveAMessage(event.data));
  })

  websocket.addEventListener('open', function () {
    //websocket.send('A');
    console.log('client open');
  });

  return websocket
})();

