const md5 = require('md5');
const utf8 = require('utf8');

import axios from 'axios';

const appid = '20180430000151980';
const key = 'l11PpCYup7zK9XRcZmlO';
// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'


export default function translateApi(message, from , to) {
  const query = utf8.decode(utf8.encode(message));
  const salt = (new Date).getTime();
  const str1 = appid + query + salt + key;
  const sign = md5(str1);
  return new Promise((resolve => {
    axios({
      url:'http://api.fanyi.baidu.com/api/trans/vip/translate',
      type:'get',
      dataType: 'jsonp',
      params: {
        q: query,
        appid: appid,
        salt: salt,
        from: from,
        to: to,
        sign: sign
      }
    })
      .then(function (data) {
        resolve(data.data.trans_result[0].dst);
      })
      .catch((err) => {console.log("mother fuck", err);});
  }));

}
