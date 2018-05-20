# API List

## LanguageApi
### changeLanguage(language)
*socket*
```
{
    type: "changeLanguage",
    language: ""
}
```

* param: language 一个字符串，代表所某种语言，例如中文的话，language='zh'
- 这个api应该给socket发送一个JSON{type: 'language', language: language}
- 服务器不返回消息

## UserApi
### signUp(userMessage)
    - param: userMessage {id:'', pwd: '', name: ''}
    - 返回一个Promise， resolve(userMessage.id) reject('用户名和密码不能为空')

### signIn(userMessage)
    - param: userMessage {id: '', pwd: ''}
    - 返回一个Promise resolve(user) reject('用户名或密码不正确')
    - 返回的user结构{id: '', name: '', friends: [{id:'', name:''}]}

## MessageApi
### sendMessage(message, read)
*socket*
```
{
    sender: userId1,
    receiver: userId2,
    content: '...'
}
```

### client receive message
```
{
    sender: id1,
    receiver: id2,
    content: '...',
    translated? '---'
}
```

### getHistoryMessage(user, friend, end)
*http*
* request /api/message/friend
    - friend:"" 当前正在聊天的好友ID
* response
    ```
        {
            messageList:[
                {
                    id: '',
                    content: '',
                    translated: '',
                    from: senderId,
                    to: receiverId
                }
            ]
        }
    ```
    - 返回一个Promise， resolve({history: [{from:'', to:'', content:''}], end:Number类型, friend:''})

# socket message
* 建立连接以后发送信息，确认身份
    ```js
    {
        type: 'init',
        email: userEmail
    }
    ```