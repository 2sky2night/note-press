# BFC

​ BFC 块级格式化上下文，BFC 是一个独立的空间，让空间内部的子元素不会影响到外部的布局，外部的布局也不会影响 BFC 内部子容器的布局。

> BFC 它决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用，当涉及到可视化布局时，Block Formatting Context 提供了一个环境，HTML 在这个环境中按照一定的规则进行布局。

> 简单来说就是，BFC 是一个完全独立的空间（布局环境），让空间里的子元素不会影响到外面的布局。那么怎么使用 BFC 呢，BFC 可以看做是一个 CSS 元素属性

## 触发 BFC

触发`BFC`的条件包含不限于：

- 根元素，即 HTML 元素
- 浮动元素：float 值为 left、right
- **overflow 值不为 visible**，为 auto、scroll、hidden
- display 的值为 inline-block、inltable-cell、table-caption、table、inline-table、**flex**、inline-flex、**grid**、inline-grid
- position 的值为 **absolute** 或 **fixed**

## BFC 的规则

1.`BFC`就是一个块级元素，块级元素会在垂直方向一个接一个的排列

2.`BFC`就是页面中的一个隔离的独立容器，容器里的标签不会影响到外部标签

3.同一个 BFC 下，两个元素的 margin 可能会发生重叠，与方向无关

4.计算`BFC`的高度时，浮动元素也参与计算

## BFC 解决的问题

### 1.解决 margin 重叠

在同一个 bfc 容器下，其子元素的 margin 会被重叠。这种的结果就是 box1 和 box2 的外边距发生了重叠

```html
   <style>
      * {
        margin: 0;
        padding: 0;
      }
      .box {
        margin: 0px;
        width: 100px;
        height: 100px;
        background: red;
      }
      .box:nth-of-type(1) {
        margin-bottom: 10px;
      }
      .box:nth-of-type(2) {
        margin-top: 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="box"></div>
      <div class="box"></div>
    </div>
  </body>
```

解决方法就是让某个元素成为一个 BFC 容器的子元素，这样就不会发生重叠了。

```html
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .box {
        margin: 0px;
        width: 100px;
        height: 100px;
        background: red;
      }
      .container>.box{
        margin-bottom: 10px;
      }
      .bfc>.box{
        margin-top: 10px;
      }
      .bfc{
        display: flex;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="box"></div>
      <div class="bfc">
        <div class="box"></div>
      </div>
    </div>
  </body>
```

### 2.高度塌陷

​ 当父容器中所有的子容器都设置了浮动脱离了文档流，则父元素就因为没有子元素在文档流中撑起高度而塌陷为 0px，使用 bfc 的特性**bfc 容器的高度会计算设置了 float 的后代元素的高度**，从而让父元素的高度被撑开。

下列的结果就是.fa 容器的高度会因为子元素脱离了文档流而塌陷

```html
 <style>
    .fa{
      width: 200px;
      background-color: red;
    }
    .son{
      height: 150px;
      width: 150px;
      float: left;
      background-color: skyblue;
    }
  </style>
</head>
<body>
  <div class="fa">
    <div class="son"></div>
  </div>
</body>
```

使用 bfc 的特性，在计算父元素高度时会计算子元素的高度

```html
 <style>
    .fa{
      width: 200px;
      display: flex;
      background-color: red;
    }
    .son{
      height: 150px;
      width: 150px;
      float: left;
      background-color: skyblue;
    }
  </style>
</head>
<body>
  <div class="fa">
    <div class="son"></div>
  </div>
</body>
```
