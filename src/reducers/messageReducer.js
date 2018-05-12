import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function messageReducer(state=initialState.messages, action) {
  switch(action.type) {
    case(types.SEND_SUCCESS):
    case(types.RECEIVE_SUCCESS):
      return [...state, action.message];
    case(types.GET_HISTORY_SUCCESS):
      const newMessage = action.recentObj.history.map(_mapHistoryMessage2LocalMessage);
      return [...newMessage, ...state];
    default:
      return state;
  }
}

function _mapHistoryMessage2LocalMessage(historyMessage) {
  return {sender: historyMessage.from, content: historyMessage.content, receiver: historyMessage.to};
}
