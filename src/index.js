
/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import configureStore, {history} from './store/configureStore';
import './style/styles.sass'
import {receiveAMessage} from "./actions/messageActions";
import Root from './components/Root';
require('./favicon.ico'); // Tell webpack to load favicon.ico
const store = configureStore();
//mock receiving
store.dispatch(receiveAMessage());

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
