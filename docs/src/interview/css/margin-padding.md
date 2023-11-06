# margin、padding 取值问题

margin 这个 CSS 属性可以同时配置四个 css 属性`margin-left`、`margin-right`、`,margin-bottom`、`margin-top`。

但是属性值可以是四个、三个、两个、两个取值，取值个数不同其设置的属性也是不同的。

## margin

### 四个取值

margin：1px 2px 3px 4px 则结果为：上 1px，右边 2px，下 3px，左 4px

### 三个取值

​margin：1px 2px 4px 则结果为：上 1px、下 4px，左右 2px。

### 两个取值

margin：10px 15px，则结果为：上下 10px，左右 15px

### 一个取值

margin：10px，则结果为：上下左右 10px

## padding

padding 同理。
