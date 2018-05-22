import initialState from './initialState';
import * as types from '../constants/actionTypes';

//[{friendId, end, messageContents}]

export default function messageReducer(state = initialState.messages, action) {
  let tempState;
  let messageItem;

  switch (action.type) {
    case(types.SEND_SUCCESS): {
      tempState = state.slice();
      messageItem = state.findIndex(item => item.friendId === action.message.receiver);
      if (messageItem !== -1) {
        tempState[messageItem] = {...tempState[messageItem]};
        const tempContents = tempState[messageItem].messageContents.slice();
        tempState[messageItem].messageListLength = tempState[messageItem].messageListLength + 1;
        tempState[messageItem].messageContents = [...tempContents, action.message];
      } else {
        tempState.push({
          end: -1,
          friendId: action.message.receiver,
          messageListLength: 1,
          messageContents: [action.message]
        });
      }
      return tempState;
    }

    case(types.RECEIVE_MESSAGE_SUCCESS): {
      tempState = state.slice();
      messageItem = state.findIndex(item => item.friendId === action.message.sender);
      if (messageItem !== -1) {
        tempState[messageItem] = {...tempState[messageItem]};
        tempState[messageItem].messageListLength = tempState[messageItem].messageListLength + 1;
        const tempContents = tempState[messageItem].messageContents.slice();
        tempState[messageItem].messageContents = [...tempContents, action.message];
      } else {
        tempState.push({
          end: -1,
          friendId: action.message.sender,
          messageListLength: 1,
          messageContents: [action.message]
        });
      }
      return tempState;
    }

    case(types.GET_HISTORY_SUCCESS): {
      tempState = state.slice();
      messageItem = state.findIndex(item => item.friendId === action.recentObj.friend);
      if (messageItem !== -1) {
        const tempContents = tempState[messageItem].messageContents.slice();
        tempContents.unshift(...action.recentObj.history.map(_mapHistoryMessage2LocalMessage));
        tempState[messageItem] = {
          end: action.recentObj.end, friendId: tempState[messageItem].friendId,
          messageContents: tempContents, messageListLength: tempContents.length
        };
        //tempState[messageItem].messageContents.push(...action.recentObj.history.map(_mapHistoryMessage2LocalMessage));
      } else {
        tempState.unshift({
          end: action.recentObj.end,
          friendId: action.recentObj.friend,
          messageListLength: action.recentObj.history.length,
          messageContents: [...action.recentObj.history.map(_mapHistoryMessage2LocalMessage)]
        });
      }
      return tempState;
    }
    case(types.EMPTY_MESSAGE_LIST):
      return [];
    default:
      return state;
  }
}

function _mapHistoryMessage2LocalMessage(historyMessage) {
  return {sender: historyMessage.from, content: historyMessage.content, receiver: historyMessage.to};
}
