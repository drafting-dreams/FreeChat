import * as types from '../constants/actionTypes';
import messageApi from '../api/messageApi';

export function sendSuccess(message) {
  return {type: types.SEND_SUCCESS, message}
}

export function receiveMessageSuccess(message) {
  return {type: types.RECEIVE_MESSAGE_SUCCESS, message}
}

export function getHistorySuccess(recentObj) {
  return {type: types.GET_HISTORY_SUCCESS, recentObj};
}

export function receiveFriendStateSuccess(friendState) {
  return {type: types.RECEIVE_FRIEND_STATE_SUCCESS, friendState};
}

export function updateFriendList(friedns) {
  return {type: types.UPDATE_FRIEND_LIST, friends: friedns};
}

export function emptyMessageList() {
  return {type: types.EMPTY_MESSAGE_LIST};
}

export function lenMessageList(friend, addon) {
  return {type: types.ADD_LENGTH, friend, addon};
}

//todo deprecated
export function sendAMessage(message) {
  return messageApi.sendMessage(message);
}

//todo deprecated
export function receiveAMessage(message) {
  return function (dispatch) {
    const propertyNames = Object.getOwnPropertyNames(message);
    if (propertyNames.includes("friendState"))
      dispatch(receiveFriendStateSuccess(message));
    else if (propertyNames.includes('updateFriendId'))
      dispatch(updateFriendList(message));
    else
      dispatch(receiveMessageSuccess(message));
  };
  // return function(dispatch) {
  //   return messageApi.listening(message).then(message => {
  //     const propertyNames = Object.getOwnPropertyNames(message);
  //     if(propertyNames.includes("friendState"))
  //       dispatch(receiveFriendStateSuccess(message));
  //     else if(propertyNames.includes('updateFriendId'))
  //       dispatch(updateFriendList(message));
  //     else
  //       dispatch(receiveMessageSuccess(message));
  //   }).catch(err => {throw err});
  // };
}

export function getRecentHistory(user, friend, end) {
  return function (dispatch) {
    return messageApi.getRecentUnreadMessage(user, friend, end).then(recentObj => {
      dispatch(getHistorySuccess(recentObj));
    }).catch(err => {
      throw err
    });
  };
}

export function getHistory(user, friend, end) {
  return function (dispatch) {
    return messageApi.getHistoryMessage(user, friend, end).then(recentObj => {
      dispatch(getHistorySuccess(recentObj));
    }).catch(err => {
      throw err
    });
  };
}
