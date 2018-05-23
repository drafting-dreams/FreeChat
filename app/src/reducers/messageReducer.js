import initialState from './initialState';
import * as types from '../constants/actionTypes';

//[{friendId, end, messageContents}]

export default function messageReducer(state = initialState.messages, action) {
  let tempState;
  let messageItemIndex;

  switch (action.type) {
    case(types.SEND_SUCCESS): {
      tempState = state.slice();
      messageItemIndex = state.findIndex(item => item.friendId === action.message.receiver);

      if (messageItemIndex !== -1) {
        const messageObj = tempState[messageItemIndex] = {...tempState[messageItemIndex]};
        messageObj.messageListLength = tempState[messageItemIndex].messageListLength + 1;
        messageObj.messageContents = [...tempState[messageItemIndex].messageContents, action.message];
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
      messageItemIndex = state.findIndex(item => item.friendId === action.message.sender);
      if (messageItemIndex !== -1) {
        tempState[messageItemIndex] = {...tempState[messageItemIndex]};
        tempState[messageItemIndex].messageListLength = tempState[messageItemIndex].messageListLength + 1;
        const tempContents = tempState[messageItemIndex].messageContents.slice();
        tempState[messageItemIndex].messageContents = [...tempContents, action.message];
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
      messageItemIndex = state.findIndex(item => item.friendId === action.recentObj.friend);
      if (messageItemIndex !== -1) {
        tempState[messageItemIndex] = {
          friendId: action.recentObj.friend,
          messageListLength: action.recentObj.history.length,
          messageContents: [...action.recentObj.history]
        };

      } else {
        tempState.unshift({
          friendId: action.recentObj.friend,
          messageListLength: action.recentObj.history.length,
          messageContents: [...action.recentObj.history]
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
