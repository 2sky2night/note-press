## 异步同步

同步：同步任务是只要发布了该任务，立马去执行。

​异步：异步任务是**指无法立即去执行的任务，不会阻塞后续任务的执行**，要满足一定条件才回去执行，例如网络请求完成后执行的操作，元素的事件监听处理函数，计时器、延时器...

为什么会有异步？因为让浏览器主线程遇到耗费时间任务(IO 操作，复杂运算)时一直等待他们完成再执行后续操作，就会导致后续代码被阻塞，~~浏览器卡死~~（**因为浏览器渲染主线程要渲染页面、执行 JS**），有了异步，浏览器渲染主线程才不会被阻塞。

## JS 线程会阻塞渲染进程

​ 为什么？因为 JS 线程和渲染线程是在一个进程中处理的（**必须等待上一个任务完成才能执行下一个任务**）。在执行回调时由于 JS 代码执行的是同步的，需要等待回调执行完成才能执行渲染任务（重排重绘）

### 案例 1

**你以为的**：按钮文本发生变化，卡三秒？

**实际结果**：三秒后，修改按钮的文本

这个结果恰恰就证明了 js 线程和渲染线程是互斥的，不可能两个任务并发的执行。

```html
<button>哈哈</button>
<script>
  const button = document.querySelector("button");
  function delay(delay) {
    const currentTime = Date.now();
    for (; Date.now() - currentTime < delay; ) {}
  }
  button.addEventListener("click", () => {
    button.innerText = "ha ha";
    delay(3000);
  });
</script>
```

### 案例 2

**你以为的**:按钮文本变成 ha ha，三秒后按钮文本变成 ke ke

**实际结果**:在三秒后，按钮文本变成 ke ke

这也就说明了在 js 线程未结束时，渲染进程是不会重新渲染页面的，只有 js 线程全部执行完成后，渲染进程才会根据渲染树渲染页面。

```html
<button>哈哈</button>
<script>
  const button = document.querySelector("button");
  function delay(delay) {
    const currentTime = Date.now();
    for (; Date.now() - currentTime < delay; ) {}
  }
  button.addEventListener("click", () => {
    button.innerText = "ha ha";
    delay(3000);
    button.innerText = "ke ke";
  });
</script>
```

## 异步的 API

1. setTimeout
2. setInterval
3. addEventListener
4. observer 系列
5. requestAnimation
6. queueMircoTask
7. Promise 系列
8. 异步函数 async
9. WebWorker
