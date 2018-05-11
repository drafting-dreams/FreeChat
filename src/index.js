
/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import store, {history} from './store/configureStore';
import './style/styles.sass'
//import {receiveAMessage} from "./actions/messageActions";
import Root from './components/Root';
require('./favicon.ico'); // Tell webpack to load favicon.ico


//mock receiving
//store.dispatch(receiveAMessage());
//Establish websocket
// const websocket = new WebSocket("ws://localhost:1337");
// websocket.addEventListener("message", function(event) {
//   store.dispatch(receiveAMessage(event.data));
// })
//
// websocket.addEventListener('open', function (event) {
//   websocket.send('Fuck Server');
// });


render(
<AppContainer>
  <Root store={store} history={history}/>
</AppContainer>,
document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default;
    render(
    <AppContainer>
      <NewRoot/>
    </AppContainer>,
    document.getElementById('app')
  );
  });
}
