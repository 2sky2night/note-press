## Web Worker

`Web Worker`是浏览器独有的 API，可以为`javascript`创建多个线程。只允许主线程创建`Web Worker`，可以让`Web Worker`执行一些后台任务。可以通过`Web Worker`创建子线程执行一些操作，例如耗费大量时间的同步操作（但不会阻塞主线程运行）、发送网络请求....有了`Web Worker`可以避免 js 的执行导致阻塞主线程渲染的问题。

​ 由于创建了多个线程，为了不影响主线程，所以`Web Worker`有以下限制：

（1）**同源限制**

​ 分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。

（2）**DOM 限制**

​ Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用`document`、`window`、`parent`这些对象。但是，Worker 线程可以`navigator`对象和`location`对象。

（3）**通信联系**

​ **Worker 线程**和**主线程**不在同一个上下文环境，它们不能直接通信，必须通过消息完成主线程和子线程的通信。

（4）**脚本限制**

​ Worker 线程不能执行`alert()`方法和`confirm()`方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。

（5）**文件限制**

​ Worker 线程无法读取本地文件，即不能打开本机的文件系统（`file://`），它所加载的脚本，必须来自网络。

### 1.主线程

​ 主线程通过`new Worker`来创建一个子线程，`Worker`构造函数必须是 HTTP 协议，必须加载网络脚本资源。返回一个 worker 实例，可以和对应子线程通信。

```js
new Worker("/index.js"); // 发送请求加载外部脚本资源，并将该资源放在子线程中执行
```

​ **通信**：

1.主线程通过`worker.postMessage`向对应的子线程发送消息

2.主线程通过`worker`的`message`监听子线程发送的消息

3.主线程通过`worker.terminate`结束子线程。

```js
const wb = new Worker("index.js");
// 接受子线程消息
wb.onmessage = (data) => {
  console.log("接受子线程消息:" + data.data);
  console.log(window.a);
};
setTimeout(() => {
  // 向对应子线程发送消息
  wb.postMessage("hello~");
}, 1000);
```

### 2.子线程

​ 子线程里失去了很多 API，不过浏览器也为子线程提供了内置 API。在子线程中是不能操作 DOM，并且子线程和主线程的执行上下文是不同的，所以不能共享声明的变量、函数等。

​ **通信**:

1.子线程通过`this.postMessage`与发送消息给主线程

2.子线程通过`this.addEventListen("message")`来监听主线程发送的消息。

3.子线程通过`this.close`关闭线程，释放内存

```js
this.addEventListener("message", (data) => {
  console.log("接受到主线程消息:" + data.data);
});

this.postMessage("子线程消息~~");
```

### 3.使用 Web Worker 的示例

​ 同步计算复杂数据时，会阻塞浏览器渲染线程，从而导致页面**卡死**。若我们使用`Web Worker`就不会产生这样的后果。

​ 1.不使用 Web Worker（Sync）

```html
<button>执行一段长时间阻塞主线程的代码</button>
<input />
<script>
  const btn = document.querySelector("button");

  function fun(time) {
    const now = Date.now();
    while (Date.now() - now <= time) {}
  }

  btn.onclick = () => {
    // 渲染进程卡死
    fun(2000);
  };
</script>
```

​ 2.使用 Web Worker

​ 主线程代码：

```js
function webworker() {
  // 执行复杂的同步任务
  const worker = new Worker("01.js");
  worker.onmessage = (e) => {
    console.log(e.data);
    worker.terminate();
  };
}
```

​ 子线程代码：

```js
console.log("Work Load!");

fun(2000);
this.postMessage("计算完成~");
this.close();
function fun(time) {
  const now = Date.now();
  while (Date.now() - now <= time) {}
}
```
