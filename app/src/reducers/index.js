import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import messages from './messageReducer';
import language from './languageReducer';
import scrollBar from './scrollReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  user,
  scrollBar,
  messages,
  language,
  routing: routerReducer
});

export default rootReducer;
