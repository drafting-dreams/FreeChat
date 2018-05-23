## 2018/5/20
* in jest test, don't pass done to then() directly, instead do this
```js
func(()=>done())
```

## 2018/5/21
* chrome won't set cookie for url with port,check [this](https://stackoverflow.com/questions/46288437/set-cookie-header-has-no-effect)