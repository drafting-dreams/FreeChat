import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function socketReducer(state=initialState.socket, action) {
  switch(action.type) {
    case(types.SOCKET_CONNECT_SUCCESS):
      if(state)
        return state;
      else return action
  }
}
