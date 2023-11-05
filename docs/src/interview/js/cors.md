## 同源策略

什么是同源策略，同源策略是浏览器的一种安全策略，可以防止网站被恶意的攻击。当发生网络请求时，浏览器会将当前浏览器的 url 和请求目的的 url 进行对比，若两个 url 协议、域名（主机 ip）、端口号相同则满足同源策略，浏览器不会拦截本次请求的响应报文。

## 跨域

若在发生网络请求时，不满足同源策略，即为跨域，跨域会导致浏览器会拦截本次请求的响应报文，导致无法获取服务端响应的消息。

## 跨域解决方案

常见的跨域解决方案有：cors、代理服务器转发请求、jsonp

### cors

cors 是指服务端在响应头部中添加`Access-Control-Allow-Origin`告诉浏览器哪些源是可以信任的。

### 代理服务器

由于服务器与服务器通信是没有任何限制的，于是可以配置代理服务器用来转发请求实现跨域，代理服务器一般充当 web 网站站点、请求转发的角色。

::: tip
本地开发一般使用 webpack、vite 等脚手架配置本地服务器代理转发请求。

生产环境一般使用 nginx。
:::

### JSONP

jsonp 就是通过浏览器加载脚本文件时，不会因为跨域而受到影响，在响应成功后，会执行响应体中的 js 代码。

通过 jsonp 技术解决请求跨域问题的步骤:

1.  前端定义一个请求成功的函数，然后在特定时刻创建 script 标签，并指定请求路径 src，将 script 标签添加到 DOM 中，浏览器会通过 src 自动发请求获取资源内容。
2.  后端接受到请求后，执行相关业务后，在响应内容时，返回一个 js 脚本字符串，字符串内容为：执行这个前端定义的这个回调
3.  当浏览器加载 script 标签完成后，就会去执行 script 标签，执行这个回调，这样就完成了一次 jsonp 请求技术了。

为了帮助理解看下列案例：

#### LEVEL 1

例如，前端请求跨域的脚本资源时，后端提供接口和文件，浏览器加载成功后会立即执行文件里面的代码

##### 前端

```html
<script>
  function fun() {
    console.log("你好，jsonp");
  }
</script>

<!--跨域脚本资源文件可以被浏览器加载和执行，但这种写死的方式不推荐-->
<script src="http://127.0.0.1:8080/1.js"></script>
```

##### 后端

**服务代码**

```js
// 提供api
const server = require("http").createServer();
const fs = require("fs");
server.on("request", (req, res) => {
  if (req.url === "/1.js") {
    // 提供脚本文件实现jsonp
    const scriptString = fs.readFileSync("./1.js", "utf-8");
    res.setHeader("Content-type", "text/javascript");
    res.end(scriptString);
  } else {
    res.end("hello");
  }
});

server.listen(8080);
```

::: tip
上述的**1.js 静态资源**仅仅只是调用 fun 函数而已，注意，是因为前端定义了这个函数，当浏览器加载这个脚本文件后会立即执行该文件，所以就会执行 fun 函数

```js
fun();
```

:::

##### 结果

浏览器成功加载跨域的脚本文件，调用定义的 fun 函数，并打印结果
实际上运行就像就变成了这种

```html
<script>
  function fun() {
    console.log("你好，jsonp");
  }
</script>
<script>
  // 加载脚本文件...，加载完成时立即执行里面的内容
  fun();
</script>
```

#### LEVEL 2

只要后端响应的是一个可以执行的 js 字符串代码，则只要后端返回一个 js 字符串就可以实现浏览器加载 js 文件了。
注意:后端生成的 js 代码一定要注意函数名，一定要是和前端约定好的名称；调用函数时，可以将响应的结果传入作为参数。这样前端加载完成 script 文件后，会立即执行这个函数，函数的参数就是后端响应回来的真正结果了。

##### 前端

```html
<script>
  function fun(data) {
    console.log(data);
  }
</script>

<!--跨域脚本资源文件可以被浏览器加载和执行，但这种写死的方式不推荐-->
<script src="http://127.0.0.1:8080/api-jsonp"></script>
```

##### 后端

```js
// 提供api
const server = require("http").createServer();
server.on("request", (req, res) => {
  if (req.url === "/api-jsonp") {
    // 模拟业务层真实数据
    const data = JSON.stringify({
      msg: "ok",
      code: 200,
      data: [
        {
          name: "Mark",
          age: 18,
        },
      ],
    });
    // 拼接js代码,假如约定好，前端在成功后需要调用fun这个函数，并将响应的内容注入进去
    const javascriptString = `fun(${data})`;
    res.end(javascriptString);
  } else {
    res.end("404");
  }
});

server.listen(8080);
```

##### 结果

浏览器请求脚本文件----后端完成业务逻辑---后端拼接 js 代码响应成功---浏览器加载成功加载 js 文件---执行下列代码：

```
fun({"msg":"ok","code":200,"data":[{"name":"Mark","age":18}]})
```

#### LEVEL 3

既然使用 js 加载资源文件无跨域影响，则我们可以通过动态生成 js 标签去加载资源，加载后则会执行 js 代码。

```html
<script>
  function fun(data) {
    console.log(data);
  }

  JSONP("http://127.0.0.1:8080/api-jsonp");

  function JSONP(url) {
    const scriptTag = document.createElement("script");
    scriptTag.src = url;
    document.body.appendChild(scriptTag);
    scriptTag.onload = () => {
      scriptTag.remove();
    };
  }
</script>
```

## 参考

1. https://ruanyifeng.com/blog/2016/04/same-origin-policy.html
