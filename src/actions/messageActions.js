import * as types from '../constants/actionTypes';
import messageApi from '../api/messageApi';

export function sendSuccess(message) {
  return {type: types.SEND_SUCCESS, message}
}

export function receiveSuccess(message) {
  return {type: types.RECEIVE_SUCCESS, message}
}

export function sendAMessage(message) {
  return function(dispatch) {
    return messageApi.sendMessage(message).then(message => {
      dispatch(sendSuccess(message));
    }).catch(err => {throw err})
  };
}

export function receiveAMessage(message) {
  return function(dispatch) {
    return messageApi.listening(message).then(message => {
      dispatch(receiveSuccess(message));
    }).catch(err => {throw err})
  };
}
