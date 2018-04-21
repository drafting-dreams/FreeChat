import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import messages from './messageReducer';

const rootReducer = combineReducers({
  messages,
  routing: routerReducer
});

export default rootReducer;
