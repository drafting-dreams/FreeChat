import {receiveMessageSuccess, getHistorySuccess} from "../actions/messageActions";
import store from '../store/configureStore';

export default function handler(message) {
  switch (message.type) {
    case "messaging": {
      store.dispatch(dispatch => dispatch(receiveMessageSuccess(message)));
      break;
    }

    case "historyMessage": {
      store.dispatch(dispatch => dispatch(getHistorySuccess({
        friend: message.receiver, history: message.messages
      })));
    }

  }
}
