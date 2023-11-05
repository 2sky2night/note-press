## cookie、sessionStorage、localStorage 的区别

### cookie

cookie 是存储在浏览器中**4kb**的字符串，每个网页（域）使用共享 cookie，cookie 会在网络请求时自动携带在请求头部中，供服务端解析识别信息，可以用来获取请求用户的身份，保存一写数据等功能。

::: tip
每当客户端接收到服务端响应的报文时，若响应头部存在 cookie 则会将 cookie 中的内容自动保存在当前域的 cookie 存储中。

每当客户端在发送网络请求时，若本地浏览器存储的 cookie 在**对应域**下有数据，默认情况下会自动将 cookie 携带至请求头部中，作为请求头部的 cookie 字段。
:::

document.cookie 是一个可读可写的属性，读取时会把当前网页（域）中的所有 cookie 获取出来，写入 cookie 时，只能添加一个有效的 cookie，通常是一个键值对的字符串，并且也可以配置过期时间和域等设置。

cookie 不方便的就是对于单项 cookie 的读取，因为每次读取都是整个 cookie 数据，每个 cookie 数据通过分号相隔，需要通过解析才能读取。
例如通过以下方式解析 cookie 数据:

```ts
document.cookie.split("; ").reduce((pre, ele) => {
  const [key, value] = ele.split("=");
  return { ...pre, [key]: value };
}, {});
```

### sessionStorage

会话存储是存储在浏览中**5mb**的数据，每个网页（域）独享一个会话存储，这些数据都是以键值对的方式存在，这些数据会在关闭标签页时同时被销毁。通过相关 api 可以读写删除数据。

```ts
sessionStorage.getItem("key");
sessionStorage.setItem("key", "value");
sessionStorage.remove("key");
sessionStorage.clear();
```

### localStorage

本地存储和会话存储基本差不多，只不过他不会在关闭网页时销毁数据，只能通过用户删除或 js 才能删除数据。

### 参考

1. https://blog.csdn.net/qq_35585701/article/details/81393361?ydreferer=aHR0cHM6Ly9saW5rLmp1ZWppbi5jbi8%3D

2. https://juejin.cn/post/6914109129267740686#heading-0
