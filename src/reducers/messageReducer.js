import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function messageReducer(state=initialState.messages, action) {
  switch(action.type) {
    case(types.SEND_SUCCESS):
    case(types.RECEIVE_SUCCESS):
      return [...state, action.message];
    default:
      return state;
  }
}
