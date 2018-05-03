import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function messageReducer(state=initialState.language, action) {
  switch(action.type) {
    case(types.SWITCH_LANGUAGE_SUCCESS):
      return action.language;
    default:
      return state;
  }
}
