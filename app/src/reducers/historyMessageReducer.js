import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function historyMessageReducer(state = initialState.historyMessageState, action) {
  switch(action.type) {
    case(types.GET_HISTORY_SUCCESS):
      return {end: action.end, more: action.more};
    default:
      return state;
  }

}
