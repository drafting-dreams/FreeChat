import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case(types.SIGN_IN_SUCCESS):
      return Object.assign({}, action.message);

    case(types.UPDATE_FRIEND_LIST): {
      const friends = state.friends.slice();
      console.log('userReducer', action.updateFriend);
      let index = 0;
      const friend = friends.find((friend, i) => {
        index = i;
        return friend.id === action.updateFriend.updateFriendId
      });
      const newFriend = Object.assign({}, friend, {read: action.updateFriend.state});
      friends[index] = newFriend;
      return Object.assign({}, state, {friends: friends});
    }

    case(types.RECEIVE_FRIEND_STATE_SUCCESS):
      return Object.assign({}, state, {friends: action.friendState.friendState});

    case(types.EMPTY_MESSAGE_LIST):
      return {};

    default:
      return state;
  }
}
