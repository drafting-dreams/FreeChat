import * as types from '../constants/actionTypes';
import userApi from '../api/mockUserApi';

export function signInSuccess(message) {
  return {type: types.SIGN_IN_SUCCESS, message};
}

export function signIn(user) {
  return function(dispatch) {
    console.log('in signAction diaoyong userapizhong')
    return userApi.signIn(user).then(message => {
      dispatch(signInSuccess(message));
    }).catch(err => {throw err})
  }
}
