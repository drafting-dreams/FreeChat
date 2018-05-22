import {receiveMessageSuccess} from "../actions/messageActions";
import store from '../store/configureStore';

export default function handler(message) {
  switch (message.type) {
    case "messaging": {
      store.dispatch(dispatch => dispatch(receiveMessageSuccess(message)));
      break;
    }
  }
}
