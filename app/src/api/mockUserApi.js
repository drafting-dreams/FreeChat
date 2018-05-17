import delay from './delay';
import socket from '../socket/socket';

const users = [
  {
    id: '1',
    name: 'drafting_dreams',
    pwd:'1',
    friends: ['2', '3', '4', '5', '6',]
  },
  {
    id: '2',
    name: '玲屋什造',
    pwd: '1',
    friends: ['1','3']
  },
  {
    id: '3',
    name: '佐佐木绯世',
    pwd: '1',
    friends: ['1','2']
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

export default class UserAPI {
  static signIn(userMessage) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let user = users.find(user => user.id === userMessage.id && user.pwd === userMessage.pwd);
        if(user) {
          const friendsWithName = user.friends.map(id => {
            const friend = users.find(user =>
              user.id === id
            );
            const {ID=id, name} = friend;
            return {id: ID, name: name};
          });
          user = {id: user.id, name: user.name, friends: friendsWithName};
          resolve(user);
        } else {
          reject("用户名或密码不正确");
        }
      }, delay);

    });

  }

  // static getUserById(id) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //
  //     }, delay);
  //   });
  // }
}
