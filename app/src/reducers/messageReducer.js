import initialState from './initialState';
import * as types from '../constants/actionTypes';

//[{friendId, end, messageContents}]

export default function messageReducer(state=initialState.messages, action) {
  let tempState;
  let messageItem;
  switch(action.type) {
    case(types.SEND_SUCCESS):
      debugger;
      tempState = state.slice();
      messageItem = state.findIndex(item => item.friendId === action.message.receiver);
      if(messageItem!==-1) {
        tempState[messageItem].messageContents.push(action.message);
      } else {
        tempState.push({end: -1, friendId: action.message.receiver, messageContents: [action.message]});
      }
      return tempState;
    case(types.RECEIVE_MESSAGE_SUCCESS):
      tempState = state.slice();
      messageItem = state.findIndex(item => item.friendId === action.message.sender);
      if(messageItem!==-1) {
        tempState[messageItem].messageContents.push(action.message);
      } else {
        tempState.push({end: -1, friendId: action.message.sender, messageContents: [action.message]});
      }
      return tempState;
    case(types.GET_HISTORY_SUCCESS):
      tempState = state.slice();
      messageItem = state.findIndex(item => item.friendId === action.recentObj.friend);
      if(messageItem!==-1) {
        tempState[messageItem].messageContents.push(...action.recentObj.history.map(_mapHistoryMessage2LocalMessage));
      } else {
        tempState.push({end: -1, friendId: action.recentObj.friend, messageContents: [...action.recentObj.history.map(_mapHistoryMessage2LocalMessage)]});
      }
      return tempState;
    default:
      return state;
  }
}

function _mapHistoryMessage2LocalMessage(historyMessage) {
  return {sender: historyMessage.from, content: historyMessage.content, receiver: historyMessage.to};
}
