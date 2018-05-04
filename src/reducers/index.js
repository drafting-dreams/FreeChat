import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import messages from './messageReducer';
import language from './languageReducer';
import scrollBar from './scrollReducer';

const rootReducer = combineReducers({
  scrollBar,
  messages,
  language,
  routing: routerReducer
});

export default rootReducer;
