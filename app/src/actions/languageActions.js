import * as types from '../constants/actionTypes';

export function switchLanguageSuccess(language) {
  return {type: types.SWITCH_LANGUAGE_SUCCESS, language}
}

export function switchLanguage(language) {
  return (switchLanguageSuccess(language));
}
