import initialState from './initialState';
import * as types from '../constants/actionTypes';

const languageState = {language: initialState.language, languages: initialState.languages}
export default function messageReducer(state=languageState, action) {
  switch(action.type) {
    case(types.SWITCH_LANGUAGE_SUCCESS):
      return {language: action.language, languages: state.languages};
    default:
      return state;
  }
}
