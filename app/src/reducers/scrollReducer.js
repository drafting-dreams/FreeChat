import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function scrollReducer(state=initialState.messageListLength, action) {
  switch(action.type) {
    case(types.ADD_LENGTH):
      return action.newLength;
    default:
      return state;
  }
}
