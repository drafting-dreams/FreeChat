import * as types from '../constants/actionTypes';
import messageApi from '../api/messageApi';

export function sendSuccess(message) {
  return {type: types.SEND_SUCCESS, message}
}

export function receiveSuccess(message) {
  return {type: types.RECEIVE_SUCCESS, message}
}

export function getHistorySuccess(recentObj) {
  return {type: types.GET_HISTORY_SUCCESS, recentObj};
}

export function sendAMessage(message) {
  return function(dispatch) {
    return messageApi.sendMessage(message).then(message => {
      dispatch(sendSuccess(message));
    }).catch(err => {throw err});
  };
}

export function receiveAMessage(message) {
  return function(dispatch) {
    return messageApi.listening(message).then(message => {
      dispatch(receiveSuccess(message));
    }).catch(err => {throw err});
  };
}

export function getRecentHistory(user, friend) {
  return function(dispatch) {
    return messageApi.getRecentUnreadMessage(user, friend).then(recentObj=> {
      dispatch(getHistorySuccess(recentObj));
    }).catch(err => {throw err});
  };
}

export function getHistory(user, friend, end) {
  return function(dispatch) {
    return messageApi.getHistoryMessage(user, friend, end).then(recentObj=> {
      dispatch(getHistorySuccess(recentObj));
    }).catch(err => {throw err});
  };
}
