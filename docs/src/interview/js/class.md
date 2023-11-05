# class 相关

## 箭头函数与类字段语法

我们都知道箭头函数是没有 this 的，他的 this 是通过作用域链找到最近的祖先作用域中的 this 来确定的。箭头函数的 this 是定义时就已经确定了，不会因为执行的对象不同而导致 this 的不同。

### 类字段语法

这种方式是类字段语法，类的属性可以直接在类的定义中声明和初始化，而不需要在构造函数中进行赋值，这种方式声明的属性会将其添加到实例上。

并且在这里声明的箭头函数在调用时会继承外部作用域（class）而让`this`执行实例，调用该箭头函数时，它的 `this` 值将绑定到类的实例上，而不是调用位置的上下文。

```js
class Obj {
  a = "b";
  ok = () => {
    console.log(this);
  };
}

const obj = new Obj();

const ok = obj.ok;

ok(); // {a:'b',ok:[Function]}
```

### Object

为什么这种声明的方式不能让 this 指向 obj 呢？因为此箭头函数是在全局作用域中定义的。

```js
const obj = { ok: () => console.log(this) };

const ok = obj.ok;

ok(); // window
```
