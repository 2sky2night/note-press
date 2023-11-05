## 手写专区

这里记录了一些内置 API 的实现方式。

### instanceof

```ts
function MyInstanceof(obj, constructor) {
  let flag = false;
  if (obj.__proto__ === constructor.prototype) {
    // 若当前对象隐式原型就是构造函数的显示原型时
    flag = true;
  } else if (obj.__proto__ !== null) {
    // 若当前对象还有隐式原型时
    flag = MyInstanceof(obj.__proto__, constructor);
  } else {
    // 对象的原型的原型为null
    return false;
  }
  return flag;
}

console.log(MyInstanceof([], Object));
```

### New

首先要明白 new 操作符做了那些事情: 1.创建一个对象 2.让该对象的隐式原型设置为函数的显示原型，实现继承，可以通过原型链访问基类的所有属性和方法 3.调用修改了 this 指向的构造函数，让实例初始化属性 4.返回这个对象

```ts
/**
 * @param {Function} cb
 * @param {any[]} args
 * */
function myNew(cb, ...args) {
  // 创建一个对象
  const obj = new Object();
  // 让该对象的隐式原型指向函数的显示原型，这样对象就能拥有原型链上的所有方法和属性（实现继承）
  obj.__proto__ = cb.prototype;
  // 调用构造函数，并是构造函数在指向时，其this指向当前的新对象
  cb.call(obj, ...args);
  // 返回该对象
  return obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

const p = myNew(Person, "Mark", 18);
console.log(p);
```

#### 注意

​ 若构造函数返回了一个对象，new 的返回值就是这个对象而不是新创建的对象。

```js
function Person(name) {
  this.name = name;
  return { name: "Mark" };
}

const p = new Person("John");

console.log(p); // {name:"Mark"}
```

### 深浅拷贝

​ 深浅拷贝主要区别就是有没有在堆区中开辟内存区域、相同的两个变量引用的同一个对象。

### 数组的方法

```ts
// forEach every some reduce map filter
// 遍历数组，调用回调
Array.prototype._forEach = function (cb) {
  for (let i = 0; i < this.length; i++) {
    cb(this[i], i, this);
  }
};
// 遍历数组，回调中某一次返回布尔值真结束循环（数组中是否有某个元素满足其条件）
Array.prototype._some = function (cb) {
  let flag = false;
  for (let i = 0; i < this.length; i++) {
    const _flag = cb(this[i], i, this);
    if (_flag) {
      flag = true;
      break;
    }
  }
  return flag;
};
// 遍历数组，回调都返回真返回真（数组中是否每个元素都满足了某种条件）
Array.prototype._every = function (cb) {
  let i = 0;
  for (; i < this.length; i++) {
    const flag = cb(this[i], i, this);
    if (!flag) {
      break;
    }
  }
  return i === this.length;
};
// 遍历数组，将满足条件的元素过滤出来成一个新数组
Array.prototype._filter = function (cb) {
  const arr = [];
  for (let i = 0; i < this.length; i++) {
    const flag = cb(this[i], i, this);
    if (flag) {
      arr.push(this[i]);
    }
  }
  return arr;
};
// 遍历数组，计算出一个结果
Array.prototype._reduce = function (cb, sum = 0) {
  for (let i = 0; i < this.length; i++) {
    const res = cb(sum, this[i], i, this);
    sum = res;
  }
  return sum;
};
// 遍历数组，返回一个新数组
Array.prototype._map = function (cb) {
  const arr = [];
  for (let index = 0; index < this.length; index++) {
    const res = cb(this[index], index, this);
    arr.push(res);
  }
  return arr;
};
```

### 消息订阅模式

```ts
/**
 * 非单例的PubSub
 */
export class Pubsub {
  private channels: {
    [propsName: string]: Function[];
  };
  constructor() {
    this.channels = {};
  }
  /**
   * 发布消息
   * @param token 消息id
   * @param args 消息发出时的参数
   */
  emit(token: string, ...args: any[]) {
    const channel = Reflect.get(this.channels, token);
    if (channel === undefined) {
      // 没有该频道，创建该频道
      this.channels[token] = [];
    } else {
      // 有该频道，通知所有订阅者
      channel.forEach((cb) => cb(...args));
    }
  }
  /**
   * 订阅频道
   * @param token 频道id
   * @param cb 频道更新后的回调
   */
  on(token: string, cb: Function) {
    const channel = Reflect.get(this.channels, token);
    if (channel === undefined) {
      // 无该频道 创建频道，并添加订阅者
      this.channels[token] = [cb];
    } else {
      // 保存订阅者的回调
      channel.push(cb);
    }
  }
  /**
   * 移除订阅
   * @param token 频道id
   * @param cb 回调
   */
  remove(token: string, cb: Function) {
    const channel = Reflect.get(this.channels, token);
    if (channel) {
      const index = channel.findIndex((ele) => ele === cb);
      channel.splice(index, 1);
    } else {
      throw new Error("无该频道:" + token);
    }
  }
  // 移除频道
  // 清空订阅者
}

export default new Pubsub();
```

### Promise.all

```ts
/**
 * @param {Promise[]} arr
 */
Promise._all = function (arr) {
  return new Promise((resolve, reject) => {
    const list = [];
    let count = 0;
    arr.forEach((p, index) => {
      p.then(
        (value) => {
          count++;
          list.push({ index, value });
          if (count === arr.length) {
            resolve(
              list
                // 保证结果和传入的结果顺序保持一致。
                .sort((a, b) => a.index - b.index)
                .map((data) => data.value)
            );
          }
        },
        (reason) => {
          reject(reason);
        }
      );
    });
  });
};
```

### Promise.race

```ts
/**
 * @param {Promise[]} arr
 */
Promise._race = function (arr) {
  return new Promise((resolve, reject) => {
    arr.some((p) => {
      p.then(
        (value) => {
          resolve(value);
        },
        (reason) => {
          reject(reason);
        }
      );
    });
  });
};
```

### Promise.allSettled

​ 传入一个 Promise 数组，返回一个 Promise 对象。当数组中所有 Promise 实例的状态都凝固（也就是都成了 fulfilled 或 rejected 状态）时，返回的 Promise 对象状态设置为 fulfilled，值为一个数组，数组每一项包含了 Promise 成功或失败、Promise 成功或失败的结果。

```js
/**
 * @param {Array<Promise<any>>} arr
 * @returns
 */
Promise._allSettled = function (arr) {
  return new Promise((resolve) => {
    const list = [];
    let count = 0;
    arr.forEach((p, index) => {
      p.then(
        (value) => {
          count++;
          // 保存结果
          list.push({ result: value, index, status: "fulfilled" });
          if (count === arr.length) {
            // 若全部都完成了
            resolve(
              list
                .sort((a, b) => a.index - b.index)
                // 保证顺序和数组顺序一致，不能因为谁先结束谁就在前
                .map((data) => ({ result: data.result, status: data.status }))
            );
          }
        },
        (error) => {
          count++;
          // 保存结果
          list.push({ result: error, index, status: "rejected" });
          if (count === arr.length) {
            // 若全部都完成了
            resolve(
              list
                .sort((a, b) => a.index - b.index)
                .map((data) => ({ result: data.result, status: data.status }))
            );
          }
        }
      );
    });
  });
};
```

### Promise

Promise 是用来处理异步回调地狱的解决方案，他可以通过链式调用来轻松解决因多次异步结果依赖导致的回调地狱问题。

#### 状态、阶段

Promise 有两个阶段，三种状态：

1.当**未确定结果**阶段，promise 实例其初始状态为`pending`状态。

2.当**确定结果**阶段，promise 实例有`fulfilled`状态或`rejected`状态。

#### 构造函数

Promise 的构造函数允许传递一个函数（成为`executor`），函数会在 Promise 的构造函数中执行。此函数可以接收两个参数`resovle`和`reject`这两个参数是一个函数，`promise`实例的状态就是通过这两个函数来设置的。

**resolve**:调用`resolve`可以将`promise`的状态设置为`fulfilled`，并且可以传递一个实参，为此次`promise`履行设置一个结果`value`。

**reject**：调用`reject`可以将`promise`的状态设置为`rejected`，并且可以传递一个实参，为此次`promise`拒绝设置一个原因`reason`。

**状态凝固**：当 promise 实例只要被改变了一次状态就不会被再次修改，保证了 value 和 reason 的值。

**executor**：会在构造函数中执行，当 executor 调用时内部出错，需要执行 reject 方法，让 Promise 实例设置为 rejected，并设置出错的原因。

#### promise.then

![then需要实现的功能](/imgs/02.png)

`promise.then(onFulfilled,onRejected)`

then 方法接受两个参数`onFulfilled`,`onRejected`，指当实例履行时执行`onFulfilled`回调，当实例拒绝是执行`onRejected`回调。

##### 1.参数检查

当这两个参数不是函数时，需要将其处理成一个默认函数，调用时获取本次 promise`value`或`reason`的值。这些默认函数将来会合适时候调用。

```js
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  // 如果onFulfilled不是函数，给一个默认函数，返回value
  var realOnFulfilled = onFulfilled;
  if (typeof realOnFulfilled !== "function") {
    realOnFulfilled = function (value) {
      return value;
    };
  }

  // 如果onRejected不是函数，给一个默认函数，返回reason的Error
  var realOnRejected = onRejected;
  if (typeof realOnRejected !== "function") {
    realOnRejected = function (reason) {
      throw reason;
    };
  }
};
```

##### 2.（函数参数）参数的返回值

###### `onFulfilled`函数的返回值

1.若返回非 Promise 值，且 Promise 实例状态为`fulfilled`时，则`then函数`会返回一个新的 Promise 且新 Promise 的状态为履行，其 value 为`onFulfilled`的返回值。

2.若返回一个 Promise 值，则`then函数`会返回一个 promise 实例，其状态和结果根据`onFulfilled`或`onRejected`决定。

###### `onRejected`函数的返回值

1.若返回非 Promise 值时，且 Promise 实例状态为`rejected`时，则`then函数`会返回一个新的 Promise 且新 Promise 的状态为履行，其 value 为`onRejected`的返回值。

2.若返回一个 Promise 值，则`then函数`会返回一个 promise 实例，其状态和结果根据`onFulfilled`或`onRejected`决定。

##### 3.onFulfilled 与 onRejected 执行时机

​ 通过 then 方法我们可以告诉 Promise 实例在`fulfuilled`或`rejected`状态时执行相应的函数。

​ 但我们需要在什么时候调用这些函数呢？换个思路想，Promise 在什么时候会被设置状态呢？其实就是在`executor`中执行`resolve`、`reject`函数，所以我们可以将`onFulfilled`、`onRejected`函数保存在实例中，在调用`resolve`、`reject`时不仅要设置状态还要执行对应状态的函数。

​ 这种将回调保存起来，在满足条件时执行就是订阅发布模式。

##### 4.then 的返回值，链式调用

​ then 的返回值是一个 Promise 实例，其状态和结果是根据当前 Promise 实例的状态和结果来定的。简单来说若两个参数都不返回 Promise 对象，则 then 函数返回一个 Promise 状态为 fulfilled 的实例，value 或 reason 为对应参数的返回值。

###### 4.1 当`onFulfilled`和`onRejected`返回非 Promise 值

若 Promise 实例为`fulfilled`，执行`onFulfilled`，则返回的 Promise 实例也为`fulfilled`，value 为`onFulfilled`的返回值。

若 Promise 实例为`rejected`，执行`onRejected`，则返回的 Promise 实例为`fulfilled`，value 为`onRejected`的返回值。

注意需要捕获`onFulfilled`执行抛出的异常，若有异常需要执行 reject，将返回的 Promise 设置为`rejected`

伪代码(**代码暂不考虑异步**)

```js
then(onFulfilled,onRejected){
    // 省略....
    const p =  new Promise((resolve,reject)=>{
        try{
          // 需要捕获回调中的错误，设置p的状态和结果
          const result = onFulfilled(this.value)
		      resolve(result)
        }catch(error){
          reject(error)
	    }
    })
    return p
}
```

###### 4.2 当`onFulfilled`和`onRejected`返回 Promise 值

​ 则 then 的返回一个 promise 实例，其状态和结果根据`onFulfilled`或`onRejected`决定。

伪代码(**代码暂不考虑异步**)

:::tip

下面的代码非常关键，是`onFulfilled`函数返回 Promise 实例（称为 A）处理的关键，若想要 then 方法返回的 Promise(称为 B)的状态可以跟随`onFulfilled`返回的 Promise 状态、结果保持一致就需要通过 A 实例.then 方法监听其何时状态凝固，在`fulfill`时调用 resolve，在`rejected`时调用 rejected，这样就能获取 A 实例的状态、结果来处理 B 实例的状态、结果了。

:::

```js
then(onFulfilled,onRejected){
    // 省略....
    const p =  new Promise((resolve,reject)=>{
   		try{
            const result = onFulfilled(this.value)
            if(result instanceof Promise){
                // 若函数返回结果是一个新的Promise
                // 当新Promise有结果时，去设置p的状态和结果
                result.then(
                    (r)=>resolve(r),
                    (e)=>rejecte(e)
                )
            }else{
                // 返回的是一个非Promise值，让p的状态设置为fulfilled，结果为返回值
                resolve(result)
            }
        }catch(error){
            reject(error)
        }

    })
    return p
}
```

###### 4.3 解决重复引用

​ then 方法中的回调函数中返回的 promise 不能是 then 方法的返回值。**注意需要让代码异步执行否则同步执行时构造函数里获取不到 p 导致出错**。使用 queueMicrotask 来创建一个微任务，这样就能确保在读取 p 时，p 已经被初始化了。

伪代码（**不考虑异步**）

```js
then(onFulfilled,onRejected){
    // 省略....
    const p =  new Promise((resolve,reject)=>{
        queueMicrotask(()=>{
          try{
            const result = onFulfilled(this.value)
                if(result instanceof Promise){
                    if(result===p){
                        // 抛出去的错误会被trycatch捕获，从而将then返回的p设置为rejected，reason为错误信息。
                        throw new Error('重复引用Promise!')
                    }
                    // 若函数返回结果是一个新的Promise
                    // 当新Promise有结果时，去设置p的状态和结果
                    result.then(
                        (r)=>resolve(r),
                        (e)=>rejecte(e)
                    )
                }else{
                    // 返回的是一个非Promise值，让p的状态设置为fulfilled，结果为返回值
                    resolve(result)
                }
            }catch(error){
                reject(error)
            }
        })

    })
    return p
}
```

##### 5.then 中的异常

​ 在 then 中抛出的异常或暴露的错误应该让下一个 then 的`onRejected`捕获执行。

```js
Promise.resolve()
  .then(() => {
    throw "error";
  })
  .then(
    () => {},
    (reason) => {
      console.log(reason); //error
    }
  );
```

##### 6.抽离逻辑

将 then 中的大部分逻辑抽离出来。要注意一定要在微任务中执行，否则获取不到 p 导致运行出错

```js
  /**
   * 抽离Promise.then中的逻辑
   * @param {*} value 履行或拒绝的结果
   * @param {*} p 即将返回的Promise实例
   * @param {*} cb 要执行的onFulfilled或onRejected回调
   * @param {*} resolve 履行
   * @param {*} reject 拒绝
   */
  resolvePromise(value, p, cb, resolve, reject) {
    try {
      const result = cb(value)
      if (result instanceof MyPromise) {
        // 返回的Promise
        if (result === p) {
          // 返回的Promise为then返回值的Promise
          throw new TypeError('Promise重复引用!')
        }
        // 监听返回的Promise值是什么状态从而设置p的状态和结果
        result.then(
          (v) => resolve(v),
          (e) => reject(e)
        )
      } else {
        // 返回非Promise
        resolve(value)
      }
    } catch (error) {
      // 出错，设置为fulfilled
      reject(error)
    }
  }
```

##### 7.异步处理

​ 前面的代码仅仅只是做了同步处理，当 then 方法执行时，状态未凝固是（异步操作）的时候，不能在调用 then 的时候直接处理`onFulfilled`或`onRejected`，需要在当前 Promise 实例有结果时才能进行处理。

::: tip
Promise 啥时候有结果？也就是当 executor 中执行了 resolve 或 reject 函数时，Promise 才会有结果，有结果时回去调用对应状态回调函数数组，所以当处理异步结果时，只需要构造对应状态的处理函数，保存在回调函数数组中即可。
:::

​ 这种方式能够很好的支持异步的链式调用，当前一个 promise 有了结果后才会调用下一个 promise.then 中的回调，后面依赖前面，导致必须前面的 promise 有了结果才会执行后续 then 中的回调。

​ 同时为了支持链式调用、结果暴露、解决重复引用、微任务调用，所以使用封装好的 resolvePromise 来操作。

```js
if (this.status === MyPromise.PENDING) {
  // 异步
  // 将onfulfilled函数保存在履行的回调中
  this.onFulfuilledCallbacks.push(() => {
    // 该函数是在promise.resolve时才会调用
    this.runAsyncCb(() => {
      try {
        this.resolvePromise(this.value, p, _onFulfilled, resolve, reject);
      } catch (error) {
        reject(error);
      }
    });
  });
  // 将onrejected函数保存在拒绝的回调中
  this.onRejectedCallbacks.push(() => {
    // 该函数是在promise.reject时才会调用
    this.runAsyncCb(() => {
      try {
        this.resolvePromise(this.reason, p, _onRejected, resolve, reject);
      } catch (error) {
        reject(error);
      }
    });
  });
}
```

#### v 0.1

​ 实现 Promise 的状态系统

```js
class MyPromise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";

  /**
   * Promise
   * @param {import('./index').Executor} executor
   */
  constructor(executor) {
    // 失败的初始值
    this.reason = null;
    // 成功的初始值
    this.value = null;
    // promise的状态
    this.status = MyPromise.PENDING;
    try {
      // 执行传入的回调
      // 并将设置实例状态的方法传入进回调
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      // 若回调内部出错，则设置状态为拒绝
      this.reject(error);
    }
  }
  /**
   * 若Promise实例的状态为pending则
   * 将Promise实例的状态设置为成功
   * 并保存履行的值
   * @param {any} value
   * @example promise.resolve(1)
   */
  resolve(value) {
    if (this.status === MyPromise.PENDING) {
      this.value = value;
      this.status = MyPromise.FULFILLED;
    }
  }
  /**
   * 若Promise实例状态为pending则
   * 将Promise实例状态设置为rejected
   * 并获取拒绝的原因
   * @param {any} reason
   */
  reject(reason) {
    if (this.status === MyPromise.PENDING) {
      this.reason = reason;
      this.status = MyPromise.REJECTED;
    }
  }
}
```

#### v 0.2

实现了 Promise.then 方法，可以在成功和失败的时候执行相应的回调，但未实现链式调用。

```js
class MyPromise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";

  /**
   * Promise
   * @param {import('./index').Executor} executor
   */
  constructor(executor) {
    // 失败的初始值
    this.reason = null;
    // 成功的初始值
    this.value = null;
    // promise的状态
    this.status = MyPromise.PENDING;
    // 履行的回调们
    this.onFulfuilledCallbacks = [];
    // 拒绝的回调们
    this.onRejectedCallbacks = [];
    try {
      // 执行传入的回调
      // 并将设置实例状态的方法传入进回调
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      // 若回调内部出错，则设置状态为拒绝
      this.reject(error);
    }
  }
  /**
   * 若Promise实例的状态为pending则
   * 将Promise实例的状态设置为成功
   * 并保存履行的值
   * 执行履行的回调们
   * @param {any} value
   * @example promise.resolve(1)
   */
  resolve(value) {
    if (this.status === MyPromise.PENDING) {
      // 保证状态凝固
      this.value = value;
      this.status = MyPromise.FULFILLED;
      this.onFulfuilledCallbacks.forEach((cb) => {
        cb(this.value);
      });
    }
  }
  /**
   * 若Promise实例状态为pending则
   * 将Promise实例状态设置为rejected
   * 并获取拒绝的原因
   * 执行拒绝的回调们
   * @param {any} reason
   */
  reject(reason) {
    if (this.status === MyPromise.PENDING) {
      // 保证状态凝固
      this.reason = reason;
      this.status = MyPromise.REJECTED;
      this.onRejectedCallbacks.forEach((cb) => {
        cb(this.resolve);
      });
    }
  }
  /**
   * promise.then
   * @param {import('./index').OnFulfilled} onFulfilled
   * @param {import('./index').OnRejected} onRejected
   */
  then(onFulfilled, onRejected) {
    let _onFulfiled = onFulfilled;
    let _onRejected = onRejected;
    // 参数检查，若不是函数，则将onFulfilled、onRejected设置为默认函数
    // 默认函数都是返回一个value或reason
    if (typeof _onFulfiled !== "function") {
      _onFulfiled = function (value) {
        return value;
      };
    }
    if (typeof _onRejected !== "function") {
      _onRejected = function (reason) {
        throw reason;
      };
    }
    // 将onfulfilled函数保存在履行的回调中
    this.onFulfuilledCallbacks.push(_onFulfiled);
    // 将onrejected函数保存在拒绝的回调中
    this.onRejectedCallbacks.push(_onRejected);
  }
}
```

v 0.3

​ 实现 Promise.then 的同步链式调用。

```js
class MyPromise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";

  /**
   * Promise
   * @param {import('./index').Executor} executor
   */
  constructor(executor) {
    // 失败的初始值
    this.reason = null;
    // 成功的初始值
    this.value = null;
    // promise的状态
    this.status = MyPromise.PENDING;
    // 履行的回调们
    this.onFulfuilledCallbacks = [];
    // 拒绝的回调们
    this.onRejectedCallbacks = [];
    try {
      // 执行传入的回调
      // 并将设置实例状态的方法传入进回调
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      // 若回调内部出错，则设置状态为拒绝
      this.reject(error);
    }
  }
  /**
   * 若Promise实例的状态为pending则
   * 将Promise实例的状态设置为成功
   * 并保存履行的值
   * 执行履行的回调们
   * @param {any} value
   * @example promise.resolve(1)
   */
  resolve(value) {
    if (this.status === MyPromise.PENDING) {
      // 保证状态凝固
      this.value = value;
      this.status = MyPromise.FULFILLED;
      this.onFulfuilledCallbacks.forEach((cb) => {
        this.runAsyncCb(() => {
          cb(this.value);
        });
      });
    }
  }
  /**
   * 若Promise实例状态为pending则
   * 将Promise实例状态设置为rejected
   * 并获取拒绝的原因
   * 执行拒绝的回调们
   * @param {any} reason
   */
  reject(reason) {
    if (this.status === MyPromise.PENDING) {
      // 保证状态凝固
      this.reason = reason;
      this.status = MyPromise.REJECTED;
      this.onRejectedCallbacks.forEach((cb) => {
        this.runAsyncCb(() => {
          cb(this.reason);
        });
      });
    }
  }
  /**
   * promise.then
   * 1.同步处理
   *  当调用then时，Promise已经进入结果阶段了，可以根据状态直接执行相应回调。
   * 2.异步处理
   * 3.链式调用，返回Promise
   *  3.1 回调返回非Promise
   *  3.2 回调返回Promise
   *    3.2.1 处理一般情况
   *    3.2.2 处理重复引用
   * @param {import('./index').OnFulfilled} onFulfilled
   * @param {import('./index').OnRejected} onRejected
   */
  then(onFulfilled, onRejected) {
    let _onFulfiled = onFulfilled;
    let _onRejected = onRejected;
    // 参数检查，若不是函数，则将onFulfilled、onRejected设置为默认函数
    // 默认函数都是返回一个value或reason
    if (typeof _onFulfiled !== "function") {
      _onFulfiled = function (value) {
        return value;
      };
    }
    if (typeof _onRejected !== "function") {
      _onRejected = function (reason) {
        throw reason;
      };
    }
    // 链式调用
    const p = new MyPromise((resolve, reject) => {
      // 为什么要将调用等其他逻辑放在里面新promise的executor里，
      // 就是为了保证在调用onFulfilled或onRejected后
      // 可以根据异常来调用resolve，reject并设置新Promise的状态和结果
      if (this.status === MyPromise.PENDING) {
        // 异步
        // 将onfulfilled函数保存在履行的回调中
        this.onFulfuilledCallbacks.push(_onFulfiled);
        // 将onrejected函数保存在拒绝的回调中
        this.onRejectedCallbacks.push(_onRejected);
      } else if (this.status === MyPromise.FULFILLED) {
        // 同步-履行
        this.runAsyncCb(() => {
          // 异步任务，为了能读取p
          this.resolvePromise(this.value, p, onFulfilled, resolve, reject);
        });
      } else if (this.status === MyPromise.REJECTED) {
        // 同步-失败
        this.runAsyncCb(() => {
          // 异步任务，为了读取p
          this.resolvePromise(this.reason, p, onRejected, resolve, reject);
        });
      }
    });
    return p;
  }
  /**
   * 抽离Promise.then中的逻辑
   * @param {*} value 履行或拒绝的结果
   * @param {*} p 即将返回的Promise实例
   * @param {*} cb 要执行的onFulfilled或onRejected回调
   * @param {*} resolve 履行
   * @param {*} reject 拒绝
   */
  resolvePromise(value, p, cb, resolve, reject) {
    try {
      const result = cb(value);
      if (result instanceof MyPromise) {
        // 返回的Promise
        if (result === p) {
          // 返回的Promise为then返回值的Promise
          throw new TypeError("Promise重复引用!");
        }
        // 监听返回的Promise值是什么状态从而设置p的状态和结果
        result.then(
          (v) => resolve(v),
          (e) => reject(e)
        );
      } else {
        // 返回非Promise
        resolve(value);
      }
    } catch (error) {
      // 出错，设置为fulfilled
      reject(error);
    }
  }
  /**
   * 创建微任务
   * @param {*} cb
   */
  runAsyncCb(cb) {
    queueMicrotask(cb);
  }
}
```

#### v 0.3

​ 实现了 then 的异步处理

```js
class MyPromise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";

  /**
   * Promise
   * @param {import('./index').Executor} executor
   */
  constructor(executor) {
    // 失败的初始值
    this.reason = null;
    // 成功的初始值
    this.value = null;
    // promise的状态
    this.status = MyPromise.PENDING;
    // 履行的回调们
    this.onFulfuilledCallbacks = [];
    // 拒绝的回调们
    this.onRejectedCallbacks = [];
    try {
      // 执行传入的回调
      // 并将设置实例状态的方法传入进回调
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      // 若回调内部出错，则设置状态为拒绝
      this.reject(error);
    }
  }
  /**
   * 若Promise实例的状态为pending则
   * 将Promise实例的状态设置为成功
   * 并保存履行的值
   * 执行履行的回调们
   * @param {any} value
   * @example promise.resolve(1)
   */
  resolve(value) {
    if (this.status === MyPromise.PENDING) {
      // 保证状态凝固
      this.value = value;
      this.status = MyPromise.FULFILLED;
      this.onFulfuilledCallbacks.forEach((cb) => {
        cb();
      });
    }
  }
  /**
   * 若Promise实例状态为pending则
   * 将Promise实例状态设置为rejected
   * 并获取拒绝的原因
   * 执行拒绝的回调们
   * @param {any} reason
   */
  reject(reason) {
    if (this.status === MyPromise.PENDING) {
      // 保证状态凝固
      this.reason = reason;
      this.status = MyPromise.REJECTED;
      this.onRejectedCallbacks.forEach((cb) => {
        cb();
      });
    }
  }
  /**
   * promise.then
   * 1.同步处理
   *  当调用then时，Promise已经进入结果阶段了，可以根据状态直接执行相应回调。
   * 2.异步处理
   * 3.链式调用，返回Promise
   *  3.1 回调返回非Promise
   *  3.2 回调返回Promise
   *    3.2.1 处理一般情况
   *    3.2.2 处理重复引用
   * @param {import('./index').OnFulfilled} onFulfilled
   * @param {import('./index').OnRejected} onRejected
   */
  then(onFulfilled, onRejected) {
    let _onFulfilled = onFulfilled;
    let _onRejected = onRejected;
    // 参数检查，若不是函数，则将onFulfilled、onRejected设置为默认函数
    // 默认函数都是返回一个value或reason
    if (typeof _onFulfilled !== "function") {
      _onFulfilled = function (value) {
        return value;
      };
    }
    if (typeof _onRejected !== "function") {
      _onRejected = function (reason) {
        throw reason;
      };
    }
    // 链式调用
    const p = new MyPromise((resolve, reject) => {
      // 为什么要将调用等其他逻辑放在里面新promise的executor里，
      // 就是为了保证在调用onFulfilled或onRejected后
      // 可以根据异常来调用resolve，reject并设置新Promise的状态和结果
      if (this.status === MyPromise.PENDING) {
        // 异步
        // 将onfulfilled函数保存在履行的回调中
        this.onFulfuilledCallbacks.push(() => {
          // 该函数是在promise.resolve时才会调用
          this.runAsyncCb(() => {
            try {
              this.resolvePromise(this.value, p, _onFulfilled, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        // 将onrejected函数保存在拒绝的回调中
        this.onRejectedCallbacks.push(() => {
          // 该函数是在promise.reject时才会调用
          this.runAsyncCb(() => {
            try {
              this.resolvePromise(this.reason, p, _onRejected, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      } else if (this.status === MyPromise.FULFILLED) {
        // 同步-履行
        this.runAsyncCb(() => {
          // 异步任务，为了能读取p
          this.resolvePromise(this.value, p, _onFulfilled, resolve, reject);
        });
      } else if (this.status === MyPromise.REJECTED) {
        // 同步-拒绝
        this.runAsyncCb(() => {
          // 异步任务，为了读取p
          this.resolvePromise(this.reason, p, onRejected, resolve, reject);
        });
      }
    });
    return p;
  }
  /**
   * 抽离Promise.then中的逻辑
   * @param {*} value 履行或拒绝的结果
   * @param {*} p 即将返回的Promise实例
   * @param {*} cb 要执行的onFulfilled或onRejected回调
   * @param {*} resolve 履行
   * @param {*} reject 拒绝
   */
  resolvePromise(value, p, cb, resolve, reject) {
    try {
      const result = cb(value);
      if (result instanceof MyPromise) {
        // 返回的Promise
        if (result === p) {
          // 返回的Promise为then返回值的Promise
          throw new TypeError("Promise重复引用!");
        }
        // 监听返回的Promise值是什么状态从而设置p的状态和结果
        result.then(
          (v) => resolve(v),
          (e) => reject(e)
        );
      } else {
        // 返回非Promise
        resolve(value);
      }
    } catch (error) {
      // 出错，设置为fulfilled
      reject(error);
    }
  }
  /**
   * 创建微任务
   * @param {*} cb
   */
  runAsyncCb(cb) {
    queueMicrotask(cb);
  }
}
```

### 防抖动

​ 单位时间内事件触发会被重置，避免事件被触发多次。将多次执行的操作合并为最后一次执行的操作。

```js
function debounce(cb, delay = 500, context = this) {
  let timer = null;
  return function (...args) {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      cb.apply(context, args);
      timer = null;
    }, delay);
  };
}
```

### 节流

​ 单位时间内只能执行一次操作。

```js
/**
 * 节流
 * @param {Function} cb
 * @param {number} delay
 * @param {any} context
 * @returns
 */
function throttle(cb, delay = 500, context = this) {
  let time = null;
  return function (...args) {
    if (time !== null) return;
    time = setTimeout(() => {
      time = null;
    }, delay);
    cb.apply(context, args);
  };
}
```
