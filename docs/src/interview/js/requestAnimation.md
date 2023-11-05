## requestAnimationFrame

requestAnimationFrame 可以通过 JS 控制动画，通过回调里面的操作来通知浏览器以该操作来重绘页面。

在反复调用该方法时，则会每帧执行一次回调函数，但帧这个东西时根据屏幕刷新率来定的，虽说在各种显示屏下触发的间隔可能不同，但是在同一屏幕刷新率下每次执行的间隔时间都是相同的。

定时器就不同了，可能会因为事件循环而产生时间间隔的误差（因为是红任务，红任务会在消息队列中排队到主线程处理，若到时间了但前面有任务没执行，就会产生误差），但`requestAnimationFrame`是异步任务，他可以保证反复执行时回调触发的间隔时间都是相同的。

基本用法:`requestAnimationFrame(callback)`,回调函数可以接受一个参数，这个参数代表了从页面加载完毕到执行该回调的时间，一般用来计算动画开始时间与动画执行的时间。

### 案例 1

```js
const keyframesFun = () => {
  let start;
  return function fun(timestamp) {
    // timestamp为程序开始，到执行回调函数的时间
    if (start === undefined) {
      // 获取开始时间
      start = timestamp;
    }
    // 计算当前执行了多少秒了
    const nowTime = timestamp - start;
    if (nowTime > 3000) {
      // 3秒后不执行动画
      return;
    }
    // 通过移动了多少毫秒来设置每帧移动的偏移量
    // 公式：
    // 0.1 * nowTime，多少秒移动多少偏移量，nowTime为当前动画执行的时间
    // Math.min(0.x * nowTime,最大移动的偏移量)，可以加大倍率，直到符合预期
    box3.style.transform = `translateX(${Math.min(0.2 * nowTime, 500)}px)`;
    window.requestAnimationFrame(fun);
  };
};

const onHandleClick = () => {
  window.requestAnimationFrame(keyframesFun());
};
```

### 案例 2：测试屏幕帧数

// 帧数为
1 秒可以显示多少张图片就多少帧
公式：1000/重绘时间间隔（ms）=多少张图片
多少时间间隔（timestamp - lasttime）可以显示一张图片

```js
function fun01() {
  let lasttime = null;
  return function fun(timestamp) {
    if (lasttime !== null) {
      console.log(Math.floor(timestamp - lasttime));
    }
    lasttime = timestamp;
    window.requestAnimationFrame(fun);
  };
}
window.requestAnimationFrame(fun01());
```

### 异步任务

结果：script--animation

```html
<script>
  requestAnimationFrame(() => {
    console.log("animation");
  });
  console.log("script");
</script>
```
