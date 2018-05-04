//This action is for watching when to automatically scroll down the chat window.
import * as types from "../constants/actionTypes";

export function lenMessageList(newLength) {
  return {type: types.ADD_LENGTH, newLength}
}
