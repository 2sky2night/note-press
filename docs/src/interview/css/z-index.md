# 层叠上下文

​ 层叠上下文规定了每个元素之间的显示顺序和覆盖关系。

层叠上下文管理了元素之间层叠的关系。每个层叠上下文相关 css 属性来触发层叠上下文，这些 css 属性决定了每个层叠上下文的显示顺序和覆盖关系。

## 触发方式

1.根标签 html 就是一个层叠上下文（文档流）

2.z-index+position：**当元素的 z-index 属性值不为 auto 时且 position 不为 static 时**，会创建一个新的层叠上下文。

3.CSS3 属性：opacity、transform、filter 等属性都会创建元素的上下文。

:::warning
z-index：auto（默认值） 不会创建新的层叠上下文，且 z-index:0
:::

## 作用

1. 隔离元素：在某个层叠上下文中的所有元素都不会响应其他层叠上下文的布局。
2. 控制元素的层叠顺序：通过 z-index 可以控制元素的 z 轴，控制同一个层叠上下文中元素的覆盖关系，z-index 大的覆盖 z-index 小的。**非同一个层叠上下文是无法响应其他层叠上下文元素的覆盖关系的!**
3. 形成层叠上下文根：让一个元素成为层叠上下文，其后代元素都在该层叠上下文中设置显示，后代元素都会覆盖该元素显示。

## 思考题 01

box1、box2、son2 的覆盖顺序？

### HTML

```html
<div class="box1"></div>
<div class="box2">
  <div class="son2"></div>
</div>
```

### CSS

```css
div {
  width: 100px;
  height: 100px;
}
.box1 {
  background-color: red;
  z-index: 2;
  position: relative;
  top: 20px;
  left: 20px;
}
.box2 {
  position: relative;
  z-index: 1;
  background-color: greenyellow;
}
.son2 {
  background-color: blue;
  width: 50px;
  height: 50px;
  position: absolute;
  z-index: 999;
}
```

### 答案

答案：box2、son2、box1

为什么`son2`明明是`z-index:999`但是无法覆盖`box2`的`z-index:2`呢？

这就是因为隔离性，让后代元素都在一个层叠上下文中设置覆盖关系，不会响应到其他层叠上下文中的布局。

**因为 box1、box2 都在 html 根层叠上下文中布局**，他们在同一个层叠上下文中，box1 的 z-index=2，box2 的 z-index=1，所以**决定了 box1 覆盖了 box2**。box2 中的 son2 在 box2 创建的层叠上下文中布局的，由于**隔离性**，box2 中后代元素的 z-index 无法影响其他层叠上下文的显示关系。

如何让 son2 覆盖 box1 呢？那么就只需要让 box1 和 son1 处于同一个层叠上下文即可，**因为在同一个层叠上下文下通过 z-index 决定了元素的覆盖关系**。所以只需要让 box1 取消层叠上下文，将定位设置为 auto 或 static 即可。

## 思考题 02

### HTML

```html
<div class="box1"></div>
<div class="box2">
  <div class="son-2"></div>
</div>
```

### CSS

```css
.box1,
.box2 {
  width: 100px;
  height: 100px;
  position: relative;
}
.son-2 {
  top: 30px;
  width: 80px;
  height: 80px;
  background-color: aqua;
  position: absolute;
  z-index: 99999;
}
.box1 {
  z-index: 10;
  background-color: red;
}
.box2 {
  /*z-index：auto,auto是默认值，不会创建新的层叠上下文，所以son-2属于根层叠上下文里面的*/
  z-index: auto;
  top: -50px;
  left: 50px;
  background-color: yellow;
}
```

### 答案

box1、box2、son-2 的覆盖关系？

son-2、box1、box2。

:::tip 为什么 son-2 覆盖了 box1？

box1、box2 都是属于根层叠上下文的所以他们的覆盖关系通过 z-index 决定，由于 box2 是 z-index：auto（默认值），则相当于 z-index：0，所以 box1 在 box2 上。

疑点：为什么 son-2 会影响外部的布局呢，明明 son-2 属于 box2 创建的层叠上下文中的，son-2 的覆盖关系不应该影响外部容器的。

关键：`在于z-index的默认值auto其作用是不创建层叠上下文并将z-index：0`。由于 z-index:auto 不会创建新的层叠上下文则会导致 son-2 是属于根层叠上下文的，box1 也是根层叠上下文的，所以他们的显示关系是通过 z-index 决定的,所以 son-2 会覆盖 box1

:::
