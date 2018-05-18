import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import messages from './messageReducer';
import language from './languageReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  user,
  messages,
  language,
  routing: routerReducer
});

export default rootReducer;
