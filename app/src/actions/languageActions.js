import * as types from '../constants/actionTypes';
import languageApi from '../api/languageApi';

export function switchLanguageSuccess(language) {
  return {type: types.SWITCH_LANGUAGE_SUCCESS, language}
}

export function switchLanguage(language) {
  return function (dispatch) {
    languageApi.changeLanguage(language).then(language => {
      dispatch(switchLanguageSuccess(language));
    }).catch(err => {
      throw err
    });
  };
}
