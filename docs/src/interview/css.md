# CSS

## 1.BFC

​	BFC块级格式化上下文，**BFC是一个独立的空间，让空间内部的子元素不会影响到外部的布局，外部的布局也不会影响BFC内部子容器的布局**

### 触发BFC

触发`BFC`的条件包含不限于：

- 根元素，即HTML元素
- 浮动元素：float值为left、right
- **overflow值不为 visible**，为 auto、scroll、hidden
- display的值为inline-block、inltable-cell、table-caption、table、inline-table、flex、inline-flex、grid、inline-grid
- position的值为absolute或fixed

### BFC的规则

1.`BFC`就是一个块级元素，块级元素会在垂直方向一个接一个的排列

2.`BFC`就是页面中的一个隔离的独立容器，容器里的标签不会影响到外部标签

3.同一个BFC下，两个元素的margin可能会发生重叠，与方向无关

4.计算`BFC`的高度时，浮动元素也参与计算

### BFC解决的问题

#### 1.解决margin重叠

在同一个bfc容器下，其子元素的margin会被重叠。这种的结果就是box1和box2的外边距发生了重叠

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

解决方法就是让某个元素成为一个BFC容器的子元素，这样就不会发生重叠了。

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

#### 2.高度塌陷

​	当父容器中所有的子容器都设置了浮动脱离了文档流，则父元素就因为没有子元素在文档流中撑起高度而塌陷为0px，使用bfc的特性**bfc容器的高度会计算设置了float的后代元素的高度**，从而让父元素的高度被撑开。

下列的结果就是.fa容器的高度会因为子元素脱离了文档流而塌陷

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

使用bfc的特性，在计算父元素高度时会计算子元素的高度

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

## 2.margin、padding取值问题

​	margin：1px 2px 3px 4px 则结果为：上1px，右边2px，下3px，左4px

​	margin：1px 2px 4px 则结果为：上1px、下4px，左右2px。

## 3.层叠上下文

​	层叠上下文规定了每个元素之间的显示顺序和覆盖关系。	

 层叠上下文管理了元素之间层叠的关系。每个层叠上下文相关css属性来触发层叠上下文，这些css属性决定了每个层叠上下文的显示顺序和覆盖关系。

### 触发方式

1.根标签html就是一个层叠上下文（文档流）

2.z-index+position：**当元素的z-index属性值不为auto时且position不为static时**，会创建一个新的层叠上下文。

3.CSS3属性：opacity、transform、filter等属性都会创建元素的上下文。

**注意**：z-index：auto不会创建新的层叠上下文!!!!且z-index:0

### 作用

1.隔离元素：在某个层叠上下文中的所有元素都不会响应其他层叠上下文的布局。

2.控制元素的层叠顺序：通过z-index可以控制元素的z轴，控制同一个层叠上下文中元素的覆盖关系，z-index大的覆盖z-index小的。**非同一个层叠上下文是无法响应其他层叠上下文元素的覆盖关系的!**

3.形成层叠上下文根：让一个元素成为层叠上下文，其后代元素都在该层叠上下文中设置显示，后代元素都会覆盖该元素显示。

### 思考题01

box1、box2、son2的覆盖顺序？

```html
  <div class="box1"></div>
  <div class="box2">
    <div class="son2"></div>
  </div>
```


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

答案：box2、son2、box1

为什么`son2`明明是`z-index:999`但是无法覆盖`box2`的`z-index:2`呢？

这就是因为隔离性，让后代元素都在一个层叠上下文中设置覆盖关系，不会响应到其他层叠上下文中的布局。

**因为box1、box2都在html根层叠上下文中布局**，他们在同一个层叠上下文中，box1的z-index=2，box2的z-index=1，所以**决定了box1覆盖了box2**。box2中的son2在box2创建的层叠上下文中布局的，由于**隔离性**，box2中后代元素的z-index无法影响其他层叠上下文的显示关系。

如何让son2覆盖box1呢？那么就只需要让box1和son1处于同一个层叠上下文即可，**因为在同一个层叠上下文下通过z-index决定了元素的覆盖关系**。所以只需要让box1取消层叠上下文，将定位设置为auto或static即可。

### 思考题02

```css
      .box1,
      .box2 {
        width: 100px;
        height: 100px;
        position: relative;
      }
      .son-2 {
        top:30px;
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
        z-index:auto;
        top: -50px;
        left: 50px;
        background-color: yellow;
      }
```

```html
    <div class="box1"></div>
    <div class="box2">
      <div class="son-2"></div>
    </div>
```

box1、box2、son-2的覆盖关系？

son-2、box1、box2。

为什么son-2覆盖了box1？

> box1、box2都是属于根层叠上下文的所以他们的覆盖关系通过z-index决定，由于box2是z-index：auto（默认值），则相当于z-index：0，所以box1在box2上。
> **疑点:**为什么son-2会影响外部的布局呢，明明son-2属于box2创建的层叠上下文中的，son-2的覆盖关系不应该影响外部容器的。
> **关键:**`在于z-index的默认值auto其作用是不创建层叠上下文并将z-index：0`。由于z-index:auto不会创建新的层叠上下文则会导致son-2是属于根层叠上下文的，box1也是根层叠上下文的，所以他们的显示关系是通过z-index决定的,所以son-2会覆盖box1

## 4.css选择器

​	css选择器是指：`将css规则作用在页面中的哪些元素中`。

​	基本选择器:父子`>`，后代` `，兄弟`+`、`~`，标签`tag`，属性选择器`[attr=value]`，id选择器、class选择器，通用选择器*，交集选择器（选择中同时满足多个选择器的标签，例如`div.son`）、并集选择器（一个css规则同时作用在多个选择器上，例如`div,p,span`），

​	伪类：nth-child、hover、first-child、last-child、last-type-of、not、active、focus..

​	伪元素：after、before...

### css选择器划分

- 简单选择器:使用了一种选择器
- 复合选择器:通过简单选择器连接而成，如:div[id=ok]，div.son...
- 复杂选择器:通过复合选择器与父子、后代、兄弟等选择器连接而成，如:div .box p

## 5.css选择器的优先级

​	css选择器优先级是指多个选择器作用于同一个元素时，浏览器以何种选择器来应用到元素上。

### 速记版

`!import`>内联样式 > ID 选择器 > 类选择器 = 属性选择器 = 伪类选择器 > 标签选择器 = 伪元素选择器>通用选择器

### 选择器权重

​	每种选择器都有其各自的权重，在多个选择器作用于一个元素时，就是通过计算选择器的权重从而将权重最高的选择器应用到元素上。

> 1.内联样式权重 1000（内联样式权重固定1000，所以想要覆盖内联样式可以将选择器叠加到1000以上即可覆盖内联样式）
>
> 2.id选择器权重 100
>
> 3.class、属性、 伪类选择器权重 10
>
> 4.标签、伪元素选择器权重 1
>
> 其他选择器权重均为0

如`div.box .title span`与`div#box01 div.title span `若同时作用到一个元素上：

则`div.box .title span`：1+10+10+1=22

则`div#box01 div.title span `:1+100+1+10+1=113

所以权重最高的选择器的css规则会作用在对应元素上。