## 2018/5/20
* in jest test, don't pass done to then() directly, instead do this
```js
func(()=>done())
```