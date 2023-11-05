## 元素在视口的可见性

在日常开发中，常常会有对元素是否出现在视口从而执行相关操作的需求，以下记录了一些解决方案。

## offset 组合

这种方式只适用于元素没有被定位的情况下,都是通过元素或视口在文档的位置来判断是否进入视口了。

Y 轴:offsetTop+html.scrollTop+window.innerHeight
X 轴:offsetLeft+html.scrollLeft+window.innerWidth

#### Y 轴

**y 轴底部可见性**
offsetTop<=window.innerHeight+html.scrollTop 若元素距离文档顶部<=文档卷上去+视口高度

**y 轴顶部可见性**
:::tip
顶部可见性是这样判定的，若元素的底部出现在视口顶部，则说明进入视口了，而 offsetTop 是元素顶部距离文档左上角的偏移量所以是需要+元素自身的高度。
:::
offsetTop+clientHeight>=html.scrollTop 若元素距离文档顶部+自身高度>=文档卷上去的高度
两者同时成立，说明 y 轴可见

#### X 轴

**x 轴右侧可见性**
offsetLeft<=window.innerWidth+html.scrollLeft 若元素距离文档左侧<=视口宽度+文档卷过去的距离

**x 轴左侧可见性**
offsetLeft+clientWidth>=html.scrollLeft 若元素距离文档左侧+自身宽度>=文档卷过去的距离
同时成立，说明可见

## getBoundingClientRect

通过 getBoundingClientRect 可以获取元素基于视口左上角的坐标等相关信息。可以非常方便获取元素基于视口左上角的偏移量。

这种方式需要通过事件监听+getBoundingClientRect，性能消耗要大一些（getBoundingClientRect 会导致页面重排），但兼容性好，该方法的返回值有：

1. y/top：元素左上角距离视口顶部的距离
2. x/left：元素左上角距离视口最左侧的距离
3. bottom:元素底部距离视口顶部的距离
4. right：元素最右侧距离视口最左侧的距离
5. width、height：元素内容区

```ts
import { ref } from "vue";

export default function (ele: HTMLElement, cb: Function) {
  const isInner = ref(false);

  /**
   * y轴上边完全不可见，通过bottom<=0
   * y轴底部完全不可见，通过top===window.innerHeight
   */
  /**
   * x轴左边完全不可见,right<=0
   * x轴右边完全不可见left>=window.innerWidth
   */

  const onHandleScroll = () => {
    const data = ele.getBoundingClientRect();
    // y
    if (data.bottom <= 0 || data.top >= window.innerHeight) {
      // 顶部完全不可见 和 底部不可见
      isInner.value = false;
      cb(isInner.value);
      return;
    }
    // x
    if (data.left >= window.innerWidth || data.right <= 0) {
      // 右侧完全不可见 和 左侧不可见
      isInner.value = false;
      cb(isInner.value);
      return;
    }
    isInner.value = true;
    cb(isInner.value);
  };

  const start = () => {
    onHandleScroll();
    window.addEventListener("scroll", onHandleScroll);
    window.addEventListener("resize", onHandleScroll);
  };
  const stop = () => {
    window.removeEventListener("scroll", onHandleScroll);
    window.removeEventListener("resize", onHandleScroll);
  };
  start();
  return {
    start,
    stop,
    isInner,
  };
}
```

## IntersectionObserver

通过判断目标元素与容器(元素与容器在面积上是否产生交集，容器可以是窗口也可以是元素)是否产生交集，来确定元素是否显示在窗口中，当产生了交集，说明出现在窗口中了。

这种方式性能消耗最小，但兼容性不好？

### 基本使用

IntersectionObserver，传递一个回调函数，回调函数会在目标元素与容器发生交集时会触发（回调的触发是异步的）

```js
const observer = new IntersectionObserver(cb, [option]);
```

构造函数的第一个参数是一个回调，回调可以接受两个参数，一个是 entries 记录了目标元素们与容器之间交集的信息，第二个是 observer 实例，entries 中的每一项是一个对象，**entry.isIntersecting**记录了两个元素是否产生了交集。

构造函数的第二个参数是一个配置对象，有这些属性：

1. `root` --- 指定**容器**。用于检查目标的可见性。默认为浏览器视口。如果指定为 null，也为浏览器视口。在指定 root 时，必须是目标元素的父级元素。
2. `rootMargin` --- **容器**的扩缩边距。其传值形式与 CSS 中 margin 一样，用于控制容器每一边的扩缩(单位为 px 或%)，从而控制计算**容器**和目标元素的交集的区域范围，默认值为 0，这个属性可以让**容器**在判断交集时范围变大，这样就能提前与目标元素产生交集（**例如距离多少像素就触发回调**）
3. `threshold` --- 阈值，回调函数触发的条件。取值范围为 0.0-1.0，默认值为 0.0。当传入数值类型时，在相交时只会触发一次。当传入数组类型时，可触发多次。如：[0,0.25,0.5,0.75,1]表示目标元素在跟元素的可见程度每多 25% 就执行一次回调。
   ::: tip
   若阈值为 0，则容器与元素只要有一点相交就执行回调。
   :::

```vue
<template>
  <div class="container">
    <div
      class="item"
      ref="itemDOM">
      你好
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
const itemDOM = ref();
onMounted(() => {
  const target = itemDOM.value as HTMLDivElement;
  const observer = new IntersectionObserver((entries) => {
    for (let entry of entries) {
      console.log(entry.time); // 发生变化的时间
      console.log(entry.rootBounds); // 根元素的矩形区域的信息
      console.log(entry.boundingClientRect); // 目标元素的矩形区域的信息
      console.log(entry.isIntersecting); // 目标元素与视口（或根元素）是否相交
      console.log(entry.intersectionRect); // 目标元素与视口（或根元素）的交叉区域的信息
      console.log(entry.intersectionRatio); // 目标元素与视口（或根元素）的相交比例
      console.log(entry.target); // 被观察的目标元素
    }
  });
  observer.observe(target);
});
</script>
```

### 综合对比

渲染 100 个元素，进入或离开视口时改变样式，性能上 intersectionObsever 好过 getBoundingClientRect，主要是后者会绑定太多事件回调了，还有就是会一直重排 render

### 结果

![结果](/imgs/01.png)

### 代码

```vue
<template>
  <div class="container">
    <div
      class="item"
      ref="itemDOM"
      v-for="item in list"
      :class="{ active: item }">
      你好
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
// Intercetion
import useEleInWindowPro from "./hooks/useEleInWindowPro";
// getBoundingClientRect
import useEleInnerWindow from "./hooks/useEleInWindow";
const itemDOM = ref();
const list = reactive(Array.from({ length: 10000 }).fill(false));

onMounted(() => {
  const domList = itemDOM.value as HTMLElement[];
  console.log(domList);
  domList.forEach((ele, index) => {
    useEleInWindowPro(ele, (v: boolean) => {
      if (v) {
        list[index] = true;
      } else {
        list[index] = false;
      }
    });
  });
});
</script>

<style scoped lang="scss">
.container {
  height: 500vh;

  .item {
    height: 100px;
    background-color: red;
    transition: 0.3s;
    margin-bottom: 10px;

    &.active {
      background-color: yellow;
    }
  }
}
</style>
```

## 参考

1. https://www.cnblogs.com/ziyunfei/p/5558712.html
2. https://juejin.cn/post/7146441070828584968
