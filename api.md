# API List

## LanguageApi
### changeLanguage(language)
    - param: language 一个字符串，代表所某种语言，例如中文的话，language='zh'
    - 这个api应该给socket发送一个JSON{type: 'language', language: language}
    - 返回一个Promise， resolve(language), reject(err).

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
    - param: message {sender:'1', receiver:'2', content:'你好'} sender与receiver都是他们的id，content为消息的内容
    - param: read bool (发送消息的对象是否在线？，在线为true)
    - side effect: 将本条消息存入数据库
    - 返回一个Promise, resolve(message) reject(err)

### getHistoryMessage(user, friend, end)
    - param: user:"" 当前用户的ID
    - param friend:"" 当前正在聊天的好友ID
    - end：Number类型 当前页面已经显示的消息队列中，最前面（最老的）一条消息在数据库中消息列表的index，如果是-1，说明现在没有显示消息
    - 返回一个Promise， resolve({history: [{from:'', to:'', content:''}], end:Number类型, friend:''})
    - 返回一个对象，history属性是历史消息队列，消息对象描述了从哪个id发到哪个id，内容是什么。end指的是这个历史消息的最前面一条在数据库中的index friend还是id
    - 没有历史消息请返回空队列, 并且end为0
    - 解释：这个方法要返回之前的20条（或者定一个你认为合理的条数）历史消息

### getRecentUnreadMessage(user, friend, end)
    - param: 参数描述请参考上一个方法
    - 返回结构仍然参考上一个方法
    - 解释：这个方法要返回之前的未读消息