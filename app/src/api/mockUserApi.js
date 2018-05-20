import $ from './easyFetch';

const users = [
  {
    id: '1',
    name: 'drafting_dreams',
    pwd: '1',
    friends: ['2', '3', '4', '5', '6',]
  },
  {
    id: '2',
    name: '玲屋什造',
    pwd: '1',
    friends: ['1', '3']
  },
  {
    id: '3',
    name: '佐佐木绯世',
    pwd: '1',
    friends: ['1', '2']
  },
  {
    id: '4',
    name: '希尔瓦娜斯',
    pwd: '1',
    friends: ['1']
  },
  {
    id: '5',
    name: 'Mitsuha',
    pwd: '1',
    friends: ['1']
  },
  {
    id: '6',
    name: 'dog',
    pwd: '1',
    friends: ['1']
  }
];

export default {
  signIn(userMessage) {
    return $.post("/api/auth/login", userMessage);
  },

  signUp(userMessage) {
    return $.post("/api/auth/register", userMessage);
  },

  getUserInfo() {
    return $.get(("/api/auth/me"));
  }
}
