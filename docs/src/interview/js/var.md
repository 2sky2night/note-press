## var const let

这三个都是声明变量的关键字。

### var

1. 若 var 在全局作用域下声明的变量，则变量声明在 window 上
2. 若 var 在函数作用域下声明的变量，则变量声明在该作用域中
3. var 变量不会收到块级作用域的影响
4. var 声明的变量都会被提升到当前作用域的顶部

例 1：

```ts
// var 在全局作用域下声明的变量是在全局中声明的，在局部作用域下声明就是局部的变量。
function fun() {
  var b = 9;
}
fun();
console.log(b); // error b is not defined
```

例 2：

```ts
function fun() {
  {
    var b = "9";
  }
  console.log(window.b); // undefined
  console.log(b); // 9??? var变量不会收到块级约束的影响
}
fun();
```

例 3:

```js
function outer() {
  var a = 5;
  function inner() {
    // 为啥是undefined，因为var声明的变量会被提示到作用域顶部
    // 由于a已经声明了，所以不会通过作用域链访问外层的a
    console.log(a); // undefined
    var a = 10;
    console.log(a); // 10
  }
  return inner;
}
outer()();
// 上面的outerr等同于下面的效果
function outer01() {
  var a = 5;
  function inner01() {
    var a;
    console.log(a);
    a = 10;
    console.log(a);
  }
}
```

### const

声明一个常量，初始化时必须声明其值，且值不允许被修改。

### let

声明一个变量。变量只会在当前作用域中生效。

### 区别

**提升**

var 声明的变量可以在声明前访问，不过都是 undefined。

**作用域**

var 不存在块级作用域，let、const 存在块级作用域。

**重复声明**

var 允许同作用域重复声明，let、const 不允许在同一作用域下重复声明。

**暂时性死区**：

​var 变量可以在未被初始化时访问，let、const 只有在变量声明后才能使用。

**赋值：**

​ const 初始化后就不能被重新赋值了。

## 不同方式声明的变量在块级作用域中的表现

下面的案例包含了：异步、变量声明方式、作用域、闭包的问题

### let 版本

说说下列结果

```js
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  });
}
```

0 1 2 3 4

为什么？
因为每次循环时都会产生一个块级作用域并声明当前`i`的值，`setTimeout`中的回调在调用时通过作用域链访问到块级作用域中声明的 i。
简单来说就是每次循环都缓存了 i（在块级作用域里面声明了当前循环时的 i），在回调调用时通过闭包读取到缓存值。

相当于

```js
{
	let i=0;
  setTimeout(() => {
    console.log(i)
  })
}
{
	let i=1;
  setTimeout(() => {
    console.log(i)
  })
}
{
	let i=2;
  setTimeout(() => {
    console.log(i)
  })
}
....
```

### var 版本

说说下列结果

```js
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  });
}
```

5 5 5 5 5

为什么？

因为 var 声明的变量没有块级作用域，这种方式相当于把 var 声明在当前作用域中，每次循环产生的块级作用域对于 var 来说没有作用，当主线程同步任务的 for 循环完成时 var 声明的 i 已经是 5 了，下一个宏任务就按照注册顺序打印 i 了。
