import {receiveMessageSuccess, getHistorySuccess} from "../actions/messageActions";
import store from '../store/configureStore';
import $ from "jquery";

function rippleEffect(id) {

  const $that = $(document.getElementById(id));
  let posX = $that.offset().left,
    posY = $that.offset().top,
    buttonWidth = $that.width(),
    buttonHeight = $that.height();


  // Add the element
  $that.prepend("<span class='ripple'/>");


  // Make it round!
  if (buttonWidth >= buttonHeight) {
    buttonHeight = buttonWidth;
  } else {
    buttonWidth = buttonHeight;
  }

  // Get the center of the element
  const x = posX;
  const y = posY - buttonHeight;


  // Add the ripples CSS and start the animation
  $(".ripple").css({
    width: buttonWidth,
    height: buttonHeight,
    top: y + 'px',
    left: x + 'px'
  }).addClass("rippleEffect");
}

export default function handler(message) {
  switch (message.type) {
    case "messaging": {
      rippleEffect(message.sender);
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
