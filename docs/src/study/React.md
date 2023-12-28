---
outline: [1, 2]
---

# 一、起步

## 0.前置

通过一个案例来了解构成 react 项目所需的最重要的依赖。

head 部分

**react.development.js**：react 的核心文件

**react-dom.development.js**：react 与 dom 相关的核心文件

**babel.min.js**：将 jsx 编译成 js 代码，好让浏览器识别

```html
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

body 部分

react 挂载组件的根节点

```html
<div class="root"></div>
```

script 部分

**text/babel**的作用就是将**script**标签包裹的内容交给**babel**去处理并执行，每
当浏览器识别 script 标签并 type 的属性为 text/babel 时，就会交给 babel。

```html
<script type="text/babel">
  // 定义的一个App组件
  function App() {
    return <div>Hello,React!</div>;
  }
  // 浏览器的DOM节点
  const root = document.querySelector(".root");
  if (root) {
    // 创建react实例，并挂载到对应的DOM节点下
    const reactIns = ReactDOM.createRoot(root);
    // 将App组件渲染到react实例控制的DOM节点中
    reactIns.render(<App />);
  }
</script>
```

完整代码：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      http-equiv="X-UA-Compatible"
      content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0" />
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <title>React前置</title>
  </head>
  <body>
    <div class="root"></div>
    <script type="text/babel">
      function App() {
        return <div>Hello,React!</div>;
      }
      const root = document.querySelector(".root");
      if (root) {
        const reactIns = ReactDOM.createRoot(root);
        reactIns.render(<App />);
      }
    </script>
  </body>
</html>
```

## 1.环境搭建

通过 create-react-app 脚手架工具来搭建项目，当然你也可以使用 vite 等其他脚手架工
具生成模板项目。

这里的话使用`npx create-react-app project-name`来创建项目。

npx：Node.js 的工具命令，查找并执行后续的包命令

create-react-app：核心包，用于创建 react 模板项目

## 2.认识项目结构

脚手架创建好项目后，在 src 文件夹中会包含入口文件、App 根组件、样式文件、测试文
件等等。比较核心的就是入口文件**index.js**和根组件**App.jsx**。

### index.js（入口文件）

其代码逻辑大概就是创建 react 容器实例并挂载到文档中的某个节点上去，并通过实例的
render 方法将 App 根组件覆盖并渲染到对应节点上去。和 vue 的运行流程基本一致。

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

### App.js（根组件）

```js
function App() {
  return <div className="App">hello</div>;
}

export default App;
```

## 3.JSX

JSX 是 javascript 和 xml 的缩写，表示在**js 代码中编写 html 模板**，JSX 是 react
编写组件模板的方式。可以将 html 嵌入到 js 中，其优势就是可以写 html 的声明式模板
，并拥有 js 的编程能力。

JSX 语法是不能被浏览器识别的，所以需要使用第三方工具（babel）将 JSX 语法转换成
js 代码，并浏览器识别并执行。其实 JSX 和 vue 组件中的模板部分类似，都是需要被转
换成 js 代码才能被浏览器识别跑通的。

### 1.插值语法

使用大括号可以将 js 表达式嵌入到 html 元素的内容或属性中，常用的作用就是使用变量
渲染内容、调用函数...，总之插值语法是 JSX 所有语法的核心，所有 JSX 的语法都是基
于插值语法的。

1. 变量渲染内容

   ```jsx
   function App() {
     const message = "雷好!";
     return <div className="App">{message}</div>;
   }
   ```

2. 方法调用

   ```jsx
   function App() {
     const getName = () => {
       return "Mark";
     };
     return <div className="App">{getName()}</div>;
   }
   ```

3. 使用 js 对象

   ```jsx
   function App() {
     const style = {
       color: "red",
     };
     return <div style={style}>hello</div>;
   }

   export default App;
   ```

### 2.条件渲染

#### if

通过逻辑运算符&&即可实现 v-if 的效果，&&是 js 中的逻辑运算符，其规则就是若条件成
立，则表达式的值为后者的值，可以很方便的实现条件渲染。

```jsx
function App() {
  const flag = true;
  return <div>{flag && <div>ok</div>}</div>;
}

export default App;
```

#### if-else

通过插值语法+三目表达式可以实现条件渲染。

```jsx
function App() {
  const flag = Math.random() > 0.5;
  return (
    <div>
      {flag ? (
        <div style={{ color: "blue" }}>大于0.5</div>
      ) : (
        <div style={{ color: "red" }}>小于等于0.5</div>
      )}
    </div>
  );
}

export default App;
```

### 3.列表渲染

通过插值语法+map 方法可以将数组中的每个元素渲染出来。通过在插值语法中嵌入一个
jsx 元素数组，react 会将数组中的每个元素自动渲染出来。我们可以通过 map 方法快速
的通过源数组创建一个新的 ui 结构并渲染出来。

```jsx
function App() {
  const employees = [
    {
      name: "Mark",
      age: 13,
    },
    {
      name: "Jack",
      age: 15,
    },
  ];
  return (
    <ul>
      {employees.map((item) => (
        <li key={Math.random()}>
          姓名:{item.name} 年龄:{item.age}
        </li>
      ))}
    </ul>
  );
}
```

**注意：**在 react 中使用 map 列表渲染元素时，需要给每个元素提供一个 key 属性作
为唯一标识符，可以提升后续列表更新时的渲染性能。

补充：在插值语法中也是可以写 jsx 元素的，因为 jsx 元素实际上就是一个函数调用，是
一个表达式。

### 4.事件绑定

1.基础事件绑定

事件绑定实际就是插值语法将定义的函数绑定到对应的事件上去即可。

```jsx
function App() {
  const onHandleClick = () => {
    console.log("Is clicked!");
  };
  return (
    <>
      <button onClick={onHandleClick}>点我试试</button>
    </>
  );
}

export default App;
```

2.自定义参数

通过直接给事件属性定义一个函数，即可实现事件的自定义参数。应用场景：删除、修改列
表中的某个元素。

```jsx
function App() {
  const list = [
    {
      id: 1,
      name: "Mark",
      age: 18,
    },
    {
      id: 2,
      name: "June",
      age: 21,
    },
  ];
  const handleClick = (id) => {
    alert(`准备删除${list.find((item) => item.id === id).name}了哦`);
  };
  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>
          <span>{item.name} </span>
          <button onClick={() => handleClick(item.id)}>x</button>
        </li>
      ))}
    </ul>
  );
}

export default App;
```

# 二、组件化（函数式）开发

## 1.组件

组件就是一个拥有独立功能的 ui 结构，是构成网页的一个部件。

react 的组件是通过构造函数来定义的，**注意需要让函数名称大写**，函数的返回值就是
组件的模板结构；使用组件时只需要像写原生 html 元素一样即可。

```jsx
// 定义组件
function Button() {
  return <button>点我试试</button>;
}

function App() {
  // 使用组件
  return <Button></Button>;
}

export default App;
```

## 2.hooks

hooks 其实就是 react 提供的 api，便于我们开发组件。

### 1.useState

useState 是用来创建一个响应式数据的。

#### 基本使用

调用这个函数时传入的值就是这个响应式数据的初始值，这个函数会返回一个数组：

第一个：一个变量，其值被初始化为 useState 的第一个实参。

第二个：一个 api，调用这个函数可以更新变量的值，并且会重新渲染组件。

在创建响应式数据时，需要注意**基本类型**和**引用数据类型**在更新时的差异。

**注意**：千万不要直接更新这个变量，因为这个变量只是一个普通的 js 变量，更新他是
不会重新渲染组件的，所以要想更新并重新渲染组件必须要调用 react 提供的 api。

##### 1.基本数据类型

对应基本类型的数据，使用 setCount 并传入最新数据即可。

```jsx
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const handleCount = () => {
    setCount(count + 1);
  };
  return (
    <>
      <h1>count:{count}</h1>
      <button onClick={handleCount}>更新count</button>
    </>
  );
}
```

##### 2.引用数据类型

引用数据类型在更新时，需要注意的是**setData**是会直接修改**data**变量的引用，从
而导致其他属性的丢失。

```jsx
import { useState } from "react";

function App() {
  const [data, setData] = useState({
    name: "Mark",
    age: 18,
  });
  const handleUpdate = () => {
    // ❌ 错误，setData会直接修改data变量的引用，这种更新方式会失去属性age!
    // setData({
    //   name: "李四",
    // });

    // ✔️ 正确
    setData({
      ...data,
      name: "李四",
    });
  };
  return (
    <>
      <div>{JSON.stringify(data)}</div>
      <button onClick={handleUpdate}>更新</button>
    </>
  );
}

export default App;
```

#### 工作机制

##### 执行时机

在首次实例化（渲染）组件时，会执行组件的构造函数。

在更新响应式数据时，react 会重新渲染该组件，也就是会重新执行组件的构造函数。

但是在**非首次**渲染时，`message`的值不会被因为调用了**useState**而被初始化为**“
你好”**，而是被初始化为最后一次调用**setMessage**时的值

```jsx
import { useState } from "react";

let count = 0;

function App() {
  console.log(++count); // 每次调用setMessage都会重新执行App函数
  const [message, setMessage] = useState("你好");
  const handleClick = () => setMessage(message + "~");
  return <button onClick={handleClick}>{message}</button>;
}

export default App;
```

##### 异步更新

useState 提供的更新变量的函数是非常**“坑人的”**，当调用更新函数时，变量其实并没
有被更新，我们立即获取变量其实还是旧值。

比如：

```jsx
const [count, setCount] = useState(0);
setCount(1);
console.log(count); // 0
```

那么，啥时候才能获取到最新的值呢？只有下一次调用该函数时才会获得最新的值。想要对
更新后的数据进行操作可以使用`useEffect`钩子。

#### useState 直接传入函数

useState 也可以传入一个函数，若传入一个函数则变量的初始值就是函数的返回值。

**注意**：在非首次渲染时，不会去执行该函数作为变量的初始值。

```jsx
import { useState } from "react";

function App() {
  console.log("组件函数体");
  const [data, setData] = useState(() => {
    // 这个函数只在首次渲染时执行，后续更新重新渲染都不会执行
    console.log("useState的函数体");
    const date = new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  });

  const handleClick = () => {
    setData({
      ...data,
      day: data.day + 1,
    });
  };

  return (
    <>
      <h1>{JSON.stringify(data)}</h1>
      <button onClick={handleClick}>点我更新</button>
    </>
  );
}

export default App;
```

#### setState 直接传入函数

setState 若传入一个函数，他会异步的更新数据，当真正需要更新时就会执行这个函数，
这个函数的返回值就会作用最新的变量值。**可以保证在访问值的时候永远都是最新值**，
通过传入函数，可以实现异步的更新。

```jsx
import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  // 实现连续更新两次
  const handleClick = () => {
    // ❌ 错误
    // setCount(count + 1);
    // setCount(count + 1); 因为count异步更新

    // ✅ 正确
    setCount((prev) => {
      // prev是旧值
      return prev + 1;
    });

    //....一些操作后

    setCount((prev) => {
      // prev是旧值
      return prev + 1;
    });
  };

  useEffect(() => {
    // 首次渲染会执行，后续更新也会执行
    console.log("检测到count更新了");
  }, [count]);

  return <button onClick={handleClick}>{count}</button>;
}
export default App;
```

#### 强制更新

useState 在使用更新函数时，**若发先新旧两个变量的引用地址不同就会重新渲染组
件**，利用这个机制，就可以实现 forceUpdate 强制更新功能。

```jsx
import { useState } from "react";

let count = 1;
function App() {
  // 若可以看到视图在更新则说明重新渲染了
  const [_, setForce] = useState({});
  const handleUpdate = () => setForce({});
  return (
    <>
      <h1>{count++}</h1>
      <button onClick={handleUpdate}>强制更新</button>
    </>
  );
}

export default App;
```

#### 总结

useState 是用来创建组件状态的 hooks，有两种初始化状态方式：1.直接给予数据 2.通过
函数来初始化

useState 的返回值是一个数组，第一个为变量，第二个是可以更新变量值的函数`setXXX`

useState 在更新时是异步的，更新方式有两种，一种是直接更新（注意引用类型），一种
是异步更新（传入函数）

useState 在非首次渲染时，其创建的变量的初始值都是最后一次调用 setXXX 更新的值。

### 2.useEffect

useEffect 可以作为监听数据、生命周期的作用。

#### 前置

要学会这个钩子需要先了解副作用、纯函数这个两个概念。

##### 副作用

​ 与渲染组件无关的操作，函数执行过程中对外部状态、资源或环境产生的影响的操作。是
指一个 function 做了和本身运算返回值无关的事，比如：修改了全局变量、修改了传入的
参数、甚至是 console.log()，所以 ajax 操作，修改 dom 都是算作副作用的；

​ 在 react 中就是外部对组件内部产生了影响，例如从外部获取数据作用于组件上，就是
副作用操作，因为外部不同的数据就有不同的 ui 输出。内部对外部产生了影响也为副作用
操作，比如组件内部影响了全局作用域的变量、发送请求修改数据库内容都算副作用...

##### 纯函数

​ 给一个 function 相同的参数，永远会返回相同的值，并且没有副作用。

​ 而为了编写纯函数组件，所以我们需要使用 useEffect 这个钩子，来间接的处理副作用
。

#### 使用方式

```jsx
useEffect(fn, [deps]);
```

**无论如何，fn 至少都会执行一次；若省略 deps，则 fn 会在每次重新渲染时执行。**

fn：一个函数，会在**每次渲染完成后执行**。

deps：一个可选参数，有以下情况：

​ 空数组：只会在首次渲染时执行。

​ 依赖项数组：在重新渲染后，会比对**新旧依赖数据**是否更新，若有变化则会执
行**fn**，无变化则不会执行**fn**。

##### 省略 deps 参数

省略 deps 参数，会导致每次渲染组件都会执行 fn。

```jsx
import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = count.toString();
  });
  const handleClick = () => setCount(count + 1);
  return <button onClick={handleClick}>add count</button>;
}

export default App;
```

##### 依赖项数组

若有依赖项，**则会在重新渲染完成后**，对应新旧依赖项的变化，若有更新则执行 fn。

```jsx
import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    document.title = count.toString();
    // 只有count变量更新时才会执行回调
  }, [count]);
  const handleCount = () => setCount(count + 1);
  const handleFlag = () => setFlag(!flag);
  return (
    <>
      <button
        onClick={handleCount}
        style={{ color: flag ? "red" : "black" }}>
        add count
      </button>
      <button onClick={handleFlag}>alter color</button>
    </>
  );
}

export default App;
```

##### 空

首次渲染会调用 fn。

```jsx
import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = count.toString();
  }, []);
  const handleCount = () => setCount(count + 1);
  return (
      <button
        onClick={handleCount}
        add count
      </button>
  );
}

export default App;

```

#### 使用场景

##### 执行副作用

```jsx
import { useEffect, useState } from "react";

function App() {
  const [color, setColor] = useState("#000");
  useEffect(() => {
    console.log("ok");
    fetch("https://api.liulongbin.top/v1/color")
      .then((res) => res.json())
      .then((res) => {
        setColor(res.data.color);
      });
  }, []);
  return <button style={{ color }}>color</button>;
}

export default App;
```

##### 监听数据

useEffect 需要传入两个参数，一个是处理函数，第二个是监听哪些数据。

需要注意的是：useEffect 会在首次渲染时执行一次。

```jsx
import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => setCount(count + 1);

  useEffect(() => {
    // 首次渲染会执行，后续更新也会执行
    console.log("检测到count更新了");
  }, [count]);

  return <button onClick={handleClick}>{count}</button>;
}
export default App;
```

##### 消除副作用

useEffect 的 fn 若返回一个函数，则该函数会在组件被卸载时执行。

###### 示例 1 清除计时器

```jsx
import { useEffect, useRef, useState } from "react";

export default () => {
  const [time, setTime] = useState(0);
  const timerId = (useRef < number) | (null > null);

  useEffect(() => {
    // 在组件被卸载时，清除定时器
    return stopTime;
  }, []);

  const startTime = () => {
    stopTime();
    timerId.current = setInterval(() => {
      setTime((pre) => pre + 1);
    }, 1000);
  };

  const stopTime = () => {
    if (timerId.current !== null) {
      clearInterval(timerId.current);
      console.log("清除定时器");
      timerId.current = null;
    }
  };

  const resetTime = () => {
    stopTime();
    setTime(0);
  };

  return (
    <>
      <h1>开始了{time}秒</h1>
      <button onClick={startTime}>开始</button>
      <button onClick={stopTime}>停止</button>
      <button onClick={resetTime}>重置</button>
    </>
  );
};
```

###### 示例 2 终止请求

```jsx
import { useEffect, useState } from "react";

function App() {
  const [color, setColor] = useState("#000");
  useEffect(() => {
    // 1.fetch终止请求的方法，创建控制器
    const controller = new AbortController();
    // 2.绑定信号
    fetch("https://api.liulongbin.top/v1/color", {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((res) => {
        setColor(res.data.color);
      });

    return () => {
      // 3.通过abort终止请求
      controller.abort();
      console.log("终止请求");
    };
  }, []);
  return <button style={{ color }}>color</button>;
}

export default App;
```

#### 注意

1.在 useEffect 的 fn，不要更新依赖项的值，会造成死循环

2.不同功能的副作用不要写在一个 useEffect 中

3.useEffect 的 fn 至少至少会执行一次

#### 总结

1. useEffect 是用来让 react 组件间接处理副作用的，例如网络请求、DOM 操作。
2. useEffect 中的 fn 至少执行一次，在首次渲染后执行一次。
3. deps 若省略每次渲染完成后就执行 fn；空数组则首次渲染后执行，有依赖项则依耐项
   更新时并渲染完成后执行。

### 3.useRef

useRef 函数，它用于在函数组件中引用对象，并在重新呈现之间（重新渲染时）保留被引
用对象的状态。也就是说这个 ref 存储的数据除了人为的修改，其他情况下永远都不会被
更新，不会因为 react 重新渲染而被初始化。

注意点：

1.在调用 useRef 函数时为其指定一个初始值，其保存的值在组件的整个生命周期都不会改
变。

2.useRef 返回值为一个对象，该对象只有一个**current**属性。

3.更新 current 属性不会造成 react 的重新渲染。

4.重新渲染不会被重新初始化。

5.不要让 useRef 作为其他 hooks 的依赖项，如通过 useEffect 监听 current 的值...

使用场景：

#### 1.获取 DOM 元素

通过**useRef 钩子+ref 属性**的运用可以在组件初次渲染时获取 DOM 元素。要想获取函
数式组件的实例，可以使用**forwardRef**

```jsx
import { useRef, useEffect } from "react";

function App() {
  const inputDOMRef = useRef(null);

  useEffect(() => {
    // 在首次渲染完成时才能成功获取到dom元素
    console.log(inputDOMRef);
    handleFocus();
  }, []);

  const handleFocus = () => {
    inputDOMRef.current?.focus();
  };
  return (
    <>
      <input ref={inputDOMRef} />
      <button onClick={handleFocus}>获得焦点</button>
    </>
  );
}

export default App;
```

#### 2.保存变量的状态（跨生命周期保存某个值）

通过 useRef 可以让函数拥有 class 一样的功能，可以保存一些变量（属性），并且在重
新调用函数时变量（属性）的值也不会被初始化。

```jsx
import { useRef, useState } from "react";

function App() {
  // 记录渲染次数
  const renderCountRef = useRef(0);
  // 渲染次数+1
  renderCountRef.current++;
  // 状态
  const [value, setValue] = useState("");
  // 监听输入框事件
  const handleInput = (e) => {
    setValue(e.target.value);
  };
  // 获取渲染次数
  const handleClick = () => {
    alert(renderCountRef.current);
  };
  return (
    <>
      <input
        value={value}
        onInput={handleInput}></input>
      <button onClick={handleClick}>点我获取渲染次数</button>
    </>
  );
}

export default App;
```

#### 总结

1.useRef 是用来创建一个变量，该变量不会因为重新渲染而被初始化，只有人为的修改才
会更新。

2.useRef 可以与 ref 属性结合起来获取 DOM 元素，不能用来获取函数式组件的实例!!!

3.useRef 的更新不会引起组件的重新渲染。

### 4.forwardRef（React 函数）

forwardRef 可以用来获取函数式组件的实例，fowardRef 一般与 useImperativeHandle 配
和使用。

步骤：

1.通过 useRef 创建一个 ref 对象，用来引用组件实例

2.通过 forwardRef 定义一个子组件，其实就是将子组件的逻辑全部都写在调用
forwardRef 传入的函数中。

3.使用 2 中的组件，并绑定 ref 属性

这样就成功的获取到子组件的实例了，但子组件需要使用 useImperativeHandle 暴露
api，这一点和 vue 的 defineExpose 类似，需要子组件显示的暴露内容才能访问。

```jsx
import { forwardRef, useState, useRef } from "react";

const Count = forwardRef((props, ref) => {
  // props是父组件传递的自定义属性
  // ref是父组件传递的ref对象
  const [count, setCount] = useState(0);

  const handleClick = () => setCount(count + 1);

  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleClick}>count++</button>
    </>
  );
});

function App() {
  // 父组件创建ref
  const countRef = useRef(null);
  // 绑定ref到子组件上
  return <Count ref={countRef}></Count>;
}

export default App;
```

总结

forwardRef 是用来获取函数式组件的实例的，需要与 useRef 结合起来使用

1. forwardRef 可以定义一个组件

2. forwardRef 需要传入一个函数，这个函数内部可以像组件一个构建，函数可以接收两个
   参数，第一个是 props，第二个是 ref。

### 5.useImperativeHandle

组件向外暴露 api。useImperativeHandle 需要与 forwardRef 结合起来使用。

#### 基本使用

useImperativeHandle 可以传入两个参数，一个是 ref 与父组件沟通的桥梁，另一个是函
数，函数的返回值就是子组件暴露的 api，返回什么，ref.current 的值就是啥。

```jsx
forwardRef((props, ref) => {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount(count + 1);
  // 向外暴露的api
  useImperativeHandle(ref, () => {
    return {
      handleClick,
    };
  });
  return <div>{count}</div>;
});
```

示例：

```jsx
import { forwardRef, useState, useRef, useImperativeHandle } from "react";

const Count = forwardRef((props, ref) => {
  // props是父组件传递的自定义属性
  // ref是父组件传递的ref对象
  const [count, setCount] = useState(0);

  const handleClick = () => setCount(count + 1);

  // 向外暴露的api
  useImperativeHandle(ref, () => {
    return {
      handleClick,
    };
  });

  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleClick}>count++</button>
    </>
  );
});

function App() {
  // 父组件创建ref
  const countRef = useRef(null);

  const handleClick = () => {
    countRef.current?.handleClick();
  };

  return (
    <>
      <button onClick={handleClick}>父组件更新count组件中的状态</button>
      <Count ref={countRef}></Count>
    </>
  );
}

export default App;
```

#### useImperativeHandle 的第三个参数

对于第三个参数，有三种不同的用法，他与第二个参数密切相关。

##### 1.空数组

空数组则代表第二个参数的函数只会在首次渲染完成后执行一次，也就是说返回的 ref 对
象只会被更新一次。

如果说组件暴露了一个响应式数据，那么使用空数组就会导致响应式数据更新了，但 ref
对象中的值依旧是旧值。如果组件没有暴露响应式数据，那么就可以选择使用空数组，提升
性能。

```jsx
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

interface ChildInst {
  count: number;
  handleClick: () => void;
}

const Child =
  forwardRef <
  ChildInst >
  ((props, ref) => {
    const [count, setCount] = useState(0);
    const handleClick = () => {
      setCount(count + 1);
    };
    useImperativeHandle(
      ref,
      () => {
        console.log("执行了useImperativeHandle传递的第二个参数");
        return {
          count,
          handleClick,
        };
      },
      []
    );
    return (
      <>
        <h2>{count}</h2>
        <button onClick={handleClick}>点击更新count</button>
      </>
    );
  });

function App() {
  const childRef = (useRef < ChildInst) | (null > null);
  const onHandleClick = () => {
    childRef.current?.handleClick();
  };
  return (
    <>
      <button onClick={onHandleClick}>父组件更新子组件的状态</button>
      <Child ref={childRef}></Child>
    </>
  );
}

export default App;
```

##### 2.传入相关依赖变量

若在数组中传入了相关依赖项，就可以保证暴露的 ref 可以在组件对应的数据更新的时候
获取到最新的 ref 对象。如果组件暴露了响应式数据请将对应的数据传入该数组中。

```jsx
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

interface ChildInst {
  count: number;
  handleClick: () => void;
}

const Child =
  forwardRef <
  ChildInst >
  ((props, ref) => {
    const [count, setCount] = useState(0);
    const [count01, setCount01] = useState(1);
    const handleClick = () => {
      setCount(count + 1);
    };
    // count01更新不会执行useImperativeHandle的第二个参数的函数
    const handleClick01 = () => {
      setCount01(count01 + 1);
    };
    useImperativeHandle(
      ref,
      () => {
        console.log("执行了useImperativeHandle传递的第二个参数");
        return {
          count,
          handleClick,
        };
      },
      // 只有count变量更新时才会执行回调，获取最新的ref对象
      [count]
    );
    return (
      <>
        <h2>{count}</h2>
        <button onClick={handleClick}>点击更新count</button>
        <h2>count01:{count01}</h2>
        <button onClick={handleClick01}>点击更新count01</button>
      </>
    );
  });

function App() {
  const childRef = (useRef < ChildInst) | (null > null);
  const onHandleClick = () => {
    childRef.current?.handleClick();
    console.log(childRef.current?.count);
  };
  return (
    <>
      <button onClick={onHandleClick}>父组件更新子组件的状态</button>
      <Child ref={childRef}></Child>
    </>
  );
}

export default App;
```

##### 3.不传递第三个参数

省略第三个参数会导致只要重新渲染组件，第二个参数的函数都会重新执行，非常浪费性能
。

#### 总结

1. useImperativeHandle 可以用来暴露组件的属性、方法。
2. 该方法与 forwardRef 配合使用，第一个参数需要传入一个 ref（forwardRef 传入的函
   数的第二个参数），第二个参数是回调，回调返回的对象既是 ref.current 的值。
3. 第三个参数关系到第二个参数的执行次数，会影响性能，有三种取值省略、空数组、依
   赖项数组。

### 6.useLayoutEffect

useLayoutEffect 和 useEffect 的功能是一样的，不过 fn 的执行时机是不一样的。

**useEffect**：会在浏览器重排之后触发，异步执行 fn，不会阻塞浏览器重排

**useLayoutEffect**：在浏览器重排之前触发，同步执行 fn，会阻塞浏览器重排。

一个简单例子即可说明其差异。

#### useEffect

下面这个案例会导致每次点击重置时**h1**渲染的**count**部分会有闪烁，其实就
是**count**在重置成 0 后，组件重新渲染完成了，执行了**useEffect**的回调，导
致**count**更新，再次重新渲染组件，从而导致闪烁。**这就是因为 useEffect 的回调会
在浏览器重新绘制之后执行。**

```jsx
import { useEffect, useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  const handleReset = () => {
    setCount(0);
  };

  const handleUpdate = () => {
    setCount((pre) => pre + 1);
  };

  // 故意写了一个在重置的时候随机生成一个数字
  useEffect(() => {
    if (count === 0) {
      setCount(Math.random() * 10);
    }
  }, [count]);

  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleUpdate}>+1</button>
      <button onClick={handleReset}>reset</button>
    </>
  );
}
```

#### useLayoutEffect

useLayoutEffect 就不会导致闪烁的问题，因为当重置为 0 时重新渲染组件之前，执行了
useLayoutEffect 的 fn，从而再次重新渲染，所以为 0 的那次更新并没有被渲染到页面上
去。

```jsx
import { useEffect, useLayoutEffect, useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  const handleReset = () => {
    setCount(0);
  };

  const handleUpdate = () => {
    setCount((pre) => pre + 1);
  };

  // 故意写了一个在重置的时候随机生成一个数字
  useLayoutEffect(() => {
    if (count === 0) {
      setCount(Math.random() * 10);
    }
  }, [count]);

  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleUpdate}>+1</button>
      <button onClick={handleReset}>reset</button>
    </>
  );
}
```

### 7.useReducer

当状态更新逻辑比较复杂时可以考虑 useReducer，他可以把状态从组件中独立出来。

```js
const [state, dispatch] = useReducer(reducer, initState, initAction);
```

#### 参数

**reducer**：一个纯函数，该函数接收一个 state 和 action，需要返回 state。

**initState**：状态的初始值。

**initAction**：初始化状态的处理函数，如果提供了**initAction**函数，则该函数的返
回值就是初始状态的值，可以对初始状态进行相应操作。**initAction**可以接收一个参数
也就是**initState**。

> - `reducer`：用于更新 state 的纯函数。参数为 state 和 action，返回值是更新后的
>   state。state 与 action 可以是任意合法值。
> - `initialArg`：用于初始化 state 的任意值。初始值的计算逻辑取决于接下来的
>   `init` 参数。
> - **可选参数** `init`：用于计算初始值的函数。如果存在，使用 `init(initialArg)`
>   的执行结果作为初始值，否则使用 `initialArg`。

#### 返回值

**state**：状态

**dispatch**：可以用来修改状态值的 api

#### reducer

​ reducer 是一个纯函数，接收两个参数：是 state（状态）和 action，其返回值是更新
后的 state。

​ 每次执行 dispatch 都会重新调用 reducer 函数，reducer 可以接收当前的
state、action 作为函数参数，可以通过 action 的类型来执行对应的更新逻辑。

​ 要注意的是返回的新 state 的引用一定不能与旧 state 的引用一致，若一样则会导致
react 不会重新渲染组件。

```ts
const reducer: Reducer<
  { name: string; age: number },
  { type: "update:name"; value: string } | { type: "update:age"; value: number }
> = (state, action) => {
  switch (action.type) {
    case "update:name":
      return {
        ...state,
        name: action.value,
      };
    case "update:age":
      return {
        ...state,
        age: action.value,
      };
    default:
      throw Error("无此类型的action!");
  }
};
```

#### dispatch

dispatch 函数允许你更新 state 并触发组件的重新渲染。它需要传入一个 action 作为参
数，例如：

```jsx
const [state, dispatch] = useReducer(reducer, { age: 42 });

function handleClick() {
  dispatch({ type: "incremented_age" });
}
```

React 会调用 `reducer` 函数以更新 state，`reducer` 函数的参数为当前的 state 与传
递的 action。

action 都需要包括 type，可以用来表示本次更新的类型，这样 reducer 才可以直到本次
需要更新哪个数据，当然 action 也可以包含一些额外数据。

**其实 dispatch 很像 vue 的 emit，而 action 很像 emit 中的参数，type 表示事件类
型，在事件触发时也可以传递一些额外参数用于更新状态。**

#### 注意

1. dispatch 函数在更新状态时也是异步的，所以更新后是无法立即获取状态最新的值。
2. 若更新前后无任何变化，react 是不会重新渲染组件的。
3. reducer 中的 state 是只读的，切勿修改 state 中的数据，要修改数据请通过 return
   返回最新数据即可。
4. 在使用 dispatch 更新状态时，若 reducer 返回更新后的 state 与更新前的 state 的
   内存地址是相同的话，react 是会跳过本次更新的重新渲染。React 使用
   [`Object.is`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is)
   比较更新前后的 state。
5. reducer 的返回值是什么，更新后的 state 的值就是什么。

#### 基本的示例

```jsx
import { Reducer, useReducer } from "react";

const reducer: Reducer<
  { name: string, age: number },
  { type: "update:name", value: string } | { type: "update:age", value: number }
> = (state, action) => {
  switch (action.type) {
    case "update:name":
      return {
        ...state,
        name: action.value,
      };
    case "update:age":
      return {
        ...state,
        age: action.value,
      };
    default:
      //  若传入了未知的type，需要报错，中断程序。
      throw Error("无此类型的action!");
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, { name: "Mark", age: 12 });

  const handleUpdateName = () => {
    dispatch({ type: "update:name", value: state.name + "~" });
  };

  const handleUpdateAge = () => {
    dispatch({ type: "update:age", value: state.age + 1 });
  };

  return (
    <>
      <div>姓名:{state.name}</div>
      <div>年龄:{state.age}</div>
      <button onClick={handleUpdateName}>更新姓名</button>
      <button onClick={handleUpdateAge}>更新年龄</button>
    </>
  );
}
```

#### 使用 Immer

使用 Immer 插件可以让我们的 reducer 更简洁，使用 immer 我们就可以直接对 state 进
行修改，而无需手动返回新对象了，immer 内部会帮我们执行这次操作。

##### 安装

```shell
pnpm install immer use-immer
```

##### 使用

```jsx
import { useReducer } from "react";
import { useImmerReducer, ImmerReducer } from "use-immer";

const reducer: ImmerReducer<
  { name: string, age: number },
  { type: "update:name", value: string } | { type: "update:age", value: number }
> = (state, action) => {
  switch (action.type) {
    case "update:name":
      state.name = action.value;
      break;
    case "update:age":
      state.age = action.value;
      break;
    default:
      throw Error("无此类型的action!");
  }
};

export default function App() {
  const [state, dispatch] = useImmerReducer(reducer, { name: "Mark", age: 12 });

  const handleUpdateName = () => {
    dispatch({ type: "update:name", value: state.name + "~" });
  };

  const handleUpdateAge = () => {
    dispatch({ type: "update:age", value: state.age + 1 });
  };

  return (
    <>
      <div>姓名:{state.name}</div>
      <div>年龄:{state.age}</div>
      <button onClick={handleUpdateName}>更新姓名</button>
      <button onClick={handleUpdateAge}>更新年龄</button>
    </>
  );
}
```

### 8.useContext

useContext 可以帮助我们实现依赖注入，实现后代组件获取祖先组件的数据。

#### 基本使用

1.创建 Context 对象

2.在祖先组件（提供者）中使用 Context.Provider 来提供数据

3.后代组件（消费者）使用 useContext 获取祖先组件注入的数据

下面是一个示例：

1.首先使用 React.createContext 来创建一个上下文对象，需要传递一个参数作为提供者
的默认值。

```ts
const MyContext = React.createContext({ name: "李四", age: 12 });
```

2.祖先组件使用 Context.Provider 组件，并通过 value 属性来初始化数据。

Context.Provider 组件可以嵌套使用，后代组件使用 useContext 时以最近的
Context.Provider 组件为准。

```jsx
const Father = () => {
  return (
    <MyContext.Provider value={{ name: "Mark", age: 20 }}>
      <Son></Son>
    </MyContext.Provider>
  );
};
```

3.后代组件使用 useContext 来获取数据。

useContext 都是根据上层组件来寻找提供者的，若未找到提供者，则 useContext 获取到
的数据就是默认值。如果 context 中的数据发生变化后，React 会自动重新渲染读取
context 的组件。

```jsx
const Son = () => {
  const providerData = useContext(MyContext);
  return (
    <div>
      <h2>Son组件</h2>
      <div>注入的数据为:{JSON.stringify(providerData)}</div>
      <Grandson />
    </div>
  );
};
```

#### 抽离 Provider 组件

将 Context.Provider 组件等提供者抽离出来封装成组件，代码会更美观。

```tsx
import React, { PropsWithChildren, useContext, useState } from "react";

// context对象
const MyContext = React.createContext<{
  count: number;
  setCount: Function;
} | null>(null);

// 封装的Provider组件
const MyProvider = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState(0);
  return (
    <MyContext.Provider value={{ count, setCount }}>
      {children}
    </MyContext.Provider>
  );
};

const Father = () => {
  return (
    <MyProvider>
      <Son />
    </MyProvider>
  );
};

const Son = () => {
  const ctx = useContext(MyContext);
  return (
    <>
      <h2>{ctx!.count}</h2>
      <button onClick={() => ctx!.setCount((pre) => pre + 1)}>更新</button>
    </>
  );
};

export default function App() {
  return <Father />;
}
```

#### 嵌套使用 Provider

可以嵌套使用相同的 Provider，后代组件总是寻找最近的 Provider。

这里的示例是 App-->Father-->MyProvider-->Son-->MyProvider-->Grandson

```tsx
import React, { PropsWithChildren, useContext, useState } from "react";

// context对象
const MyContext = React.createContext<{
  count: number;
  setCount: Function;
} | null>(null);

// 封装的Provider组件
const MyProvider = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState(0);
  return (
    <MyContext.Provider value={{ count, setCount }}>
      {children}
    </MyContext.Provider>
  );
};

const Father = () => {
  return (
    <MyProvider>
      <Son />
    </MyProvider>
  );
};

const Son = () => {
  const ctx = useContext(MyContext);
  return (
    <>
      <h2>Son组件</h2>
      <h2>{ctx?.count}</h2>
      <button onClick={() => ctx!.setCount((pre) => pre + 1)}>更新</button>
      <hr />
      <MyProvider>
        <GrandSon />
      </MyProvider>
    </>
  );
};

const GrandSon = () => {
  const ctx = useContext(MyContext);

  return (
    <>
      <h3>GrandSon组件</h3>
      <h3>{ctx?.count}</h3>
      <button onClick={() => ctx!.setCount((pre) => pre + 1)}>更新</button>
    </>
  );
};

export default function App() {
  return <Father />;
}
```

#### useContext+useReducer 结合

useContext+useReducer 结合可以实现类似于全局状态管理的效果。

useReducer 提供状态管理，useContext 实现后代组件访问或更新仓库中的状态。

```tsx
import {
  PropsWithChildren,
  Reducer,
  createContext,
  useContext,
  useReducer,
} from "react";

// reducer
const personReducer: Reducer<
  { username: string; age: number },
  | {
      type: "update:username";
      data: string;
    }
  | {
      type: "update:age";
      data: number;
    }
> = (state, { type, data }) => {
  switch (type) {
    case "update:username":
      return { ...state, username: data };
    case "update:age":
      return {
        ...state,
        age: data,
      };
    default:
      throw Error("Cannot find this type.");
  }
};

// context
const PersonContext = createContext<any>({});

// provider
const PersonProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(personReducer, {
    username: "Mark",
    age: 12,
  });
  return (
    <PersonContext.Provider value={{ state, dispatch }}>
      {children}
    </PersonContext.Provider>
  );
};

const Child = () => {
  const context = useContext(PersonContext);
  const onHandleClick = () => {
    context.dispatch({ type: "update:age", data: context.state.age + 1 });
  };
  return (
    <div>
      <h1>{JSON.stringify(context.state)}</h1>
      <button onClick={onHandleClick}>更新年龄</button>
    </div>
  );
};

export default function App() {
  return (
    <PersonProvider>
      <Child />
    </PersonProvider>
  );
}
```

#### 总结

useContext 一般作为依赖注入来使用，可以用于后代组件访问祖先组件提供的数据。不过
需要注意的是只要注入的数据发生任何变化都会重新渲染所有调用
了`useContext(AuthContext)` 的所有组件，即时某个组件只是通过上下文访问了未发生更
新的数据。

### 9.memo（React 函数）

useMemo 可用减少不必要的组件渲染。

#### 场景

我们都知道 react 组件重新渲染时会执行一次对应组件的函数，函数体内部的所有代码都
会执行一次，就可以得到最新状态的组件。

但有的时候有些渲染是完全没有必要的，例如下面的例子：

```tsx
import { useEffect, useState } from "react";

const Count = () => {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleAddCount = () => setCount((pre) => pre + 1);
  const handleToggleFlag = () => setFlag((pre) => !pre);
  return (
    <>
      <h1>count组件</h1>
      <div>count的值:{count}</div>
      <button
        onClick={handleAddCount}
        disabled={flag}>
        count自增
      </button>
      <button onClick={handleToggleFlag}>{flag ? "可用" : "禁用"}</button>
      <hr />
      <Son count={count} />
    </>
  );
};

const Son = ({ count }: { count: number }) => {
  useEffect(() => {
    console.log("Son组件重新渲染完成!");
  });
  return (
    <>
      <h2>Son组件</h2>
      <div>count的值为{count}</div>
    </>
  );
};
```

Count 组件是一个简单的计数器组件，而内部嵌套了 Son 组件，Son 组件依赖与 Count 组
件的 count 变量，每次 Count 组件的 count 状态更新时会渲染一次 Son，这样 Son 组件
也能渲染出最新的结构，这很正常。但当 Count 组件的 flag 状态更新时，也会导致重新
渲染 Son 组件，但 Son 组件明显不依赖 flag 变量，按照道理到说 flag 的更新与 Son
组件完全没有任何关系，就应该不执行的。为了优化这种不必要的重新渲染，React 提供了
memo 函数。

#### 使用方式

`memo` 函数可以创建一个组件，允许你的组件在 props 没有改变的情况下跳过重新渲染。
他的工作原理就是每次重新渲染时，**在默认情况下他会把新旧 props 中的每一个属性一
一通过 Object.is 来进行比较（浅比较）**，如果都没有变化则跳过渲染，有就会重新渲
染。如果你要自定义比较的规则，可以传入第二个参数，可以自定义校验函数，返回布尔值
决定是否重新渲染。真说明相同不渲染，假说明不相同，需要重新渲染。

```js
React.memo(FunctionComponent, (preProps, nextProps) => {
  // some equal check action
  return boolean;
});
```

#### 示例

```tsx
import { useEffect, useState, memo } from "react";

const Count = () => {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleAddCount = () => setCount((pre) => pre + 1);
  const handleToggleFlag = () => setFlag((pre) => !pre);
  return (
    <>
      <h1>count组件</h1>
      <div>count的值:{count}</div>
      <button
        onClick={handleAddCount}
        disabled={flag}>
        count自增
      </button>
      <button onClick={handleToggleFlag}>{flag ? "可用" : "禁用"}</button>
      <hr />
      <Son count={count} />
    </>
  );
};

const Son = memo(({ count }: { count: number }) => {
  useEffect(() => {
    console.log("Son组件重新渲染完成!");
  });
  return (
    <>
      <h2>Son组件</h2>
      <div>count的值为{count}</div>
    </>
  );
});

export default function App() {
  return <Count />;
}
```

#### 总结

React.memo 可以创建一个可以被缓存的组件，当需要重新渲染被缓存的组件时，他会对比
新旧 props 是否有更新，若无更新则无需重新渲染，有则重新渲染。

### 10.useMemo

useMemo 可以实现类似于**计算属性**的功能，只有当依赖性变化时才会执行一次回调。

​ 比如说在组件中有一次函数**callback**调用，这个函数内部会依赖于状态 A，状态 A
变化了重新渲染函数的同时执行了**callback**函数，这是没问题的。但组件内的状态 B
更新了，会重新渲染组件，并且也会重新执行**callback**函数，但我们都知
道**callback**的执行在大多数情况下都是是毫无意义的，因为状态 A 并没有更新。这些
问题其实都是因为 react 的组件在重新渲染时会执行整个渲染函数造成的，为了解决这个
问题就有了**useMemo。**

useMemo 的使用场景：

1. 缓存某个计算结果

2. 缓存某个 JSX 节点（当然，你也可以使用 memo 来实现相同的功能）

#### 基本使用

```jsx
useMemo(callback, deps);
```

callback：一个回调函数。

deps：依赖项，每次重新渲染时，会通过新旧依赖项对比来判断是否需要重新渲染。若相同
会跳过 callback 执行，不相同则会执行 callback。callback 执行时机是同步的，每次重
新 render 时按照代码顺序同步执行 callback。

```tsx
const [count, setCount] = useState(0);
const [flag, setFlag] = useState(false);

const formatCount = useMemo(() => {
  console.log("调用了formatCount");
  return `今天花费了${count}$`;
}, [count]);
```

#### 困惑

我无法理解的就是 useMemo 的第二个的参数（依赖项），他是如何在下一次重新执行时对
新旧依赖项进行比较的呢？

我的猜想，useMemo 每次执行不是都会传一个依赖项数组吗，例如上述案例依赖 count 变
量，其实依赖项就是一个数组`[0]`，而下一次重新渲染时，会调用该函数，所以也会执行
useMemo，但是本次执行时 count 变量已经被赋值为 1 了，所以本次传入依赖项的值就
是`[1]`，由
于`oldDeps[0]!==newDeps[0]（REACT其实是通过Object.is通过索引逐个比较每个依赖项）`，
所以 react 就发现了不同，从而执行回调函数。

#### 场景

##### 1.缓存计算的结果

下面的 verySlowCallback 就假定是一个非常复杂的计算，而使用 useMemo 可以缓存计算
结果，只有在 count 更新了才会重新调用而不是每次渲染都执行。

```tsx
const [count] = useState(0);
const verySlowCallback = () => {
  // 非常复杂的计算结果...
  return count * 3 + 5;
};
const callback = useMemo(verySlowCallback, [count]);
// 获取复杂结果....
callback();
```

##### 2.缓存组件

如果组件的 props 没有任何更新，我们也可以缓存该组件，而不是重新渲染组件。

当然这种缓存并不会影响子组件自身状态的更新，若子组件自身的状态更新依旧会重新渲染
。

```tsx
import { useEffect, useState, memo, useMemo } from "react";

const Count = () => {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  const handleAddCount = () => setCount((pre) => pre + 1);
  const handleToggleFlag = () => setFlag((pre) => !pre);
  // 缓存child组件，只有count更新才会重新执行一次Child函数
  const ChildMemo = useMemo(() => <Child count={count} />, [count]);
  return (
    <>
      <h1>count组件</h1>
      <div>count的值:{count}</div>
      <button
        onClick={handleAddCount}
        disabled={flag}>
        count自增
      </button>
      <button onClick={handleToggleFlag}>{flag ? "可用" : "禁用"}</button>
      <hr></hr>
      {ChildMemo}
    </>
  );
};

const Child = ({ count }: { count: number }) => {
  console.log("渲染Child组件!");
  return (
    <>
      <h2>Child组件</h2>
      <div>count的值:{count}</div>
    </>
  );
};
```

##### v-once（依赖项为空数组）

由于是根据依赖项数组来判断是否重新调用 callback，如果传入一个空数组，其结果就是
callback 只会在首次渲染时调用。

#### 总结

useMemo 可以缓存一个函数的执行结果。当需要重新组件时，useMemo 会通过传入的新旧依
赖项来决定是否需要重新执行函数获取最新结果，通常可以作为计算属性、缓存 JSX 节点
来使用。

### 11.useCallback

`useCallback` 是一个允许你在多次渲染中缓存函数的 React Hook。useCallback 可以为
你缓存一个函数，而不是每次重新渲染就创建一个新函数。

```js
const cachedFn = useCallback(fn, dependencies);
```

- fn 需要缓存的函数，在重新渲染时会检查新旧依赖项是否一致（通过 Object.is 来检查
  每个依赖项是否一致），一致则不重新定义函数，不一致则新生成一个函数。
- dependencies 依赖项。
- cachedFn 就是缓存后的函数。

#### 验证函数是否被重新定义了

​ 以下例子可以证明一个函数是否会在每次渲染时就重新定义：

```tsx
import { useEffect, useState, useRef } from "react";

const Count = () => {
  const [count, setCount] = useState(0);
  const handleAddCount = () => setCount((pre) => pre + 1);
  // 保存handleAddCount的引用
  const callbackRef = useRef(handleAddCount);
  // 输出
  console.log(callbackRef.current === handleAddCount);
  // 不相同就更新引用
  if (callbackRef.current !== handleAddCount) {
    callbackRef.current = handleAddCount;
    console.log("两个fn不相同，要重新赋值");
  }
  return (
    <>
      <h1>count组件</h1>
      <div>count的值:{count}</div>
      <button onClick={handleAddCount}>count自增</button>
    </>
  );
};
```

可以看到每次渲染组件都会创建一个新函数，定义一个函数也会花费时间和空间，所以需要
用 useCallback 来缓存一个函数。

#### 场景

##### 永不更新

```tsx
import { useState, useRef, useCallback } from "react";

const Count = () => {
  const [count, setCount] = useState(0);
  // 回调只会在首次渲染时定义
  const handleAddCount = useCallback(() => setCount((pre) => pre + 1), []);
  // 保存handleAddCount的引用
  const callbackRef = useRef(handleAddCount);
  console.log(callbackRef.current === handleAddCount);
  return (
    <>
      <h1>count组件</h1>
      <div>count的值:{count}</div>
      <button onClick={handleAddCount}>count自增</button>
    </>
  );
};

export default function App() {
  return <Count />;
}
```

##### 依赖项更新才重新定义函数

依赖项更新重新定义函数可以让 react 访问到最新的组件状态。也可以减少不必要的性能
开销

```tsx
import { useState, useRef, useCallback } from "react";

const Count = () => {
  const [count, setCount] = useState(0);
  const handleAddCount = useCallback(() => setCount((pre) => pre + 1), [count]);
  // 保存handleAddCount的引用
  const callbackRef = useRef(handleAddCount);
  console.log(callbackRef.current === handleAddCount);
  return (
    <>
      <h1>count组件</h1>
      <div>count的值:{count}</div>
      <button onClick={handleAddCount}>count自增</button>
    </>
  );
};

export default function App() {
  return <Count />;
}
```

##### 父子组件通信时减少重复渲染

在子向父组件通信时，我们通常会让父组件定义并向子组件传递一个更新函数来更新父组件
状态的。由于我们向子组件传递了 props，而父组件在更新时会导致函数的重新定义从而导
致子组件的不必要渲染。

即使用 memo 包裹了子组件也没用，memo 的功能就是比较 props 的更新决定是否重新渲染
，而没有被缓存的组件只要重新渲染就会被重新定义，props 也就会更新，子组件也就会被
重新渲染。

```tsx
import { memo, useCallback, useState } from "react";

const Count = () => {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  const handleAddCount = useCallback(() => {
    setCount((pre) => pre + 1);
  }, []);

  const handleReset = useCallback(() => {
    setCount(0);
  }, []);

  // 若不被缓存，则每次count更新都会新建该函数，而该函数又会被注入到
  // const handleReset = () => {
  //   setCount(0);
  // };

  const handleToggleFlag = useCallback(() => {
    setFlag((pre) => !pre);
  }, []);

  return (
    <>
      <h1>Count组件</h1>
      <div>count的值:{count}</div>
      <button
        disabled={flag}
        onClick={handleAddCount}>
        +1
      </button>
      <button
        disabled={flag}
        onClick={handleReset}>
        重置
      </button>
      <button onClick={handleToggleFlag}>{flag ? "启用" : "禁用"}</button>
      <hr></hr>
      <Child
        handleReset={handleReset}
        flag={flag}
      />
    </>
  );
};

const Child = memo((props: { flag: boolean; handleReset: () => void }) => {
  console.log("要渲染Child组件咯");
  return (
    <>
      <h2>Child组件</h2>
      <div>禁用状态：{String(props.flag)}</div>
      <button onClick={props.handleReset}>重置count</button>
    </>
  );
});

export default function App() {
  return <Count />;
}
```

##### 缓存子组件？

不可行，我们要知道 useCallback 是缓存函数的定义而不是缓存函数的执行结果，要想缓
存函数的结果请使用 useMemo 或 memo。

#### 困惑

使用 useCallback 可以缓存一个函数，若依赖项更新了就会重新定义一个新的函数。我的
问题是函数体都是一样的无论再怎么重新创建，函数功能也是一样的，我认为是完全无意义
的啊。

思考了下我认为从函数体一致、函数功能一致的角度出发确实是没有问题的。但是**新创建
的函数他所处的上下文不一样**，重新定义函数可以让函数在调用时，访问到组件最新的状
态，他可以解决**坑：1 的问题**。

解决坑：1 的问题

我们来看看如何解决的，我通过 useRef 的特性来保存最新的函数，通过 useCallback 即
时的创建新函数并保存在 ref 中，从而确保在**setInterval**中组件永远都可以访问到最
新的状态，而不是访问闭包中的旧状态。

```tsx
import { useCallback, useEffect, useRef, useState } from "react";

export default () => {
  const [time, setTime] = useState(0);
  const timerId = useRef<number | null>(null);

  useEffect(() => {
    return stopTime;
  }, []);

  const startTime = () => {
    stopTime();
    timerId.current = setInterval(callback.current, 1000);
  };

  // 每次time更新都会重新定义函数
  const addTime = useCallback(() => {
    setTime(time + 1);
  }, [time]);

  const callback = useRef(addTime);
  // 每次调用setTime都会获取最新的addTime
  callback.current = addTime;

  const stopTime = () => {
    if (timerId.current !== null) {
      clearInterval(timerId.current);
      console.log("清除定时器");
      timerId.current = null;
    }
  };

  const resetTime = () => {
    stopTime();
    setTime(0);
  };

  return (
    <>
      <h1>开始了{time}秒</h1>
      <button onClick={startTime}>开始</button>
      <button onClick={stopTime}>停止</button>
      <button onClick={resetTime}>重置</button>
    </>
  );
};
```

#### 总结

useCallback 可以缓存一个函数直到依赖项更新。其作用：

1. 少创建函数，节约内存和时间。
2. 可以访问到最新的组件状态。重新定义函数会让函数在执行时所处的执行上下文不一样
   ，从而可以通过当前作用域链访问到最新的状态。

### 12.useTransition

useTransition 可以在不阻塞 UI 的情况下更新一个 React 组件的状态。

例如某个我通过条件控制响应式的控制某个组件的显隐，但这个组件在初次渲染时非常耗时
，如果说在渲染该组件时（条件更新导致该组件的显示），用户进行了其他 UI 交互（如事
件交互等）会导致这些 UI 的交互处理被阻塞。如果不想被阻塞可以尝试使用
useTransition 让组件显隐的状态在低优先级的情况下更新。这样每当显隐状态更新时，如
果有其他任务进入队列，可以优先处理该队列以响应用户操作。

#### 基础使用

```ts
const [isPending, startTransition] = useTransition();
```

- **isPengding**：一个布尔值，代表当前是否有正在处理的**startTransition**
- **setTransition**：一个函数，可以在调用时传入一个函数，将状态更新的操作放在这
  个函数中，代表此函数里面的更新都是低优先级的。

#### 场景

##### 让某次更新处于低优先级不阻塞 UI

在下面的例子中，通过标签页切换渲染 Movie 组件时，由于需要渲染特别多的 DOM 所以会
卡顿一段时间，在此期间用户的任何操作都得不到任何响应直到 Movie 组件渲染结束，这
就是因为浏览器是单线程，渲染进程和 JS 进程的运行是互斥的，只要渲染进程在执行，JS
进程就不会工作。

###### 更改前

```tsx
import { useCallback, useState, useTransition } from "react";

const Movie = () => {
  const list = Array.from({ length: 300000 }).map((_, index) => ({
    id: index,
    name: "复仇者联盟 " + (index + 1),
  }));
  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

const Home = () => {
  return <h1>首页</h1>;
};

const About = () => {
  return <h1>关于</h1>;
};

const MyPage = () => {
  const [tab, setTab] = useState("/home");
  const [isPending, setTransition] = useTransition();

  const handleUpdate = useCallback((path: string) => {
    setTab(path);
  }, []);

  return (
    <>
      <button onClick={() => handleUpdate("/home")}>home</button>
      <button onClick={() => handleUpdate("/movie")}>moive</button>
      <button onClick={() => handleUpdate("/about")}>about</button>
      <hr></hr>
      {tab === "/home" && <Home />}
      {tab === "/movie" && <Movie />}
      {tab === "/about" && <About />}
    </>
  );
};

export default function App() {
  return <MyPage></MyPage>;
}
```

###### 更改后

我们使用 setTransition 让 tab 更新变为低优先级，从而可以让浏览器响应其他操作。只
要是因 tab 更新产生的重新渲染，都可以其他任务被打断。

```diff
import { useCallback, useState, useTransition } from "react";

const Movie = () => {
  const list = Array.from({ length: 300000 }).map((_, index) => ({
    id: index,
    name: "复仇者联盟 " + (index + 1),
  }));
  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

const Home = () => {
  return <h1>首页</h1>;
};

const About = () => {
  return <h1>关于</h1>;
};

const MyPage = () => {
  const [tab, setTab] = useState("/home");
  const [isPending, setTransition] = useTransition();

  const handleUpdate = useCallback((path: string) => {
+    setTransition(() => {
      setTab(path);
+    });
  }, []);

  return (
    <>
      <button onClick={() => handleUpdate("/home")}>home</button>
      <button onClick={() => handleUpdate("/movie")}>moive</button>
      <button onClick={() => handleUpdate("/about")}>about</button>
      <hr></hr>
      {tab === "/home" && <Home />}
      {tab === "/movie" && <Movie />}
      {tab === "/about" && <About />}
    </>
  );
};

export default function App() {
  return <MyPage></MyPage>;
}

```

#### 工作机制

##### 1.startTransition 只能处理同步

1.**startTransition**传入的函数必须是同步的函数，React 会立即执行该函数，并把该
函数执行时引发的更新都标记为低优先级去处理。若在执行函数期间有异步执行的任务，则
这些任务引发的更新操作都不会被标记为低优先级操作。例如：

```js
startTransition(() => {
  setTimeout(setState, 1000, 10);
});
```

##### 2.**标记为 transition 的状态更新将会被其他状态更新打断**

如果 transition 在更新图表组件时，在重新渲染过程中，页面中的输入框被输入内容了
，React 会优先处理输入框的任务，之后再重新启动对图表的渲染工作。

##### 3.**transition 不能处理文本框输入**（重点）

因为低优先级的更新可能会导致某次状态的丢失。如果要处理文本框的优化，请使
用**useDeferredValue**。

下面案例就是在输入框中输入内容就会以内容来渲染大量的 DOM，如果不使
用**transition**会导致输入一次就会卡断一次，所以我们决定使用**transition**来让状
态更新的重新渲染标记为低优先级，浏览器才能持续响应用户的操作。但当我快速的输入内
容时，会发现某些字符丢失了，就好像状态更新被节流了一样。

```tsx
// 只要输入内容就以此内容渲染1000个DOM
import { FormEvent, useCallback, useState, useTransition } from "react";

const Input = ({
  value,
  onUpdateValue,
}: {
  value: string;
  onUpdateValue: (value: string) => void;
}) => {
  const [isPending, startTransition] = useTransition();
  const handleInput = (e: FormEvent) => {
    startTransition(() => {
      onUpdateValue((e.target as HTMLInputElement).value);
    });
  };

  return (
    <input
      value={value}
      onInput={handleInput}></input>
  );
};

const List = ({ value }: { value: string }) => {
  if (value)
    return (
      <ul>
        {Array.from({ length: 10000 })
          .fill(value)
          .map((item, index) => (
            <li key={index}>
              {item}
              {index + 1}
            </li>
          ))}
      </ul>
    );
  else return <div>空</div>;
};

export default function App() {
  const [keywords, setKeywords] = useState("");

  const handleUpdateKeywords = useCallback(
    (value: string) => setKeywords(value),
    []
  );
  return (
    <>
      <Input
        value={keywords}
        onUpdateValue={handleUpdateKeywords}></Input>
      {keywords}
      <List value={keywords} />
    </>
  );
}
```

其实就是因为**transition**的工作机制是为了优先响应用户操作而打断**transition**中
的更新任务，在本案例中 keywords 的初始状态为 A，若用户键入内容触发**input**事件
（此时 keywords 为状态 B），执行**handleInput**，使用**transition**来标记更
新**keywords**状态的操作为低优先级，由于 keywords 的更新会影响 Input、List 组件
的重新渲染，所以就以低优先级的方式来重新渲染 Input、List 组件。**但是在本次渲染
过程中，又触发了输入框的 input 事件，由于上一次低优先级的更新（状态 B）渲染未完
成，也就是 Input 元素的 value 属性并没有得到更新（依旧是状态 A 的值），所以会导
致再次触发 Input 事件时会以状态 A 的值来覆盖更新**，最终才会导致 B 状态被忽略了
。

**（省流版）这其实就是因为上一次渲染未完成，再一次触发事件会导致视图未即时更新，
从而会以旧的视图来更新状态**。

我们不妨可以通过 useEffect 验证一下，当状态更新时，组件是否得到了重新渲染。我们
会发现当快速的键入内容时，若增加了几个字符，就会打印几次渲染完成。这就说明了快速
键入内容时，由于组件渲染不断的被打断，从而导致不能正确的更新视图，所以不能获取到
正确的结果。

```diff
export default function App() {
+  useEffect(() => {
+    console.log("渲染完成");
+  });
  const [keywords, setKeywords] = useState("");

  const handleUpdateKeywords = useCallback(
    (value: string) => setKeywords(value),
    []
  );
  return (
    <>
      <Input
        value={keywords}
        onUpdateValue={handleUpdateKeywords}></Input>
      {keywords}
      <List value={keywords} />
    </>
  );
}
```

#### 总结

useTransition 可以让由某些状态更新引发重新渲染的任务标记为低优先级任务，可以被中
断的，从而优先响应其他任务，当其他任务完成时，再来处理该渲染任务。

### 13.useDeferredValue

`useDeferredValue` 是一个 React Hook，可以让你延迟更新 UI 的某些部分。

```js
const deferredValue = useDeferredValue(value);
```

- deferredValue 一个会被延迟更新的值。
- value 一个变量。

使用起来的感觉就是一个防抖或节流函数？当使用 setState 更新时，他可以基于客户端性
能情况来决定更新**deferredValue**的延迟时间。同时**deferredValue**也会被标记为低
优先级的更新，只要依赖于**deferredValue**的组件都会被重新渲染，并且这些重新渲染
任务是可以被打断的。

> 此外，与防抖或节流不同，`useDeferredValue` 执行的延迟重新渲染默认是可中断的。
> 这意味着，如果 React 正在重新渲染一个大型列表，但用户进行了另一次键盘输入
> ，React 会放弃该重新渲染，先处理键盘输入，然后再次开始在后台渲染。相比之下，防
> 抖和节流仍会产生不顺畅的体验，因为它们是阻\*的：它们仅仅是将渲染阻塞键盘输入的
> 时刻推迟了。
>
> 如果你要优化的工作不是在渲染期间发生的，那么防抖和节流仍然非常有用。例如，它们
> 可以让你减少网络请求的次数。你也可以同时使用这些技术。

#### 使用

```tsx
// 只要输入内容就以此内容渲染1000个DOM
import {
  FormEvent,
  memo,
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
} from "react";

const Input = ({
  value,
  onUpdateValue,
}: {
  value: string;
  onUpdateValue: (value: string) => void;
}) => {
  const handleInput = (e: FormEvent) => {
    onUpdateValue((e.target as HTMLInputElement).value);
  };

  return (
    <input
      value={value}
      onInput={handleInput}></input>
  );
};

const List = memo(({ value }: { value: string }) => {
  if (value)
    return (
      <ul>
        {Array.from({ length: 10000 })
          .fill(value)
          .map((item, index) => (
            <li key={index}>
              {item}
              {index + 1}
            </li>
          ))}
      </ul>
    );
  else return <div>空</div>;
});

export default function App() {
  useEffect(() => {
    console.log("渲染完成");
  });
  const [keywords, setKeywords] = useState("");

  // 延迟版本的keywords
  const defKeywords = useDeferredValue(keywords);

  const handleUpdateKeywords = useCallback(
    (value: string) => setKeywords(value),
    []
  );

  return (
    <>
      <Input
        value={keywords}
        onUpdateValue={handleUpdateKeywords}></Input>
      {keywords}
      <List value={defKeywords} />
    </>
  );
}
```

#### 总结

1. useDeferredValue 可以创建一个状态副本，当状态本身更新时，会根据用户客户端性能
   来延迟更新副本
2. 当副本更新引发组件重新渲染的任务是低优先级的，是可以被中断的，当其他任务处理
   完成后，再来重新执行该任务。

### 14.custom-hooks

​ 封装自定义钩子，可以将独立业务逻辑的代码抽离出来，供组件复用逻辑。hooks 一般就
只需要处理逻辑，而不是返回一段 ui 结构。

示例：

响应式的获取鼠标在视口的偏移量。

```jsx
import { useEffect, useState } from "react";

function usePointOffset() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const handleMousemove = (e: MouseEvent) => {
    setOffset({
      x: e.clientX,
      y: e.clientY,
    });
  };
  useEffect(() => {
    window.addEventListener("mousemove", handleMousemove);
    return () => {
      console.log("移除事件监听");
      window.removeEventListener("mousemove", handleMousemove);
    };
  }, []);
  return offset;
}

export default usePointOffset;
```

## 3.通信方式

## 4.插槽

## 5.内置组件

### Fragment

`<Fragment>` 通常使用 `<>...</>` 代替，它们都允许你在不添加额外节点的情况下将子
元素组合。

说白了 Fragment 组件，可以让一个 JSX 节点拥有多个根节点。

不过<></>不能接收任何属性，Fragment 可以接收 key 属性，用于列表渲染时通过 key 值
提升渲染效率。

### StrictMode

`<StrictMode>` 帮助你在开发过程中尽早地发现组件中的常见错误。

StrictMode 会对组件做出以下的额外处理：

1. 组件会额外的重新渲染一次
2. 组件会额外运行一次 Effect 中的回调（由于额外的重新渲染）
3. 查找是否使用了过时的 API

### Suspence

`<Suspense>` 允许在子组件完成加载前展示后备方案。

```
<Suspense fallback={<Loading />}>

  <SomeComponent />

</Suspense>
```

> **只有启用了 Suspense 的数据源才会激活 Suspense 组件**，它们包括：
>
> - 支持 Suspense 的框架如
>   [Relay](https://relay.dev/docs/guided-tour/rendering/loading-states/) 和
>   [Next.js](https://nextjs.org/docs/getting-started/react-essentials)。
> - 使用 [`lazy`](https://zh-hans.react.dev/reference/react/lazy) 懒加载组件代码
>   。
> - 使用 [`use`](https://zh-hans.react.dev/reference/react/use) 读取 Promise 的
>   值。
>
> Suspense **无法** 检测在 Effect 或事件处理程序中获取数据的情况。
>
> 在上面的 `Albums` 组件中，正确的数据加载方法取决于你使用的框架。如果你使用了支
> 持 Suspense 的框架，你会在其数据获取文档中找到详细信息。
>
> 目前尚不支持在不使用固定框架的情况下进行启用 Suspense 的数据获取。实现支持
> Suspense 数据源的要求是不稳定的，也没有文档。React 将在未来的版本中发布官方
> API，用于与 Suspense 集成数据源。

#### 1.使用懒加载

只有在需要该组件时才会加载此组件

```tsx
import { Suspense, lazy } from "react";

const Count = lazy(() => import("./example/lazy"));

export default () => {
  return (
    <Suspense fallback={<div>加载中..</div>}>
      <Count></Count>
    </Suspense>
  );
};
```

## 6.React 函数

#### lazy

`lazy` 能够让你在组件第一次被渲染之前延迟加载组件的代码。

```
const SomeComponent = lazy(load)
```

示例

```tsx
import { Suspense, lazy } from "react";

const Count = lazy(() => import("./example/lazy"));

export default () => {
  return (
    <Suspense fallback={<div>加载中..</div>}>
      <Count></Count>
    </Suspense>
  );
};
```

## 7.CSS

在 react 中编写 css 需要注意，若直接引入 css 是会导致样式的污染，而组件化开发需
要单独的为每个组件编写 css，但由于 css 是全局的就会有可能导致类名等冲突（比如 A
组件使用了类名 person，并通过选择器编写了样式，而另一个开发人员没注意新加了一个
类名为 person 的选择器，就会导致样式冲突了）。

如何解决呢？先人开拓了：

### 1.统一 namespaces 来隔离每个组件的样式。

例如组件 A 给根节点添加 class`comA`，组件 B 给根节点添加 class`comB`，在编写选择
器时可以 `.comA .card {...}`给组件 A 单独添加样式，`.comB .card {...}`给组件 B
单独添加样式而不会导致冲突。

### 2.CSS 模块化

模块化 css 似乎是比较好的选择了，甚至支持媒体查询、动画...，在脚手架中搭建的项目
我们甚至不需要任何配置就可以使用。

A 组件

```tsx
// A.tsx
import { useCallback, useState } from "react";
import A from "./A.module.css";

export default function Count() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    setCount((pre) => pre + 1);
  }, []);
  return (
    <div className={A.count}>
      <h1>Count的值为:{count}</h1>
      <button onClick={handleClick}>增加count</button>
    </div>
  );
}
```

```css
// A.module.css
.count {
  color: red;
}

.count:hover {
  animation: Move 1s 1 forwards;
}

@media screen and (max-width: 500px) {
  .count {
    font-size: 20px;
  }
}

@keyframes Move {
  to {
    color: aqua;
  }
}
```

B 组件

```tsx
import { useCallback, useState } from "react";
import B from "./B.module.css";

export default function Count() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    setCount((pre) => pre + 1);
  }, []);
  return (
    <div className={B.count}>
      <h1>Count的值为:{count}</h1>
      <button onClick={handleClick}>增加count</button>
    </div>
  );
}
```

```css
// B.module.css
.count {
  color: yellow;
}

.count:hover {
  animation: Move 0.3s 1 forwards;
}

@media screen and (max-width: 500px) {
  .count {
    font-size: 12px;
  }
}

@keyframes Move {
  to {
    color: blue;
  }
}
```

### 3.CSS IN JS

可以使
用[styled-components](https://styled-components.nodejs.cn/)、[styils](https://styils.github.io/styils/)都
是比较好的现成解决方案。主要讲一下 styled-components，styils 我已经用过了。

#### 安装

```sh
npm i styled-components
```

#### 基本使用

```tsx
import styled, { css } from "styled-components";

const Button = styled.button({
  background: "transparent",
  borderRadius: "3px",
  border: "2px solid #BF4F74",
  color: "#BF4F74",
  margin: "0 1em",
  padding: "0.25em 1em",
  "&:hover": {
    color: "blue",
  },
});

export default () => {
  return <Button>asd</Button>;
};
```

#### 接受属性

可以让定义的组件接收某些属性，并在某些时候让特殊样式生效。

通过 css 函数可以覆盖或增加属性，通过插入函数可以根据条件设置某些属性。

注意：接受的自定义属性必须是以$开头，否则会出现警报。

##### 基本使用

```tsx
import styled from "styled-components";

// 传入对象
const Button = styled.button<{ $primary?: boolean }>(
  {
    padding: "10px",
  },
  (props) => {
    return {
      color: props.$primary ? "red" : "#000",
    };
  }
);

// 传入字符串
const Input = styled.input<{ $primary?: boolean }>`
  border: 1px solid;
  border-color: ${(props) => (props.$primary ? "red" : "#000")};
`;

export default () => {
  return (
    <>
      <Button $primary>哈哈哈</Button>
      <Input $primary></Input>
    </>
  );
};
```

##### 示例

```tsx
import { useCallback, useState } from "react";
import styled, { css } from "styled-components";

// 声明一个$primary的自定义属性，在使用该组件时可以传入
const Button = styled.button<{ $primary?: boolean }>`
  background: transparent;
  border-radius: ${(props) =>
    props.$primary ? "3px" : "5px"}; //根据条件设置属性值
  border: 2px solid #bf4f74;
  color: #bf4f74;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  // 根据条件增加或覆盖属性
  ${(props) =>
    props.$primary &&
    css`
      background: #bf4f74;
      color: white;
    `}
`;

const Container = styled.div`
  text-align: center;
`;

export default () => {
  const [flag, setFlag] = useState(true);
  const toggle = useCallback(() => setFlag((pre) => !pre), []);
  return (
    <Container>
      <Button onClick={toggle}>Normal Button</Button>
      <Button $primary={flag}>Primary Button</Button>
    </Container>
  );
};
```

#### 动画

```tsx
import styled, { keyframes } from "styled-components";

const Move = keyframes({
  from: {
    transform: "rotate(0deg)",
  },
  to: {
    transform: "rotate(360deg)",
  },
});

const Button = styled.button`
  &:hover {
    animation: ${Move} 0.3s infinite linear;
  }
`;

export default () => {
  return <Button>哈哈</Button>;
};
```

#### 媒体查询

在使用媒体查询时可以省略 screen and 直接书写@media (....)

```tsx
import styled from "styled-components";

const Box = styled.div({
  textAlign: "center",
  "@media (max-width:600px)": {
    textAlign: "left",
  },
});

export default () => {
  return <Box>年后</Box>;
};

// 或
import styled from "styled-components";

const Box = styled.div({
  textAlign: "center",
  "@media screen and (max-width:600px)": {
    textAlign: "left",
  },
});

export default () => {
  return <Box>年后</Box>;
};
```

#### 主题化

下面的案例是一个深色浅色主题切换的功能。

```tsx
import { useState } from "react";
import styled, { ThemeProvider, useTheme } from "styled-components";

const Button = styled.button(
  {
    padding: "5px 10px",
    border: "none",
    borderRadius: "3px",
  },
  (props) => {
    return {
      backgroundColor: props.theme.mainBg,
      color: props.theme.mainColor,
    };
  }
);

const theme = {
  mainBg: "#409eff",
  mainColor: "#fff",
};

const darkTheme = {
  mainBg: "#3375b9",
  mainColor: "#ecf2f8",
};

const Son = () => {
  const currentTheme = useTheme();
  return (
    <>
      <h3>{JSON.stringify(currentTheme)}</h3>
      <Button style={{ margin: "10px" }}>click me</Button>
    </>
  );
};

export default () => {
  const [dark, setDark] = useState(false);
  const toggleDark = () => setDark((pre) => !pre);
  return (
    <>
      <ThemeProvider theme={dark ? darkTheme : theme}>
        <Son></Son>
      </ThemeProvider>
      <Button
        style={{ margin: "10px" }}
        onClick={toggleDark}>
        click me
      </Button>
    </>
  );
};
```

### 4.原子化 CSS

使用 tailwind css 也是不错的选择，就是 className 可能会非常长...

#### 安装

1.下载

通过 npm 安装 `tailwindcss`，并创建你的 `tailwind.config.js` 文件。

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p // 创建并初始化tailwindcss和postcss配置文件
```

2.配置需要处理的文件

```diff
import type { Config } from "tailwindcss";

export default {
+  content: [
+    "./index.html",
+    "./src/**/*.{js,ts,tsx,jsx}"
+  ],
  theme: {
    extend: {},
  },
  plugins: [],
} as Config;

```

3.创建一个 css 文件

在 src 目录下创建一个 css 文件，并引入 tailwindcss 预设好的 class，同时将该 css
文件引入应用。

```css
// index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```ts
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
const app = ReactDOM.createRoot(document.querySelector("#root"));
app.render(<App />);
```

4.愉快使用!

在你的编译器上安装 tailwindcss 相关的插件，就可以得到预设 class 的提示了!

```tsx
export default () => {
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
};
```

5.记不住预设 class？

没关系，查文档就好
啦https://tailwind.nodejs.cn/docs/padding#add-padding-to-a-single-side

#### 动画

官方有一些预设的动画效果，当然绝大部分都只能自己定义动画应用在 class 中。

##### 1.定义关键帧

在 tailwindcss.config.js 中定义关键帧:

```diff
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,tsx,jsx}"],
  theme: {
    extend: {
+      keyframes: {
+        move: {
+          "20%": {
+            transform: "translateX(-10px)",
+          },
+          "40%": {
+            transform: "translateX(10px)",
+          },
+          "60%": {
+            transform: "translateX(-5px)",
+          },
+          "80%": {
+            transform: "translateX(5px)",
+          },
+        },
+      },
    },
  },
  plugins: [],
} as Config;

```

##### 2.配置预设 class

在 animation 中配置预设 class：

```diff
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,tsx,jsx}"],
  theme: {
    extend: {
+      animation: {
+        move: "move 1s ease-in-out 1",
+      },
      keyframes: {
        move: {
          "20%": {
            transform: "translateX(-10px)",
          },
          "40%": {
            transform: "translateX(10px)",
          },
          "60%": {
            transform: "translateX(-5px)",
          },
          "80%": {
            transform: "translateX(5px)",
          },
        },
      },
    },
  },
  plugins: [],
} as Config;

```

##### 3.使用

​ 使用 animate-[自定义动画的类]：

```tsx
<h1 className="hover:animate-move">点我</h1>
```

#### 主题

只需要在 tailwindcss.config.js 中改变主题策略。主题策略默认是根据媒体配置主题，
下面的设置可以改为 class 策略。

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  // ...
};
```

现在起，只要给根标签增加 class="dark"的属性，即可让 taildcss 的深色模式生效。如
何让根标签动态的添加属性就不用多说了吧。

##### 简单示例

```tsx
import { useCallback, useState } from "react";
import { create } from "zustand";

// Count组件
const Count = () => {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => setCount((pre) => pre + 1), []);

  return (
    <div className="dark:bg-slate-800 bg-slate-300 w-24 h-52 flex flex-col justify-center items-center">
      <h1>{count}</h1>
      <button
        className="bg-sky-400 py-1 px-2 relative text-white rounded text-s transition-colors hover:bg-sky-500"
        onClick={handleClick}>
        click me
        <div className="animate-ping absolute right-0 w-2 h-2 top-0 rounded-full bg-red-500"></div>
        <div className="w-2 h-2 absolute top-0 right-0 bg-red-500 rounded-full"></div>
      </button>
      <h1 className="hover:animate-move">点我</h1>
    </div>
  );
};

// 状态管理
const useThemeStore = create<{ isDark: boolean } & { toggleDark: () => void }>(
  (set, get) => {
    return {
      isDark: false,
      toggleDark() {
        if (get().isDark) {
          document.documentElement.removeAttribute("class");
        } else {
          document.documentElement.setAttribute("class", "dark");
        }
        set((s) => ({ ...s, isDark: !s.isDark }));
      },
    };
  }
);

// 根组件
export default () => {
  const toggleDark = useThemeStore((s) => s.toggleDark);
  return (
    <>
      <button onClick={toggleDark}>切换主题</button>
      <Count></Count>
    </>
  );
};
```

# 三、状态管理

React 状态管理库太多了，我选了一些进行了简单学习。

## Zustand

### 简单使用

#### 1.安装 Zustand

```
npm install zustand
```

#### 2.创建 store

create 可以用来创建一个 store，传入一个函数，该函数可以接收到 set 参数，该函数的
返回值就是仓库中的 state。和 Vuex 不同的是他并没有把仓库中的数据分成
state、action、mutation、getter 等，Zustand 是把这些集中到 state 中了。

set 是一个函数可以用来修改仓库的状态，和**setState**类似的方式，调用时传入一个函
数异步的更新状态。此函数可以接收一个 state 参数，state 代表当前仓库中的所有状态
，根据返回值更新仓库中的状态。

```ts
import { create } from "zustand";

interface CountState {
  count: number;
  increaseCount: () => void;
  setCount: (num: number) => void;
}

export const useCountStore = create<CountState>((set) => {
  return {
    count: 0,
    increaseCount() {
      return set((state) => {
        return {
          count: state.count + 1,
        };
      });
    },
    setCount(num) {
      return set(() => {
        return {
          count: num,
        };
      });
    },
  };
});
```

#### 3.使用 store

Zustand 不需要像 Pinia 或 Redux 将插件集成在应用中，而是可以像 hooks 一样，随叫
随用。

在调用钩子时可以选择获取数据的方式：

1.按需提取出需要使用的状态

2.得到仓库中的所有 state

```tsx
const Father = () => {
  const count = useCountStore((state) => state.count);
  const { count } = useCountStore();
  return (
    <>
      <h1>Father</h1>
      <div>count:{count}</div>
      <hr />
      <Son />
    </>
  );
};
```

#### 4.更新 store

```tsx
const Son = memo(() => {
  const increaseCount = useCountStore((state) => state.increaseCount);
  return (
    <>
      <h2>Son</h2>
      <button onClick={increaseCount}>点我+1</button>
    </>
  );
});
```

#### 5.收工

​ 你已经掌握了 Zustand 了基本使用了，是不是很简单~

### 定义仓库

​ 使用 create 可以创建一个仓库示例，需要传递函数 fn 作为参数。

​ fn 函数接收三个参数，set，get，storeApi，其函数的返回值是一个对象，包含了仓库
的状态和方法。

```js
const useStore = create((set,get,storeApi)=>{
	return {
		...
    }
})
```

#### set

​ set 函数可以用来更新状态，需要传递一个函数 fn，fn 接收一个参数，其返回值就是最
新的状态值。zustand 的状态和 React 一样也是不可变更新的，需要创建全新的副本，在
全新的副本上更新原有数据。若是基本类型则无妨，若是引用类型则需要让所有层次的数据
都要生成全新的副本。

```ts
const personData = {
  name: "Mark",
  age: 15,
  property: [
    {
      name: "玛莎拉蒂",
      price: 2000,
    },
    {
      name: "马自达",
      price: 500,
    },
  ],
};

export const usePersonStore = create<PersonState>((set, get, o) => {
  return {
    data: personData,
    increaseAge() {
      // Zustand是不可变更新
      set((state) => {
        return {
          ...state,
          data: {
            ...state.data,
            age: state.data.age + 1,
            property: [...state.data.property],
          },
        };
      });
    },
  };
});
```

#### get

​ get 可以帮助我们定义计算属性。

```ts
const personData = {
  name: "Mark",
  age: 15,
  property: [
    {
      name: "玛莎拉蒂",
      price: 2000,
    },
    {
      name: "马自达",
      price: 500,
    },
  ],
};

export const usePersonStore = create<PersonState>((set, get, o) => {
  return {
    data: personData,
    total() {
      // 总资产
      return get().data.property.reduce((pre, item) => pre + item.price, 0);
    },
  };
});

// 使用
import { usePersonStore } from "./store/modules/person";
export default () => {
  const { data, increaseAge, total } = usePersonStore();

  return (
    <>
      <h1>总资产:{total()}</h1>
      <h2>{JSON.stringify(data)}</h2>
      <button onClick={increaseAge}>+1</button>
    </>
  );
};
```

#### 分离状态和方法

create 创建的仓库示例既可在 hooks 中使用，也可以在外部 js 中使用，得益于 create
创建的仓库提供了 setState、getState 等 api。分离状态和方法的优点：

1. 不需要使用钩子即可使用方法
2. 有助于代码拆分

```ts
import { create } from "zustand";

// 状态的类型
interface StoreState {
  name: string;
  age: number;
  property: {
    name: string;
    price: number;
  }[];
}

// 初始状态
const initState = {
  name: "Mark",
  age: 15,
  property: [
    {
      name: "玛莎拉蒂",
      price: 2000,
    },
    {
      name: "马自达",
      price: 500,
    },
  ],
};

// 创建仓库
export const usePersonStore = create<StoreState>((set, get, o) => {
  return {
    ...initState,
  };
});

// 方法1
export const increaseAge = () => {
  usePersonStore.setState((state) => {
    return {
      ...state,
      age: state.age + 1,
    };
  });
};

// 方法2
export const addProperty = () => {
  usePersonStore.setState((state) => {
    return {
      ...state,
      property: [
        ...state.property,
        {
          name: "宝马-x" + state.property.length + 1,
          price: Math.random() * 10000,
        },
      ],
    };
  });
};

// 方法3
export const resetStore = () => {
  usePersonStore.setState(initState);
};
```

### 重置仓库数据

调用 set 时，可以直接传入初始状态即可重置仓库数据

```ts
import { create } from "zustand";

// define types for state values and actions separately
type State = {
  salmon: number;
  tuna: number;
};

type Actions = {
  addSalmon: (qty: number) => void;
  addTuna: (qty: number) => void;
  reset: () => void;
};

// define the initial state
const initialState: State = {
  salmon: 0,
  tuna: 0,
};

// create store
const useSlice = create<State & Actions>()((set, get) => ({
  ...initialState,
  addSalmon: (qty: number) => {
    set({ salmon: get().salmon + qty });
  },
  addTuna: (qty: number) => {
    set({ tuna: get().tuna + qty });
  },
  reset: () => {
    set(initialState);
  },
}));
```

### 仓库示例的方法

仓库提供了 subscribe、setState、getState 三个方法。

#### subscribe

​ 可以为仓库创建数据共享的订阅，每次更新都会触发监听器的回调。其返回值是一个可以
取消订阅的函数。

```ts
const unsubscribe = useStore.subscribe((state,preState)=>{...})
```

下面是一个简单的示例：

​ **注意**：由于 react 组件的特性，每次重新渲染都会导致函数中所有代码都会的执行
，所以需要注意 subscribe 的订阅时机，切勿因为重新渲染导致绑定多个订阅回调，并且
在组件被销毁时需要取消订阅。

```tsx
const Son = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const a = usePersonStore.subscribe((state, pre) => {
      if (state.age !== pre.age) {
        console.log("更新了");
        setCount((pre) => pre + 1);
      }
    });
    return a;
  }, []);

  return <h3>年龄更新了：{count}次数</h3>;
};
```

#### getState

​ 获取仓库中的状态。

#### setState

​ 设置仓库中的状态，默认情况下请使用不可变更新方式来更新仓库状态。可以通过传入回
调或直接传入数据，若是直接传入数据（引用类型），会通过 Object.assign 的方式来覆
盖更新。

### 中间件

​ 中间件可以扩展 Zustand，例如可以持久化仓库，也可以自定义一些工具来扩展
Zustand。

#### Immer

Immer 可以方便我们更新数据，不用手动生成数据副本更新状态了，我们可以直接对当前状
态进行更新，同时也不需要返回任何值。

使用 Immer 中间件之前，需要提前安装 Immer，`npm install immer`。

下面是一个简单的示例：

```tsx
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface State {
  data: {
    name: string;
    age: number;
    property: {
      name: string;
      price: number;
    }[];
  };
}

interface Action {
  increaseAge: () => void;
  addProperty: () => void;
}

export const usePersonStore = create<State & Action>()(
  immer((set) => {
    return {
      data: {
        name: "Mark",
        age: 15,
        property: [
          {
            name: "玛莎拉蒂",
            price: 2000,
          },
          {
            name: "马自达",
            price: 500,
          },
        ],
      },
      increaseAge() {
        set((state) => {
          state.data.age = state.data.age + 1;
        });
      },
      addProperty() {
        set((state) => {
          state.data.property.push({
            name: "宝马X" + state.data.property.length + 1,
            price: Math.random() * 500,
          });
        });
      },
    };
  })
);
```

#### persist

persist 可以让状态持久化。他不需要安装任何插件，安装 zustand 时就集成了该工具。

```ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useBearStore = create(
  persist<{ bears: number; addABear: () => void }>(
    (set, get) => ({
      bears: 0,
      addABear: () => set({ bears: get().bears + 1 }),
    }),
    {
      name: "food-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
```

## Recoil

## Valtio

## Mobx

## RTK

# 四、路由

通过 npm 包管理工具来安装`react-router-dom`。React 和 Vue 的路由最大差距就是 Vue
的路由就只包含了路由的基本功能，而 React 的路由集成了路由和数据获取。

```
npm install react-router-dom
```

## 1.简单示例

通过一个简单案例可以知晓最基本的 react-router-dom 的使用。

### 1.定义路由表

这里将 App 根组件作为唯一的一级路由是为了让 App 组件能够使用路由相关的功能，例如
路由组件、路由钩子。

```tsx
import { Suspense, lazy } from "react";
import { RouteObject } from "react-router-dom";
import App from "../App";

// 按需加载路由资源文件
const Home = lazy(() => import("../views/Home"));
const About = lazy(() => import("../views/About"));
const List = lazy(() => import("../views/List"));

// Suspence，统一包裹懒加载路由组件（否则会报错）
const makeSuspense = (Ele: React.LazyExoticComponent<() => JSX.Element>) => {
  return (
    <Suspense fallback={<span className="animate-spin">⚛️</span>}>
      <Ele></Ele>
    </Suspense>
  );
};

// 路由表
export const routes: RouteObject[] = [
  {
    path: "/",
    // 根路由（一级路由）
    element: <App></App>,
    // 二级路由
    children: [
      {
        path: "/",
        element: makeSuspense(Home),
      },
      {
        path: "/about",
        element: makeSuspense(About),
      },
      {
        path: "/list",
        element: makeSuspense(List),
      },
    ],
  },
];
```

### 2.创建路由对象

```ts
// src/router/index.ts
import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";

// 路由对象实例
const router = createBrowserRouter(routes);

export default router;
```

### 3.在应用中使用路由

RouterProvider 中不能有任何元素，需要传递一个 router 属性，将路由表应用到该组件
中。其呈现的效果和 routerview 类似。由于我们的路由组件都被懒加载（通过 lazy 函数
）了的，所以在 RouterProvider 外面可以使用 Suspense 实现加载前或加载失败的一个备
选方案。

```tsx
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div>
          <span className="animate-spin">⚛️⚽</span>
          Loading...
        </div>
      }>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  </React.StrictMode>
);
```

## 2.路由导航

### 1.编程式

使用 useNavigate 钩子即可获取导航 api，其集成了所有的导航方式。在使用该钩子需要
注意，组件必须能够找到路由上下文。

```ts
useNavigate()("/"); // 显示导航
useNavigate()("/", { replace: true }); // router.replace
useNavigate()(-1); // router.back
useNavigate()(1); //router.forward
```

示例：

```tsx
import { useNavigate } from "react-router-dom";

export default function About() {
  const nav = useNavigate();
  const handleClick = () => nav("/");
  return (
    <>
      <h1 className="text-red-300"> About</h1>
      <button
        className="rounded bg-sky-300 px-2 py-1"
        onClick={handleClick}>
        返回首页
      </button>
    </>
  );
}
```

### 2.声明式

#### Link

使用 Link 组件即可完成声明式的路由导航，需要注意的是，要使用 Link 组件的组件，需
要被 RouterProvider 包裹起来，也就是需要被注入路由上下文才能使用。

```tsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1 className="text-blue-300">Home</h1>
      <Link
        to="/about"
        end>
        前往about页面
      </Link>
    </>
  );
}
```

#### NavLink

NavLink 效果和 Link 组件差不多，不过在路由激活时，默认类名会添加类名为
active。end 表示精准匹配，否则当访问/about/123 时，类名也为 active。

```tsx
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function About() {
  return (
    <>
      <h1 className="text-red-300"> About</h1>
      <NavLink to="/about">About导航</NavLink>
    </>
  );
}
```

## 3.嵌套路由

在路由表中给对应需要子路由的组件添加 children 属性，并在需要显示子路由的地方添加
Outlet 组件。

### 配置路由表

```tsx
// routes.tsx
import { Suspense, lazy } from "react";
import { RouteObject } from "react-router-dom";
import App from "../App";

// 按需加载路由资源文件
const Home = lazy(() => import("../views/Home"));
const About = lazy(() => import("../views/About"));
const List = lazy(() => import("../views/List"));
const Father = lazy(() => import("../views/About/Father"));
const Son = lazy(() => import("../views/About/Father/Son"));

// Suspence，统一包裹懒加载路由组件（否则会报错）
const makeSuspense = (Ele: React.LazyExoticComponent<() => JSX.Element>) => {
  return (
    <Suspense fallback={<span className="animate-spin">⚛️</span>}>
      <Ele></Ele>
    </Suspense>
  );
};

// 路由表
export const routes: RouteObject[] = [
  {
    // 一级路由
    path: "/",
    element: <App></App>,
    // 二级路由
    children: [
      {
        path: "/",
        element: makeSuspense(Home),
      },
      {
        path: "/about",
        element: makeSuspense(About),
        // 三级路由
        children: [
          {
            path: "/about/father",
            element: makeSuspense(Father),
            // 四级路由
            children: [
              {
                path: "/about/father/son",
                element: makeSuspense(Son),
              },
            ],
          },
        ],
      },
      {
        path: "/list",
        element: makeSuspense(List),
      },
    ],
  },
];
```

### 配置子路由入口

```tsx
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

export default function About() {
  return (
    <>
      <h1 className="text-red-300"> About</h1>
      <div className="space-x-1">
        <Link to="/about">About导航</Link>
        <NavLink to="/about/father">查看Father组件</NavLink>
      </div>
      <hr></hr>
      {/**三级路由入口*/}
      <Outlet></Outlet>
    </>
  );
}
```

## 4.动态路由

动态路由指不同的路径渲染相同的路由组件。

### 定义路由表

```ts
{
	path:"/detail/:id",
    element:<Detail/>
}
```

### 导航到动态路由

```tsx
<Link to="/detail/001">去详情页</Link>; //声明式
useNavigate("/detail/001"); // 编程式
```

### 获取动态路径的参数

可以通过 useParams 来获取路径中的动态参数，从而渲染不同的内容。

```tsx
import { useParams } from "react-router-dom";

export default function Detail() {
  const data = useParams<{ id: string }>();
  return (
    <>
      <h1>商品详情</h1>
      <div>商品id:{data.id}</div>
    </>
  );
}
```

### 初始化、更新钩子

通过配置，可以在路由组件初始化、参数更新时执行一些额外操作。比如对参数进行校验、
格式化等等。

## 5.任意路由

这种方式是通过定义一个可以匹配任意路径的通配符路由，也就是说任意路径都可以匹配上
该路由，从而阻止了 React Router 的未匹配错误警告。要想统一捕获错误从而显示错误页
面，请使用 errorElement、useRouteError 等。

```tsx
{
    path:'*',
    element:<NotFound></NotFound>
}
```

## 6.捕获错误

只要路由出现错误就可以跳转到该页面，支持手动抛出错误跳转到错误页面，这种方式可以
用来统一捕获错误。

### 基本设置

定义错误页面组件：

```tsx
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
```

配置错误页面组件：

```tsx
/* previous imports */
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />, // 只要根路由出错了，就会跳转到ErrorPage中
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

上述配置好以后，只要根路由出现错误，就会被捕获从而跳转到 ErrorPage 统一处理错误
。

### 手动抛出错误

使用 Response 来抛出错误。React Router 会捕获该错误，并通过路由表中离得最近的
errorElement（自身、父亲节点、祖先节点层层冒泡寻找），并将对应的路由渲染成其
errorElement。注意：不是将出错的组件渲染成 errorElement，而是将拥有 errorElement
属性的路由组件渲染成 errorElement。

loader 是一个组件配置项，是一个函数或异步函数，可以接受一个包含路由参数、请求上
下文的参数，loader 会在每次路由组件渲染或更新之前执行，常常用来获取数据、校验参
数。

```tsx
{
        path: "/detail/:id",
        element: makeSuspense(Detail),
        loader(args: LoaderFunctionArgs) {
          // 获取参数id
          const idStr = args.params.id as string;
          // 校验id是否为number型
          if (isNaN(+idStr)) {
            // 抛出错误，让errorPage页面处理错误
            throw new Response("", {
              status: 400,
              statusText: "Params Error",
            });
          }
          return {};
        },
},
```

### 自动抛出错误

​ 若程序在运行过程中出现错误也会被 React Router 拦截到，并渲染最近的
ErrorElement。

```tsx
export default function App() {
  obj.c; // obj is not defined
  return <Outlet></Outlet>;
}
```

## 7.路由配置项

### index

​ 布尔值，可以用来配置默认子路由。默认为 false，则不是默认子路由。

```tsx
{
    path:'/father',
    element:<Father></Father>,
    children:[
        {   // 当路由路径为/father时，加载Son组件。
            index:true,
            element:<Son/>
        }
    ]
}
```

### loader（Data API）

Loader 配置项是一个函数，函数接收路由上下文数据，会在每次渲染之前执行，也会在路
由更新前执行。其函数的返回值可以通过`useLoaderData`钩子来获取，所以 loader 一般
就是用来获取数据的。Loader 是一个 Data API，只有开启此功能的 Router 才能使用。

loader 函数可以直接返回 Promise 对象，useLoaderdata 可以读取 Promise 成功时的返
回值，若失败了则会被 errorElement 或 React Router 捕获。

**注意：在 useLoaderdata 获取到 Promise 的结果前，组件是不会渲染的。如果需要异步
加载部分内容，请使用 defer 延迟加载结果，并通过 useLoaderData 通过组件接管
Promise 获取到结果**

Loader 一般使用场景：

1. 在进入页面前鉴权
2. 重定向
3. 通过路径参数获取数据

#### 简单示例

路由表:

```tsx
      {
        path: "/detail/:id",
        element: makeSuspense(Detail),
        async loader(args) {
          // 加载数据，并返回
          const data = await getGoodsDetailAPI(args.params.id as string);
          return data
        },
      },
```

组件内部：

```tsx
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

export default function Detail() {
  const nav = useNavigate();
  // 可以接受loader中返回的数据
  const data = useLoaderData() as { id: string; name: string; price: number };
  const handler = () => {
    nav(`/detail/00${Math.floor(Math.random() * 3 + 1)}`);
  };
  return (
    <>
      <h1>商品详情</h1>
      <div>商品id:{data.id}</div>
      <div>商品名称:{data.name}</div>
      <div>商品价格:{data.price}</div>
      <button onClick={handler}>猜你喜欢</button>
    </>
  );
}
```

#### loader 函数的参数

loader 属性传入的函数，允许有 2 个参数：

##### params

params: 如果 Route 中包含参数（例如 path 是`/user/:userId`，参数就是`:userId`，
可以通过 params.userId 获取到路由参数的值）。

##### request

request: 是 Web 规范中，Fetch API 的
[Request](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FRequest)，
代表一个请求。

注意：这里指的不是你在 loader 内部发的 fetch 请求，而是**当用户路由到当前路径
时**，发出的“请求”（其实在 Single-Page App 中，router 已经拦截了这个真实的请求，
只有 Multi-Page App 中才会有这个请求），这里是 React Router 6.4 为了方便开发者获
取当前路径信息提供的参数，他们按照 Web 规范，制造了一个假的 request。

你可以通过 `request` 方便的获取当前页面的参数，不要使用`window.location.href`来
获取当前路径，因为路由参数更新是异步的，原生的方式只能获取到当前地址信息，
而`request`中的 url 才是最新的参数。

```tsx
      {
        path: "/detail/:id",
        element: makeSuspense(Detail),
        loader(args) {
          console.log("request " + args.request.url); // 能够获取到最新的参数
          console.log("window " + window.location.href); // 只能实时的获取浏览器的地址栏
          return getGoodsDetailAPI(args.params.id as string);
        },
      },
```

#### loader 函数的返回值

##### 返回数据

loader 函数返回什么，useLoaderData 钩子就会接受什么。

但是 React Router 官方建议，返回一个 Web 规范 中的 Fetch API 的
[Response](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FResponse)，
返回一个被包装后的对象，不会影响 useLoaderData 获取到的数据，依旧可以获取源数据
。

你可以直接 `return fetch(url, config);`，也可以自己构造一个假的 Response:

```tsx
      {
        path: "/detail/:id",
        element: makeSuspense(Detail),
        async loader(args) {
          // console.log("request " + args.request.url); // 能够获取到最新的参数
          // console.log("window " + window.location.href); // 只能实时的获取浏览器的地址栏
          const data = await getGoodsDetailAPI(args.params.id as string);
          // 可以 引入json（react-router-dom中的）
          return json(data, { status: 200 });
          // 也可以
          return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
              "Content-Type": "application/json;",
            },
          });
        },
      },
```

##### 重定向

可以在 loader 中进行一些鉴权操作。

```tsx
      {
        path: "/my",
        element: makeSuspense(User),
        loader() {
          if (localStorage.getItem("token") === null) {
            // 未登录，返回首页
            return redirect("/");
          } else {
            // 登录了，响应用户信息
            return json({
              username: "Mark",
              age: 18,
            });
          }
        },
      },
```

#### loader 中抛出异常

如果数据获取失败，或者其它任何原因，你认为不能让 Route 对应的 element 正常渲染了
，你都可以在 loader 中 throw 异常。这时候，「errorElement」就会被渲染，处理错误
请求。

```jsx
function loader({ request, params }) {
  const res = await fetch(`/api/properties/${params.id}`);
  if (res.status === 404) {
    throw new Response("Not Found", { status: 404 });
  }
  return res.json();
}
//...
<Route loader={loader} />
```

注意：你可以抛出任何异常，都可以在 errorElement 内通过 hook `useRouteError` 来获
取到异常。

但是，React Router 官方建议你 throw Response：

```jsx
<Route
  path="/properties/:id"
  element={<PropertyForSale />}
  errorElement={<PropertyError />}
  loader={async ({ params }) => {
    const res = await fetch(`/api/properties/${params.id}`);
    if (res.status === 404) {
      throw new Response("Not Found", { status: 404 });
    }
    const home = res.json();
    return { home };
  }}
/>
```

你依然可以用 React Router 提供的 json 方法，方便的构造个 Response：

```php
throw json(
  { message: "email is required" },
  { status: 400 },
);
```

#### 延迟加载

若本次 loader 数据不影响 UI，或者就想要先展示部分内容，可以使用 defer 延迟加载数
据。需要使用 defer+Suspense+Await

##### 修改之前

​ 会发现页面会卡顿 3000ms 才会开始渲染，也就是说 loader 会阻塞 React 渲染。

组件配置

```tsx
          {
            path: "/about",
            id: "about",
            element: makeSuspense(About),
            async loader() {
              const data = await new Promise((r) => {
                  setTimeout(() => {
                    r({
                      name: "Mark",
                      age: 123,
                    });
                  }, 3000);
                })
              return json(data)
            },
          }
```

组件内容

```tsx
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigate,
} from "react-router-dom";

export default function About() {
  const { name, age } = useLoaderData();
  return (
    <>
      <h1 className="text-red-300"> About</h1>
    </>
  );
}
```

##### 修改之后

路由配置

```tsx
          {
            path: "/about",
            id: "about",
            element: makeSuspense(About),
            async loader() {
                // 使用defer异步加载，不会阻塞组件渲染
              return defer({
                asyncData: new Promise((r) => {
                  setTimeout(() => {
                    r({
                      name: "Mark",
                      age: 123,
                    });
                  }, 3000);
                }),
              });
            },
          },
```

组件使用

```tsx
import { Suspense } from "react";
import { Await, Outlet, useLoaderData } from "react-router-dom";

export default function About() {
  const { asyncData } = useLoaderData() as {
    asyncData: Promise<{ name: string; age: number }>;
  };
  asyncData.then((r) => {
    // 读取异步内容
    console.log(r);
  });
  return (
    <>
      <h1 className="text-red-300"> About</h1>
      {/*渲染异步内容 */}
      <Suspense fallback={<div className="inline-block animate-move">🐟</div>}>
        <Await
          resolve={asyncData}
          children={(data: { name: string; age: number }) => {
            return (
              <>
                <div>姓名:{data.name}</div>
                <div>年龄:{data.age}</div>
              </>
            );
          }}></Await>
      </Suspense>
    </>
  );
}
```

### action （Data API）

​ action 和 loader 类似，不过他需要搭配 Form 组件或 useSubmit 钩子，在提交表单时
会触发 action 函数，将数据保存到远端（我觉得这个 api 就是把表单的功能集成到路由
中去了）。

​ 下面讲解一下 action 搭配 Form 组件与 useSubmit 钩子怎么用。

#### Form 表单

​ 可以提交表单数据，进行一些异步操作（发送请求增删改查），并跳转到另一个页面。

​ Form 表单可以接收一个**action**属性，传一个路由路径，只要表单触发提交事件，就
会将表单中的数据解析出来，并执行对应路由的 action 函数，若无抛出错误，就会跳转到
该页面中，默认值是当前路由。

​ Form 表单可以接收一个**method**属性，可以在 action 函数执行时，通过
request.method 中得到该属性的值。

##### 页面:

​ 使用 React Router 提供的 Form 组件，注意哪些数据需要被提交就需要给对应的表单域
添加 name 属性，他会在表单提交时自动携带这些数据。

```tsx
      <Form
        method="POST"
        className="px-5 py-3 border border-blue-300">
        <div className="px-2 py-1">
          <label className="m-1">username</label>
          <input className="outline-none border" name="username"</input>
        </div>
        <div className="px-2 py-1">
          <label className="m-1">password</label>
          <input
            className="outline-none border" type="password"
            name="password"></input>
        </div>
        <div className="flex justify-end">
          <button className="px-2 py-1 bg-sky-400 rounded text-xs text-white">
            confirm
          </button>
        </div>
      </Form>
```

##### 路由:

```tsx
  {
    path: "/login",
    errorElement: <ErrorPage></ErrorPage>,
    element: makeSuspense(Login),
    async action({ request }) {
      const formData = await request.formData(); // 保存着Form表单中的表单域数据
      const username = formData.get("username");
      const password = formData.get("password");
      try{
         await loginAPI({
             username,
             password
         })
       	// 重定向到某个页面
        return redirect('/my')
      }catch(error){
          // 登录失败
        throw new Response("", {
          status: 400,
          statusText: "Username or Password Error!",
        });
      }
    },
  },
```

##### 组件:

​ 在组件中通过 useActionData 获取 action 的返回值。

#### useSubmit

​ useSubmit 是命令版本的 Form 组件，旨在不需要交互即可提交表单。

### errorElement (Data API)

当路由组件内容 或 loader 内抛出异常，`<Route>`就不渲染它的 element 了，而是渲染
它的 errorElement。

每当 Router 发生错误时（除了未找到路由的错误以外），他都会寻找自身或冒泡上一层的
errorElement，**若某个祖先组件存在该配置项，则会将这个祖先组件替换成对应的
errorElement 组件，而不是将发生错误的组件替换成 errorElement。**

若是未找到路由的错误，则会以根路由的 errorElement 来替换根组件的 element 进行渲
染。

#### 统一某些路由配置错误页面

我们可以使用无路径路由来包裹我们需要统一配置错误的路由，让这些路由的错误都指向同
一个 errorElement。

推荐:

```tsx
export const routes: RouteObject[] = [
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <Layout></Layout>,
    children: [
      {
        errorElement: <ErrorPage></ErrorPage>,
        // 这些子路由及其后代路由发生错误都渲染ErrorPage
        children: [
          {
            index: true,
            element: makeSuspense(Home),
          },
          {
            path: "/about",
            element: makeSuspense(About),
          },
          {
            path: "/test",
            element: makeSuspense(Test),
            children: [
              {
                path: "/test/son",
                element: makeSuspense(TestSon),
              },
            ],
          },
        ],
      },
    ],
  },
];
```

不推荐:

```tsx
export const routes: RouteObject[] = [
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <Layout></Layout>,
    children: [
      {
        errorElement: <ErrorPage>Inner</ErrorPage>,
        index: true,
        element: makeSuspense(Home),
      },
      {
        errorElement: <ErrorPage>Inner</ErrorPage>,
        path: "/about",
        element: makeSuspense(About),
      },
      {
        errorElement: <ErrorPage>Inner</ErrorPage>,
        path: "/test",
        element: makeSuspense(Test),
        children: [
          {
            errorElement: <ErrorPage>InnerIner</ErrorPage>,
            path: "/test/son",
            element: makeSuspense(TestSon),
          },
        ],
      },
    ],
  },
];
```

## 8.Data API

Data API 是 Router 6.4 更新的，当路由是通
过`createXXXXRouter`和`<RouterProvider>`时，你就可以使用 Data API。

其实 Data API 的用处就是**允许你把「数据获取逻辑」写到路由定义中。每当路由切换到
那里时，会自动获取数据。**

和 Data API 相关的有 Loader、Action、errorElement。

## 9.钩子

### 1.useLoaderData

​ useLoaderData 钩子可以获取当前路由组件的 loader 函数的返回值。

> 请注意， `useLoaderData` _不会触发获取操作_。它只是读取 React Router 在内部管
> 理的获取结果，因此您不必担心它在路由之外的重新渲染时重新获取。

```tsx
{
	path:'/page',
    element:<Page/>,
    loader:()=>({name:'Mark'})
}

function Page(){
    useLoaderData() // {name:"Mark"}
    return <></>
}
```

### 2.useRouteLoaderData

​ 该钩子的功能和 useLoaderData 差不多，唯一的区别就是，该钩子可以获取祖先的
loader。

​ 注意：此钩子不能获取路由树上的所有 loader，只能获取与自己有直属关系的组件
loader。其原理我感觉和事件捕获一样，只能获取捕获过程中的所有路由组件的 loader。

画个图就是:

<!-- ![image-20231222155802962](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20231222155802962.png) -->

图片占位符🥰

下面这个示例演示了 Root 组件、JobListing 组件都可以获取 loader 中的数据。

定义路由时：

```js
createBrowserRouter([
  {
    path: "/",
    loader: () => fetchUser(),
    element: <Root />,
    id: "root", // 路由的id，到时候需要此id来获取数据
    children: [
      {
        path: "jobs/:jobId",
        loader: loadJob,
        element: <JobListing />,
      },
    ],
  },
]);
```

`<JobListing />`内部调用这个 hook 时：

```js
const user = useRouteLoaderData("root"); // 根据id获取对应的loader数据
```

### 3.useRouteError

在 errorElement 内，可用 `useRouteError` 获取异常。

React Router 给了一个函数 `isRouteErrorResponse`，帮你在开发 errorElement 时，可
以判断当前异常是否是 Response 异常。因为 Response 异常 通常是开发者自己抛出的，
是可以展示原因的（包括后端接口返回错误码和错误提示文案，也可在这里处理）。其它异
常，通常是未知的，就直接展示兜底的报错文案即可。

### 4.useActionData

​ useActionData 可以获取对应组件的 action 函数的返回值，action 函数会在 Form 组
件提交事件、useSubmit 执行时触发。

### 5.useAsyncError

从最近的 `<Await>` [await] 组件返回拒绝值。

```jsx
import { useAsyncError, Await } from "react-router-dom";

function ErrorElement() {
  const error = useAsyncError();
  return <p>Uh Oh, something went wrong! {error.message}</p>;
}

// 在某个组件中
<Await
  resolve={promiseThatRejects}
  errorElement={<ErrorElement />}
/>;
```

### 6.useAsyncValue

从最近的 `<Await>` 父组件返回已解析的数据。

```jsx
function ProductVariants() {
  const variants = useAsyncValue();
  return <div>{/* ... */}</div>;
}

// Await creates the context for the value
<Await resolve={somePromiseForProductVariants}>
  <ProductVariants />
</Await>;
```

### 7.useLocation

​ 类似与 useRoute。此钩子返回当
前[`location`](https://baimingxuan.github.io/react-router6-doc/utils/location)对
象。如果您想在当前位置发生变化时执行某些副作用，这将非常有用。

其中包含了：

hash：当前 URL 的哈希值

key：当前位置的唯一密钥

pathname：当前 URL 的路径

search：当前 URL 的查询字符串

state：[`Link state`](https://baimingxuan.github.io/react-router6-doc/components/link#state)
或
[`navigate`](https://baimingxuan.github.io/react-router6-doc/hooks/use-navigate)
创建的位置的状态值。

### 8.useNavigation

useNavigation 类似于路由的状态，例如当前是否正在加载路由... 调用这个钩子会返回一
个对象，其中包含了几个属性，下面介绍几个常用的，其余都和表单提交相关。

#### navigation.state

state 可以用来做加载路由时显示其他内容，state 有三个值：

- **idle** -- 没有待处理的导航。
- **submitting**-- 由于使用 POST、PUT、PATCH 或 DELETE 提交表单，路由操作被调用
- **loading** --下一个路由的加载器正在调用以呈现下一页

有时候路由组件是被 loader 阻塞加载了，提供一些加载提示 UI 有更好的用户体验。

```tsx
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Nav from "./components/Nav";

export default function Layout() {
  const s = useNavigation();
  return (
    <div className="flex h-svh">
      <div className="bg-slate-200 border-emerald-100 border border-solid min-w-36 h-full">
        <div className="text-2xl text-center">XX管理系统</div>
        <hr />
        <div className="flex flex-col">
          <Nav to="/">home</Nav>
          <Nav to="/list">list</Nav>
          <Nav to="/my">my</Nav>
          <Nav to="/about">about</Nav>
          <Nav to="/test">test</Nav>
          <Nav to="/need-await">need await</Nav>
        </div>
      </div>
      <main className="flex-grow relative">
        {s.state === "loading" && (
          <div className="absolute inset-0 flex justify-center items-center bg-red-50">
            <div className="inline-block animate-bounce">🐟</div>
          </div>
        )}
        <Outlet></Outlet>
      </main>
    </div>
  );
}
```

#### navigation.location

这告诉您下一
个[位置](https://baimingxuan.github.io/react-router6-doc/utils/location)是什么。

请注意，如果正在向链接指向的 URL 提交表单，该链接将不会显示为 "pending"，因为我
们只在 "loading "状态下才这样做。当状态为 "submitting "时，表单将包含待处理用户
界面，一旦操作完成，链接将转为待处理状态。

### 9.useMatches

会返回当前匹配上的所有路由，这个和 route.matched 类似，可以用来实现面包屑的功能
。

### 10.useNavigate

用来路由导航的，集成了 push、replace、forward、back、go 所有功能。

### 11.useRoutes

可以动态的注册路由。

## 10.内置组件

### 1.Outlet

​ 是当前路由的子路由入口，类似于 RouterView 的效果。

### 2.NavLink

​ NavLink 是一个代替锚链接的导航组件，他会生成一个 a 标签，当点击时会进行路由跳
转。

> `<NavLink>` 是一种特殊的 `<Link>` ，它知道自己是否处于 "激活"、"待定 "或 "过渡
> "状态。

#### 基本使用

```tsx
<NavLink
  to="/messages"
  className={({ isActive, isPending, isTransitioning }) =>
    [
      isPending ? "pending" : "", // 正在加载时为真
      isActive ? "active" : "", // 路由路径与to属性相等时为真
      isTransitioning ? "transitioning" : "",
    ].join(" ")
  }>
  Messages
</NavLink>
```

#### 插槽

```tsx
<NavLink to="/tasks">
  {({ isActive, isPending }) => (
    <span className={isActive ? "active" : ""}>Tasks</span>
  )}
</NavLink>
```

#### end 属性

end 属性可以定义路由激活的精准匹配。

| Link                          | URL          | isActive |
| :---------------------------- | :----------- | :------- |
| `<NavLink to="/tasks" />`     | `/tasks`     | true     |
| `<NavLink to="/tasks" />`     | `/tasks/123` | true     |
| `<NavLink to="/tasks" end />` | `/tasks`     | true     |
| `<NavLink to="/tasks" end />` | `/tasks/123` | false    |

#### reloadDocument 属性

`reloadDocument` 属性可用于跳过客户端路由，让浏览器正常处理转换（如同 `<a href>`
）。

### 3.Link

​ 低配版的 NavLink，不支持激活。

### 4.Await

​ await 需要和 Suspence 组件组合使用，可以异步加载组件的一些部分，等待 Promise
完成时再渲染剩余内容。

#### 简单使用

```tsx
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

export default function NeedAwait() {
  // 初始数据
  const books = ["老人与海", "魔兽争霸"];
  // 一个Promise
  const otherBooks = new Promise((r, j) => {
    setTimeout(() => {
      r(["我的世界", "傲慢与傲慢"]);
    }, 3000);
  });
  return (
    <div>
      <ul>
        {books.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Suspense fallback={<span className="animate-spin">🐟</span>}>
        <Await
          resolve={otherBooks}
          // promise失败渲染errorElement，若没有指定errorElement则会通过该路由组件树冒泡寻找
          errorElement={<div>can not get other books</div>}
          // resolveBooks是otherBooks成功的结果
          children={(resolveBooks: string[]) =>
            resolveBooks.map((item) => <li key={item}>{item}</li>)
          }></Await>
      </Suspense>
    </div>
  );
}
```

#### 结合 loader 使用

路由配置

需要使用 defer，告诉组件需要延迟加载内容。

```tsx
          {
            path: "/need-await",
            element: makeSuspense(NeedAwait),
            async loader() {
              const books = await new Promise((r) => {
                setTimeout(() => {
                  r(["老人与海", "爱的故事"]);
                }, 1000);
              });
              return defer({
                books,
                // otherBooks返回一个Promise
                otherBooks: new Promise((r, j) => {
                  setTimeout(() => {
                    // 抛出错误
                    // j("获取出错");
                    r(["我的世界", "傲慢与傲慢"]);
                  }, 3000);
                }),
              });
            },
          },
```

组件当中使用:

```tsx
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

export default function NeedAwait() {
  const { books, otherBooks } = useLoaderData() as {
    books: string[];
    otherBooks: Promise<string[]>;
  };

  return (
    <div>
      <ul>
        {books.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Suspense fallback={<div className="animate-spin inline-block">🐟</div>}>
        <Await
          resolve={otherBooks}
          // promise失败渲染该组件，若没有指定errorElement则会通过该路由组件树冒泡寻找
          errorElement={<div>can not get other books</div>}
          // resolveBooks是otherBooks成功的结果
          children={(resolveBooks: string[]) =>
            resolveBooks.map((item) => <li key={item}>{item}</li>)
          }></Await>
      </Suspense>
    </div>
  );
}
```

## 11.路由传参方式

## 12.函数

### 1.defer

​ defer 是配合 loader 一起使用，可以先加载路由组件的部分内容，后续内容可以异步加
载。若在 loader 中使用了 await 会导致路由组件的渲染被阻塞，如果某些内容的显示不
是很重要就可以使用 defer 延迟加载 Promise 的结果，从而直接渲染路由组件。具体使用
方式可以查看 **7 路由配置项中的 loader**。

## 13.路由元数据

​ 在 react-router 中并没有路由元数据这一说法，因为每个组件都是一个函数，函数在执
行时都是可以接收到参数的，所以我们只需要在路由定义时给组件传入一些参数即可，就和
props 一样。react 的路由比 vue 的路由更可控一些。以下提供了一些方案来实现 meta。

### 路由组件内部使用元数据

若元数据只需要在对应路由组件中使用，则直接将 meta 传给组件即可。

路由定义：

```tsx
{
    path:'/',
    element:<Home meta={{title:"首页"}}></Home>
}
```

路由组件中使用：

```tsx
function Home(meta: { title: string }) {
  return <></>;
}
```

### 其他组件访问元数据(方案 1)

若元数据需要在其他组件中使用，例如要实现路由导航菜单的标题、图标渲染。

可以自己扩展 RouteObject 接口，在路由定义中直接设置 meta 属性，然后自己写一个工
具钩子函数，根据当前路由路径，来获取对应路由组件的信息。

#### 路由定义

```tsx
import { Suspense, lazy } from "react";
import { RouteObject } from "react-router-dom";

/**
 * 懒加载组件工厂函数
 * @param pagePath 文件路径
 * @param metaProps 路由组件的元数据
 * @returns
 */
function lazyload(
  pagePath: string,
  metaProps: { title?: string; icon?: string } = {}
) {
  const Ele = lazy(() => import(pagePath));
  return (
    <Suspense fallback={<div className="inline-block animate-spin">🐟</div>}>
      <Ele></Ele>
    </Suspense>
  );
}

export type RouteRecrod = RouteObject & {
  meta?: { title: string; icon: string };
  children?: RouteRecrod[];
};

export const routes: RouteRecrod[] = [
  {
    path: "/",
    id: "ROOT",
    element: lazyload("../layout/Layout.tsx"),
    children: [
      {
        id: "HOME",
        index: true,
        element: lazyload("../views/Home.tsx"),
        meta: {
          title: "首页",
          icon: "HOME_ICON",
        },
      },
      {
        id: "ABOUT",
        path: "/about",
        element: lazyload("../views/about.tsx"),
        meta: {
          title: "关于",
          icon: "ABOUT_ICON",
        },
        children: [
          {
            path: "/about/father",
            element: lazyload("../views/about.tsx"),
            meta: {
              title: "关于 father",
              icon: "ABOUT_ICON",
            },
            children: [
              {
                path: "/about/father/son",
                element: lazyload("../views/about.tsx"),
                meta: {
                  title: "关于 son",
                  icon: "ABOUT_ICON",
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
```

#### 钩子函数

```tsx
import { RouteObject, useLocation } from "react-router-dom";
import { RouteRecrod, routes } from "../router/routes";

function findRoute(
  pathname: string,
  children: RouteObject[]
): RouteRecrod | null {
  for (let i = 0; i < children.length; i++) {
    // 遍历校验是否path一致
    const route = children[i];
    if (route.path === pathname) {
      return route as RouteRecrod;
    } else if (route.children && route.children.length) {
      // 不一致，并且有子路由，就递归，如果找到了，直接返回，没找到继续遍历
      const res = findRoute(pathname, route.children);
      if (res !== null) return res;
    }
  }
  // 本级路由未找到返回null
  return null;
}

export default function useRoute() {
  const { pathname } = useLocation();
  const result = Object.assign({}, findRoute(pathname, routes));
  Reflect.deleteProperty(result, "element");
  if (result.children) {
    Reflect.deleteProperty(result, "children");
  }
  return result;
}
```

### 其他组件访问元数据(方案 2)

借助第三方工具，来实现 meta 属性。react-router-config

## 14.路由过渡动画

在路由切换时，执行一些离场、进场的过渡动画，我们可以使
用`react-transition-group`，当然如果你想在类似的情况下使用过渡动画，也可以使用该
组件，不仅限与路由中使用。

安装:`pnpm install react-transition-group`

其提供了四个组件：Transition、CSSTranstion

### Transition

​ Transition 组件可以在 JS 中即可完成对 CSS 动画的编写，如果你不想要太耦合，请使
用 CSSTranstion。

​ 有两种动画状态，进入（entered）和离开（exited），在这些动画执行过程中又有两种
动画状态，进入时（entering）和离开时（exiting）。

- `'entering'` 进入时的初始状态
- `'entered'` 进入后的状态
- `'exiting' ` 离开时的初始状态
- `'exited'` 离开后的状态

#### in

布尔值，控制元素的显隐。

#### nodeRef

要让哪个元素在 in 属性更新时执行动画，接收一个 DOM 对象。

#### children

一个函数，可以接收一个参数 state，代表当前动画执行的状态，函数一般返回一个 JSX
节点，告诉 Transition 需要控制这些元素的动画。每次 state 更新时都会执行 children
函数。

state 的值有四种，分别是两种动画状态，进入（entered）和离开（exited），在这些动
画执行过程中又有两种动画状态，进入时（entering）和离开时（exiting）。

- `'entering'`
- `'entered'`
- `'exiting'`
- `'exited'`

#### timeout

动画执行的时间。

#### appear

若 in 布尔值为真时，想要在初始化渲染时执行一次动画流程，可以使用 apper。

#### mountOnEnter

在布尔值为真时才渲染组件，默认值为 false

#### unmountedOnExit

在布尔值为假时就会执行动画流程，并卸载组件，默认值为 false

#### 状态钩子函数

提供了一些钩子函数，可以在动画执行的整个过程中执行额外操作。

onEnter，在`entering`之前触发：Function(node: HtmlElement, isAppearing: bool) ->
void

onEntering，在`entering`之后触发：Function(node: HtmlElement, isAppearing: bool)
-> void

onEntered，在`enterd`之后触发：Function(node: HtmlElement, isAppearing: bool) ->
void

onExit，在`exiting`之前触发：Function(node: HtmlElement) -> void

onExiting，在`exiting`之后触发：Function(node: HtmlElement) -> void

onExited，在`exited`之后触发：Function(node: HtmlElement) -> void

#### 基本使用

```tsx
import { useRef, useState } from "react";
import { Transition } from "react-transition-group";

// 过渡时间
const duration = 1000;

// 变化过程中的效果
const transitionStyles = {
  // 进入途中
  entering: { opacity: 1 },
  // 进入后
  entered: { opacity: 1 },
  // 退出途中
  exiting: { opacity: 0 },
  // 退出后
  exited: { opacity: 0 },
};

// 初始效果
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 1,
};

export default function Home(props: { title: string; icon: string }) {
  const [flag, setFlag] = useState(true);
  const handleClick = () => setFlag((pre) => !pre);
  const nodeRef = useRef(null);
  return (
    <div className="p-5">
      <button
        className="rounded px-2 py-1 bg-red-400 text-xs text-white"
        onClick={handleClick}>
        {flag ? "隐藏" : "显示"}
      </button>
      <hr />
      <Transition
        timeout={duration}
        in={flag}
        nodeRef={nodeRef}>
        {(state) => {
          // 每次state状态更新都会重新执行该函数
          console.log(state);
          return (
            <div
              className="bg-blue-100 h-10"
              ref={nodeRef}
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}>
              <div className="animate-ping inline-block">🐟</div>
            </div>
          );
        }}
      </Transition>
    </div>
  );
}
```

### CSSTransition

可以通过 css 来控制动画，基础了 Transtion 的所有 API。

#### classNames

​ 通过 classNames 来指定动画，会在对应进场、离场状态时以 className 来设置
class。注意，不是 className，而是 classNames!

#### 简单使用

```tsx
import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

export default function About() {
  const [flag, setFlag] = useState(true);
  const nodeRef = useRef(null);
  const handleClick = () => setFlag((pre) => !pre);
  return (
    <div className="p-5">
      <h1>About</h1>
      <button
        className="bg-red-500 text-white rounded px-2 py-1"
        onClick={handleClick}>
        click me
      </button>
      <hr></hr>
      <CSSTransition
        nodeRef={nodeRef}
        in={flag}
        timeout={1000}
        classNames="move">
        <div ref={nodeRef}>在这儿呢 😍</div>
      </CSSTransition>
    </div>
  );
}
```

css 定义为：

```css
/*进场*/
.move-enter {
  opacity: 0;
}

/*进场过程中*/
.move-enter-active {
  opacity: 1; /*这里需要设置动画的最终态，因为他只会在状态为entering时添加该class，若无终态会导致动画没有任何变化，所以在动画执行过程中，请给出终态*/
  transition: opacity 1000ms;
}

/*进场结束，动画完成时设置该class*/
.move-enter-done {
  opacity: 1;
}

/*准备退场*/
.move-exit {
  opacity: 1;
}

/*退场过程中，动画执行过程中设置该class*/
.move-exit-active {
  opacity: 0;
  transition: opacity 1000ms;
}

/*退场结束，动画完成时设置该class*/
.move-exit-done {
  opacity: 0;
}
```

### TranstionGroup

​ 结合 Transition 或 CSSTransition 一起使用。不需要任何多余的设置，只需要让他包
裹 Transition 或 CSSTransition 组件即可实现对多个元素的动画控制。

​ 在使用 Transition 或 CSSTransition 时可以不传入 in，在列表渲染时，需要传入
in，在该项被删除时会自动执行离场动画，在添加新元素时会自动执行进场动画。

```tsx
import {
  useState,
  createRef,
  RefObject,
  FormEvent,
  useCallback,
  memo,
} from "react";
import {
  Transition,
  CSSTransition,
  TransitionGroup,
} from "react-transition-group";
import { v4 as uuidv4 } from "uuid";

// 过渡时间
const time = 500;

// 列表项
const ListItem = memo(
  (props: {
    id: string;
    text: string;
    nodeRef: RefObject<any>;
    deleteTask: (id: string) => void;
  }) => {
    console.log("ListItem render");
    const handelClick = () => props.deleteTask(props.id);
    return (
      <div
        className="flex mb-1"
        ref={props.nodeRef}>
        <button
          className="text-xs bg-red-600 text-white px-2 py-1 rounded mr-1"
          onClick={handelClick}>
          delete
        </button>
        <span>{props.text}</span>
      </div>
    );
  }
);

// 增加列表项
const AddTask = memo(({ addTask }: { addTask: (text: string) => void }) => {
  console.log("AddTask Render");
  const [value, setValue] = useState("");
  const handleInput = (e: FormEvent) => {
    setValue((e.target as HTMLInputElement).value);
  };
  const handleAddTask = () => {
    addTask(value);
    setValue("");
  };
  return (
    <div className="p-1">
      <input
        className="border outline-none border-sky-400"
        value={value}
        onInput={handleInput}></input>
      <button
        className="rounded bg-sky-400 px-1 py-1 text-xs"
        onClick={handleAddTask}>
        add a task
      </button>
    </div>
  );
});

// 列表组件（动画的处理在这儿）
export default function List() {
  const [task, setTask] = useState(() => {
    return [
      {
        id: uuidv4(),
        text: "Buy eggs",
        // 每个列表项都需要渲染成组件，通过nodeRef保存该组件的DOM，从而让Transiton来控制DOM的动画
        nodeRef: createRef(),
      },
    ];
  });

  const addTask = useCallback((text: string) => {
    setTask((pre) => [...pre, { id: uuidv4(), text, nodeRef: createRef() }]);
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTask((pre) => pre.filter((item) => item.id !== id));
  }, []);

  return (
    <div className="p-3">
      <AddTask addTask={addTask}></AddTask>
      <TransitionGroup>
        {task.map((item) => (
          <CSSTransition
            nodeRef={item.nodeRef}
            timeout={time}
            classNames="item"
            key={item.id}>
            <ListItem
              key={item.id}
              {...item}
              deleteTask={deleteTask}></ListItem>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
```

css 部分

```css
.item-enter {
  opacity: 0;
}
.item-enter-active {
  opacity: 1;
  transition: opacity 500ms ease-in;
}
.item-exit {
  opacity: 1;
}
.item-exit-active {
  opacity: 0;
  transition: opacity 500ms ease-in;
}
```

### SwitchTransition

​ 没搞明白这怎么用。。。好像是可以在切换显示时控制离场和进场的顺序，例如 A、B 组
件，在条件成立时显示 A，B 先执行离场动画，再执行 A 的进场动画，而不是 A、B 组件
同时执行对应的动画导致页面混乱。

​ SwitchTransiton 有一个 mode 属性，可选值为：out-in 和 in-out。默认值为
out-in，也就是先执行退出动画，再执行进场动画。

#### 官网示例（示例 1）：

```tsx
function App() {
  const [state, setState] = useState(false);
  const helloRef = useRef(null);
  const goodbyeRef = useRef(null);
  const nodeRef = state ? goodbyeRef : helloRef;
  return (
    <SwitchTransition>
      <CSSTransition
        key={state ? "Goodbye, world!" : "Hello, world!"}
        nodeRef={nodeRef}
        // 	addEndListener会在动画执行后会触发，transitionend事件是DOM的过渡动画执行后触发
        addEndListener={(node, done) =>
          node.addEventListener("transitionend", done, false)
        }
        classNames="fade">
        <button
          ref={nodeRef}
          onClick={() => setState((state) => !state)}>
          {state ? "Goodbye, world!" : "Hello, world!"}
        </button>
      </CSSTransition>
    </SwitchTransition>
  );
}
```

```css
.fade-enter {
  opacity: 0;
}
.fade-exit {
  opacity: 1;
}
.fade-enter-active {
  opacity: 1;
}
.fade-exit-active {
  opacity: 0;
}
.fade-enter-active,
.fade-exit-active {
  transition: opacity 500ms;
}
```

#### 示例 2：

```tsx
import { useRef, useState, CSSProperties } from "react";
import { SwitchTransition, Transition } from "react-transition-group";

const TIME = 1000;

const defaultStyle = {
  transition: `transform ${TIME}ms,opacity ${TIME}ms`,
};

const transitionStyle: Record<string, CSSProperties> = {
  entering: {
    transform: "translate(-20px)",
    opacity: 0,
  },
  entered: {
    transform: "translate(0px)",
    opacity: 1,
  },
  exiting: {
    transform: "translate(20px)",
    opacity: 0,
  },
};

export default function Test01() {
  const [flag, setFlag] = useState(false);
  const handleClick = () => setFlag((pre) => !pre);
  const nodeRef01 = useRef(null);
  const nodeRef02 = useRef(null);
  const nodeRef = flag ? nodeRef01 : nodeRef02;
  return (
    <div className="p-5">
      <button
        className="rounded bg-sky-400 text-xs px-2 py-1"
        onClick={handleClick}>
        click me
      </button>
      <SwitchTransition>
        <Transition
          key={String(flag)}
          timeout={TIME}
          nodeRef={nodeRef}>
          {(state) => {
            console.log(state, transitionStyle[state]);
            return flag ? (
              <div
                ref={nodeRef}
                style={{
                  ...defaultStyle,
                  ...transitionStyle[state],
                }}>
                我出现了😍
              </div>
            ) : (
              <div
                ref={nodeRef}
                style={{
                  ...defaultStyle,
                  ...transitionStyle[state],
                }}>
                我隐藏了😅
              </div>
            );
          }}
        </Transition>
      </SwitchTransition>
    </div>
  );
}
```

### 路由与动画(官网示例)

#### main.ts

```tsx
import { createRoot } from "react-dom/client";
import React, { createRef } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./styles/index.css";
import "./styles/common.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

export const routes = [
  { path: "/", name: "Home", element: <Home />, nodeRef: createRef() },
  { path: "/about", name: "About", element: <About />, nodeRef: createRef() },
  {
    path: "/contact",
    name: "Contact",
    element: <Contact />,
    nodeRef: createRef(),
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routes.map((route) => ({
      index: route.path === "/",
      path: route.path === "/" ? undefined : route.path,
      element: route.element,
    })),
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
```

#### App 组件

```tsx
import { NavLink, useLocation, useOutlet } from "react-router-dom";
import { routes } from "./main";
import { SwitchTransition, CSSTransition } from "react-transition-group";

export default function App() {
  // 用于渲染当前路由组件
  const currentOutlet = useOutlet();
  // 获取当前路由路径
  const location = useLocation();
  // 保存路由组件DOM，当路由组件激活渲染时可以获取到组件的DOM实例
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {};
  return (
    <>
      <header className="flex bg-slate-100 h-10 justify-center items-center">
        <NavLink
          className="mr-1"
          to="/">
          Home
        </NavLink>
        <NavLink
          className="mr-1"
          to="/about">
          about
        </NavLink>
        <NavLink to="/contact">contact</NavLink>
      </header>
      <main className="px-2 py-1">
        <SwitchTransition mode="out-in">
          <CSSTransition
            // 每次key更新会重新渲染css-transiton组件
            key={location.pathname}
            // 让css-transition控制某个DOM的动画
            nodeRef={nodeRef}
            timeout={300}
            // 动画类名
            classNames="page">
            {(state) => (
              <div
                // 保存DOM实例
                ref={nodeRef}
                className="page">
                {currentOutlet}
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </main>
    </>
  );
}
```

#### css

```css
.page-enter {
  transform: scale(1.2);
  opacity: 0;
}

.page-enter-active {
  transform: scale(1);
  opacity: 1;
  transition: opacity 300ms, transform 300ms;
}

.page-enter-done {
  transform: scale(1);
  opacity: 1;
}

.page-exit {
  transform: scale(1);
  opacity: 1;
}

.page-exit-active {
  transform: scale(0.8);
  opacity: 0;
  transition: opacity 300ms, transform 300ms;
}

.page-exit-done {
  transform: scale(0.8);
  opacity: 0;
}
```

### 路由与动画（我的）

​ 我将官网的示例修改了下，去除了路由表上的 nodeRef，我认为不需要保存这个
nodeRef，由于每次 CSSTransition 在 key 更新时都是重新渲染的，所以就没有必要保存
这个 nodeRef。

#### main.ts

```tsx
import { createRoot } from "react-dom/client";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./styles/index.css";
import "./styles/common.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

export const routes = [
  { path: "/", name: "Home", element: <Home /> },
  { path: "/about", name: "About", element: <About /> },
  { path: "/contact", name: "Contact", element: <Contact /> },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routes,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
```

#### App.tsx

```tsx
import { NavLink, useLocation, useOutlet } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useRef } from "react";

export default function App() {
  // 用于渲染当前路由组件
  const currentOutlet = useOutlet();
  // 获取当前路由路径
  const location = useLocation();
  // 保存路由组件DOM，当路由组件激活渲染时可以获取到组件的DOM实例
  const nodeRef = useRef();
  return (
    <>
      <header className="flex bg-slate-100 h-10 justify-center items-center">
        <NavLink
          className="mr-1"
          to="/">
          Home
        </NavLink>
        <NavLink
          className="mr-1"
          to="/about">
          about
        </NavLink>
        <NavLink to="/contact">contact</NavLink>
      </header>
      <main className="px-2 py-1">
        <SwitchTransition mode="out-in">
          <CSSTransition
            // 每次key更新会重新渲染css-transiton组件
            key={location.pathname}
            // 让css-transition控制某个DOM的动画
            nodeRef={nodeRef}
            timeout={300}
            // 动画类名
            classNames="page"
            // 离场时卸载组件
            unmountOnExit>
            {(state) => (
              <div
                // 保存DOM实例
                ref={nodeRef}
                className="page">
                {currentOutlet}
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </main>
    </>
  );
}
```

# 坑

## 1.闭包与 useState

一个非常简单的计时器组件，但是暗藏杀机。

下面代码的效果就是点击开始，但页面中显示的 count 一直都是 1。

### 为什么

​ 为什么？因为在执行`startTime`时，会开启计时器，每一秒注册一个回调函数来执行。
在回调中我们使用了`setTime(time + 1)`的方式来更新 time 的值，而 time 这个变量并
没有在该函数中声明，JS 会通过执行上下文中的作用域链在外层函数中找到了 time 这个
变量，而这个变量的值是 0，所以就访问到了，最终成功调用`setTime`函数，重新执行渲
染函数生成新的 time。

​ 看似没问题但是问题大大的有，后续执行计时器注册的回调时，依旧会访问 time 变量，
所以 time 变量一直保存上一次 time 未更新时的执行上下文中，就会产生闭包，从而导致
计时器中的回调一直都访问只能旧的（闭包中的）time，而不能访问最新的 time。

```jsx
import { useEffect, useRef, useState } from "react";

export default () => {
  const [time, setTime] = useState(0);
  const timerId = (useRef < number) | (null > null);

  useEffect(() => {
    return stopTime;
  }, []);

  const startTime = () => {
    stopTime();
    timerId.current = setInterval(() => {
      // ❌ 错误
      setTime(time + 1);
    }, 1000);
  };

  const stopTime = () => {
    if (timerId.current !== null) {
      clearInterval(timerId.current);
      console.log("清除定时器");
      timerId.current = null;
    }
  };

  const resetTime = () => {
    stopTime();
    setTime(0);
  };

  return (
    <>
      <h1>开始了{time}秒</h1>
      <button onClick={startTime}>开始</button>
      <button onClick={stopTime}>停止</button>
      <button onClick={resetTime}>重置</button>
    </>
  );
};
```

### 解决方式

使用异步更新，消除闭包。

```diff
import { useEffect, useRef, useState } from "react";

export default () => {
  const [time, setTime] = useState(0);
  const timerId = useRef<number | null>(null);

  useEffect(() => {
    return stopTime;
  }, []);

  const startTime = () => {
    stopTime();
    timerId.current = setInterval(() => {
-	   setTime(time+1);
+      setTime((pre) => pre + 1);
    }, 1000);
  };

  const stopTime = () => {
    if (timerId.current !== null) {
      clearInterval(timerId.current);
      console.log("清除定时器");
      timerId.current = null;
    }
  };

  const resetTime = () => {
    stopTime();
    setTime(0);
  };

  return (
    <>
      <h1>开始了{time}秒</h1>
      <button onClick={startTime}>开始</button>
      <button onClick={stopTime}>停止</button>
      <button onClick={resetTime}>重置</button>
    </>
  );
};

```

## 2.副作用就应该交给 useEffect 处理！！！

我今天在封装一个倒计时钩子，该钩子可用传入两个参数来控制倒计时的时间，以及是否可
用控制倒计时的执行时机。在编写好后遇到了一个逆天 bug，呈现的效果就是在不停的在清
除定时器。

```diff
import { useEffect, useRef, useState } from "react";

/**
 * 倒计时钩子
 * 1.组件一开始就倒计时
 * 2.可控的倒计时
 * @param delay 倒计时多少秒才可用
 * @param control 是否可控
 */
function useCountDown(delay: number): { time: number; isDone: boolean };
function useCountDown(
  delay: number,
  control: boolean
): {
  time: number;
  isDone: boolean;
  startTime?: () => void;
  stopTime?: () => void;
};
function useCountDown(delay: number, control = false) {
  // 是否可用
  const [isDone, setDone] = useState(false);
  // 倒计时时间
  const [time, setTime] = useState(delay);
  // 计时器id
  const timerId = useRef<number | null>(null);

  // 开始倒计时
  const startTime = () => {
    timerId.current = setInterval(() => {
      setTime((pre) => {
        if (pre === 0) {
          stopTime();
          setDone(true);
          return 0;
        } else {
          return pre - 1;
        }
      });
    }, 1000);
  };

  // 暂停倒计时
  const stopTime = () => {
    if (timerId.current !== null) {
      clearInterval(timerId.current);
      timerId.current = null;
      console.log("清除计时器!");
    }
  };

  // 清除副作用
  useEffect(() => stopTime, []);

  if (control) {
    // 可控，由开发者控制时间
    return {
      startTime,
      stopTime,
      isDone,
      time,
    };
  } else {
    // 不可控，则直接运行开始倒计时
-    startTime(); // 问题所在，每次只要执行函数都会开启一次定时器，所以就会造成比较逆天的bug，就是每次状态更新都会重新执行一次这个函数，就会重新调用startTime这个函数，既然他是副作用，就应该使用useEffect来处理副作用啊
    return {
      time,
      isDone,
    };
  }
}

export default useCountDown;

```

**问题：**其实问题出在这里，当在倒计时是立即执行时（也就是 control 的值为
false），我会在函数体内部调用一次**startTime**，会立即开启计时器，我的目的也就是
这个样子，但是这种方式会造成比较严重的后果。

**原理**：由于**startTime**是在函数体内部调用的，也就意味着每次函数重新执行都会
调用一次**startTime**，所以就会造成只要使用该钩子的组件在重新渲染时都会执行一个
这个 hooks 函数，就会导致会调用一次**startTime**，并且在该钩子内部的状态更新时也
会导致 hooks 的重新执行，也会让**startTime**再次调用。

**解决方式：**让**startTime**在组件首次渲染时执行一次即可，也就是说交给
useEffect 来处理就好了。

```jsx
import { useEffect, useRef, useState } from "react";

/**
 * 倒计时钩子
 * 1.组件一开始就倒计时
 * 2.可控的倒计时
 * @param delay 倒计时多少秒才可用
 * @param control 是否可控
 */
function useCountDown(delay: number): { time: number; isDone: boolean };
function useCountDown(
  delay: number,
  control: boolean
): {
  time: number;
  isDone: boolean;
  startTime?: () => void;
  stopTime?: () => void;
};
function useCountDown(delay: number, control = false) {
  console.log('useCountDown')
  // 是否可用
  const [isDone, setDone] = useState(false);
  // 倒计时时间
  const [time, setTime] = useState(delay);
  // 计时器id
  const timerId = useRef<number | null>(null);

  // 开始倒计时
  const startTime = () => {
    timerId.current = setInterval(() => {
      setTime((pre) => {
        if (pre === 0) {
          stopTime();
          setDone(true);
          return 0;
        } else {
          return pre - 1;
        }
      });
    }, 1000);
  };

  // 暂停倒计时
  const stopTime = () => {
    if (timerId.current !== null) {
      clearInterval(timerId.current);
      timerId.current = null;
      console.log("清除计时器!");
    }
  };

  // 清除副作用
  useEffect(() => {
    return () => {
      stopTime();
    };
  }, []);

  if (control) {
    // 可控，由开发者控制时间
    return {
      startTime,
      stopTime,
      isDone,
      time,
    };
  } else {
    // 不可控，则直接运行开始倒计时
    // 使用useEffect来执行副作用代码
    useEffect(() => {
      startTime();
    }, []);
    return {
      time,
      isDone,
    };
  }
}

export default useCountDown;

```

## 3.在子组件重新渲染时不要修改父组件的状态

如果在子组件重新渲染时去更新父组件状态，react 就会报错：

```
Cannot update a component (`TaskList`) while rendering a different component (`Task`). To locate the bad setState() call inside `Task`....
```

大概意思就是无法在重新渲染 Task 组件时更新 TaskList 组件的状态。

### 复现问题

就是在重新渲染子组件时有去更新了父组件的状态就会报错，因为 setState 传入的函数会
在下一次重新渲染时执行，就会造成子组件状态更新后，重新渲染子组件时同时又执行了更
新父组件的状态的操作，就会报错。

```js
// 子组件代码

const handleToggleEdit = () => {
  // 更新子组件的状态
  setIsEdit((pre) => {
    if (pre) {
      // handleNameChange是一个更新父组件状态的函数。
      handleNameChange();
    }
    return !pre;
  });
};
```

### 解决问题

将更新父组件的操作移至到 setState 外部即可。

```diff
  // 更新编辑状态
  const handleToggleEdit = () => {
+    // do this
+    if (isEdit) {
+      // 由编辑状态更新为显示状态，提交本次更新
+      handleNameChange();
+    }
+    setIsEdit((pre) => !pre);
-    // donot this
-     setIsEdit((pre) => {
-       if (pre) {
-         // 由编辑状态更新为显示状态，提交本次更新
-         handleNameChange();
-       }
-       return !pre;
-     });
  };
```

## 4.不要滥用 useCallback

useCallback 是为了解决不必要的函数创建，如依赖项更新了才会重新创建函数。重新创建
函数就意味着函数在执行时的上下文会不一样，从而导致作用域链不一致访问的变量值也不
一样。

### 问题:count 为什么始终都是 1

这里有一个简易的计数器，通过 useState 创建了一个状态，定义了一个点击的处理函数每
次执行函数都会让 count 自增+1，并通过 useCallback 让函数缓存了。看上去一点没问题
，可是实际运行效果就是只有点击第一次的时候会更新，后续再怎么点击都不会更新了。

```tsx
const Count = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, []);

  return (
    <>
      <div>count:{count}</div>
      <button onClick={handleClick}>click me</button>
    </>
  );
};
```

### 解决

根本原因：实际上就是因为你缓存了函数，导致函数在执行时访问了旧的 count 值。

简单描述下：首次渲染时创建了**handleClick**函数，此函数在首次渲染时定义的，由于
此函数被永久缓存了，也就是说函数执行时 count 的值始终都是 0。

详细描述下：

状态 A：我们把首次渲染时的上下文称为**状态 A**，**状态 A**中保存的变量 count 值
为 0。当点击按钮触发**handleClick 函数**，此时**handleClick**需要使用 count 变量
，而 count 未在当前执行上下文中定义，所以通过作用域链访问了外层上下文，也就
是**状态 A**中的 count 变量，也就是 0。由于状态更新了，所以需要重新渲染，我们把
下一次重新渲染提供的上下文称为**状态 B**。

状态 B：重新渲染组件也就意味着需要重新执行函数，所以状态 B 中的变量 count=1，由
于**handleClick**被永久缓存了，并没有被重新定义。**handleClick**通过作用域链访问
到 count 变量的依旧是**状态 A**中的。点击按钮触发**handleClick**函数，函数在执行
时依旧需要通过作用域链访问到**状态 A**count 变量，由于函数是没有被重新定义的，也
就是说 handleClick 只能通过作用域链访问到定义时的上下文，也就是状态 A，无法访问
到状态 B 的。所以 count 依旧是 0，由于 React 对比状态是否更新通过
Object.is（count+1（更新时的新值），1（状态 B 中的 count）），发现没有任何更新，
所以 react 不会做任何操作。

图片描述：

<!-- ![image-20231220154233133](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20231220154233133.png) -->
图片占位符🥰

三种解决办法：

1. 不缓存

1. 增加 count 作为 useCallback 的依赖项

1. 异步更新 count
