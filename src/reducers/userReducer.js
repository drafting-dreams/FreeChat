import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case(types.SIGN_IN_SUCCESS):
      return Object.assign({}, action.message);
    default:
      return state;
  }
}
