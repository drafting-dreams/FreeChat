import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import messages from './messageReducer';
import language from './languageReducer';

const rootReducer = combineReducers({
  messages,
  language,
  routing: routerReducer
});

export default rootReducer;
