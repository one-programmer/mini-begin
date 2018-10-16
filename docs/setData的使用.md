
# 更新data中对象下的数据
在小程序开发过程中, data的数据大概有如下几种情况，这里对应着 JS 中的基本类型和引用数据类型。

```javascript
data: {
    string: '',
    number: 1,
    boolean: true/false,
    array: [],
    object: {}
}
```
修改data中基本类型的值，直接赋值就可以

```javascript
this.setData({
    string: newString,
})
```

但是修改data中的值时对象或数组中的值的时候，直接修改对象下的值，或者全量更新

```javascript
this.setData({
    object[string]: newObjectString,
    object: newObject,
})
```