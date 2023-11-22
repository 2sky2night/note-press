---
title: Class
---

## 继承

to-do

## Super

​ super 关键字可以在类的方法中使用，使用方式有 3 种：

1. 获取原型上的属性
2. 调用基类构造函数
3. 给实例添加属性

### 以函数调用

以函数调用，`super()`只能在构造函数中使用，可以将基类的属性挂载到当前实例上。

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  say() {
    console.log("hello~");
  }
}
class Student extends Person {
  constructor(name, age, score) {
    // 调用父类构造函数，并且在调用时其函数this指向当前实例，就可以给student实例挂载person的属性了。
    super(name, age);
    this.score = score;
  }
}
```

### 访问属性、调用方法

访问属性，`super.xxx`，若 super 以对象形式调用某个方法，则此时的 super 为基类的原型对象。

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  say() {
    console.log("hello~");
  }
}
class Student extends Person {
  constructor(name, age, score) {
    super(name, age);
    // student继承person所以通过原型链可以访问person原型对象上的方法say
    // super是person的原型对象，有say方法
    console.log(this.say === super.say); // true
    this.score = score;
  }
}
```

### 在 super 上给某个属性赋值

若给 super 对象添加、修改一个属性，则会将属性挂载到实例上。

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
class Student extends Person {
  constructor(name, age, score) {
    super(name, age);
    this.score = score;
    // 给实例添加属性
    super.ok = 5;
    console.log(Object.getOwnPropertyNames(this).includes("ok"));
  }
}
```

### 注意点

1. 若派生类使用了自定义构造函数，则必须要调用`super`函数来初始化基类的属性
2. 在构造函数中，`super`函数的调用必须在使用 this 之前。
3. 若派生类无构造函数，JS 在幕后自动生成构造函数，会自动调用`super`函数初始化基类的属性。
4. 若通过`super.xxx`调用了某个方法，且该方法中有`this`操作，此时`this`指向派生类实例。

```ts
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  test() {
    console.log(this.score);
    return this;
  }
}
class Student extends Person {
  constructor(name, age, score) {
    super(name, age);
    this.score = score;
    // student继承person所以通过原型链可以访问person原型对象上的方法say
    // super是person的原型对象，有say方法
    console.log(this.say === super.say); // true
    // this调用方法、super调用方法时，方法的this都是指向当前实例的
    console.log(this.test() === super.test()); // true
  }
}
```

## 箭头函数与类字段语法

我们都知道箭头函数是没有 this 的，他的 this 是通过作用域链找到最近的祖先作用域中的 this 来确定的。箭头函数的 this 是定义时就已经确定了，不会因为执行的对象不同而导致 this 的不同。

类字段语法糖其实就是一种语法糖，相当于类字段语法运行在构造函数中的。

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
