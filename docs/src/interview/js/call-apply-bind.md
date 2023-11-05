---
title: "Call与Apply与Bind"
---

这三个方法都是修改函数执行时的 this 指向，call、apply 都是立即调用函数，而 bind 是创建一个 this 指向被修改了的函数。call、apply 的唯一区别就是传参方式不同而已。

### call

在调用 myCall 时，this 其实就是调用函数的那个对象，也就是目标函数。通过 this 指向始终都是最后调用该方法的那个对象的特性，给对象添加一个方法，最终调用该方法时 this 指向就是这个对象了。注意调用时不要把参数忘记了，用剩余参数来接受参数列表时获取到的是一个数组，在调用时通过展开运算符将其展开即可依次传入参数了，在调用函数后，通过 delete 删除改方法。

::: tip
在调用`myCall`时，是通过`fn.myCall`来调用的`myCall`方法，所以在`myCall`中的`this`指向`fn`。就是因为 `this` 始终指向最后调用该方法的那个对象。
:::

```js
// call fn.call(obj,arg1,args2....)
function myCall(obj, ...args) {
  obj[this.name] = this;
  obj[this.name](...args);
  delete obj[this.name];
}
```

### apply

apply 和 call 原理差不多，只不过在调用 apply 时传入的参数方式不同而已，第一个参数都是目标函数 this 指向的目标对象，apply 的第二个参数是一个数组，数组中就是调用函数的参数了。

```js
// apply  fn.apply(obj,[arg1,args2....])
function myApply(obj, args) {
  // args是一个数组
  obj[this.name] = this;
  obj[this.name](...args);
  delete obj[this.name];
}
```

### bind

bind 是返回一个 this 指向被修改了的函数，需要用到闭包来延长目标函数以及目标对象的生命周期。每次调用通过 bind 返回的回调函数时，都会临时去给对象添加方法并调用，最后删除这样的过程。

```js
// bind fn.bind(obj)
function myBind(obj) {
  // 回调函数调用时可以通过闭包，获取到对象本身和函数上下文
  // 这里需要通过content来保存myBind调用时的那个函数
  const content = this;
  return function (...args) {
    // 回调执行时，通过闭包获取content，也就调用mybind的那个函数
    // 将此函数挂载到对象自身上，并调用函数，此时的this始终为最后调用函数的对象
    obj[content.name] = content;
    obj[content.name](...args);
    delete obj[content.name];
  };
}
```

##
