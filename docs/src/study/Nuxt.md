---
outline: [1, 2]
---

# Nuxt

​ Nuxt 是一个基于 Vue3 的服务端渲染的框架。

​ 服务端渲染需要做的是就是接收请求，获取数据，根据模板与数据拼接渲染 html 字符串，响应 html 字符串，交给客户端渲染剩余页面。

​ 但 Nuxt 也不是严格意义上的服务端渲染，而是`同构渲染（预渲染）`，也就是首屏渲染是 Nuxt 应用通过消耗服务器资源，将该页面模板的 html 字符串响应给客户端，而后续的路由切换流程就是普通的 SPA 一致了。

​ Nuxt 应用在被访问时的基本流程：服务端根据请求路径和 pages 文件结构匹配路由，将命中的路由组件，编译成 js 文件并执行，预渲染为 html 字符串。客户端获取到后又会执行依次相关组件的 js 文件（**也就是首屏渲染时，程序会执行两次**）。在该 html 字符串中不仅包含该页面的资源，还包含了整个 Web 应用相关的资源都响应给客户端（如 Vue-Router、Vuex）等，后续路由更新可以通过加载对应路由组件，通过 JS 驱动整个页面了。

# 一、起步

## 1.创建 Nuxt 项目

创建项目的学习文档:https://juejin.cn/post/7165527740781690916#heading-6

### 1.使用官方命令创建项目（不建议）

使用命令创建新 Nuxt 项目:

```shell
pnpm dlx nuxi@latest init <project-name>
```

### 2.直接下载模板项目创建项目

#### 1.使用模板项目来开始项目的编写

```shell
git clone -b v3 https://gitee.com/2xx/starter.git
```

#### 2.直接下载项目模板包

第二种方式比较简单粗暴，直接下载脚手架中使用的模板，下载地址【[codeload.github.com/nuxt/starte…](https://link.juejin.cn/?target=https%3A%2F%2Fcodeload.github.com%2Fnuxt%2Fstarter%2Ftar.gz%2Frefs%2Fheads%2Fv3)】，然后解压就可以了，与第一种方式得到的最终效果是一致的。

#### 3.直接从 0 搭建

如果第二种也不能下载的话，可以尝试第三种，就是复制粘贴模板中的代码，直接依次在根目录下创建下面这些文件并粘贴即可：

##### package.json

```json
{
  "private": true,
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  },
  "devDependencies": {
    "nuxt": "3.0.0-rc.13"
  }
}
```

##### .gitignore

```
node_modules
*.log*
.nuxt
.nitro
.cache
.output
.env
dist
```

##### app.vue

```vue
<template>
  <div>
    <NuxtWelcome />
  </div>
</template>
```

##### nuxt.config.ts

```ts
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({});
```

##### tsconfig.json

```json
{
  // https://v3.nuxtjs.org/concepts/typescript
  "extends": "./.nuxt/tsconfig.json"
}
```

##### 🍗 安装依赖

选择自己的包管理工具安装依赖

```bash
bash复制代码# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

### 错误 1

​ 执行上述命令出现错误：

```
[13:58:05]  ERROR  Error: Failed to download template from registry: request to https://raw.githubusercontent.com/nuxt/starter/templates/templates/v3.json failed, reason: connect ECONNREFUSED 127.0.0.1:443
```

则为主机连不上 DNS 的错误，需要修改 dns 配置

在 windows 主机上:`C:\Windows\System32\drivers\etc`

使用记事本方式打开 `hosts` 文件，并在文件里面的最底部加上

```
185.199.108.133 raw.githubusercontent.com
185.199.108.133:443 raw.githubusercontent.com
```

保存即可。

## 2.Nuxt 的项目结构

### assets

​ assets 用来存放静态资源。

#### 1.将 css 应用到整个项目中

1. 在 assets/css 中创建 common.css 文件（common.css 为实例文件）
2. 在 nuxt.config.ts 中配置

```ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["assets/css/common.css"],
});
```

### pages

​ Nuxt 中的前端路由以 pages 文件结构来配置路由的。想要应用支持路由，需要在入口文件中添加`nuxt-page`组件，即可作为整个路由的入口。

pages 中的文件结构

```
index.vue  // 对应路径 "/"
user
	edit.vue // 对应路径 "/user/edit"
my
	info.vue // 对应路径 "/my/info"
	info
		something.vue // 对应路径 "/my/info/something"
post
	[id].vue // 对应路径 "/post/:id"
my.vue // 对应路径 "/my"
```

#### 1.路由入口

​ `nuxt-page`和`router-view`差不多

#### 2.声明式导航

​ `nuxt-link`可以进行客户端渲染式的导航，`nuxt-link`可以在页面不刷新的情况下（不过会发送请求加载该页面的 js 文件进行渲染，默认是`懒加载`）进行路由页面切换。`nuxt-link`和`router-link`一致。

```
<nuxt-link to="/post/1">文章</nuxt-link>
```

#### 3.编程式导航

​ useRouter、useRoute 可以直接使用无需引入。

#### 3.路由中间件

​ 路由守卫被路由中间件替代，代指在前端路由跳转前、后需要执行的回调。路由中间件在根目录下创建`middleware`文件夹。

中间件有三种：

##### **1.全局中间件**

​ 若文件名称带有.global 的后缀，则为全局守卫，每次路由更改时会自动执行回调。

```ts
// test.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to.path);
});
```

##### **2.命名中间件**

​ 可以指定某些路由执行中间件。

定义:

```ts
// auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  const isAuthenticated = () => {
    return store.islogin;
  };
  if (isAuthenticated() === false) {
    return navigateTo("/login");
  }
});
```

使用:

```vue
<template>
  <div>需要鉴权的页面</div>
</template>

<script lang="ts" setup>
// 定义路由元数据 === route.meta
definePageMeta({
  // 每次进入该路由时会执行的auth.ts路由守卫的回调
  middleware: "auth",
});
</script>
```

##### 3.匿名(或内联)路由中间件

​ 直接在使用它们的页面中定义。

```vue
<template>
  <div>需要鉴权的页面</div>
</template>

<script lang="ts" setup>
// 定义路由元数据 === route.meta
definePageMeta({
  middleware(to, from) {},
});
</script>
```

#### 4.路由元数据

Nuxt 通过 [`definePageMeta`](https://nuxt.com.cn/docs/api/utils/define-page-meta),可以向 route.mate 一样配置路由的元数据。

#### 5.路由参数校验

Nuxt 通过 [`definePageMeta`](https://nuxt.com.cn/docs/api/utils/define-page-meta)中的' validate '属性在你想要验证的每个页面中提供路由验证。

`validate`属性接受`route`作为参数。您可以返回一个布尔值，以确定这是否是要用此页呈现的有效路由。如果您返回`false`，并且无法找到另一个匹配项，这将导致 404 错误。你也可以直接返回一个带有 `statusCode`/`statusMessage`的对象，以立即响应一个错误(其他匹配不会被检查)。

如果您有一个更复杂的用例，那么您可以使用匿名路由中间件。

```vue
// pages/post/[id].vue
<script setup>
definePageMeta({
  validate: async (route) => {
    const nuxtApp = useNuxtApp();
    // Check if the id is made up of digits
    return /^\d+$/.test(route.params.id);
  },
});
</script>
```

#### 6.配置路由表(不太行？)

​ 可以对现有的路由表来进行自定义配置路由表

```ts
// app/router.option.ts
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [];

export default {
  routes: (_routes: RouteRecordRaw[]) => {
    return [..._routes, ...routes];
  },
};
```

### nuxt.config.ts

​ 配置 Nuxt 应用的文件。

#### 1.可以注入数据到根应用中。

​ runTimeConfig 可以配置全局访问的数据

```ts
  runtimeConfig: {
    // 这些数据只能在服务端中可以访问
    apiSecret: '123',
    // 这些数据只能在服务端中可以访问
    public: {
      apiBase: '/api'
    }
  }
```

利用`useRunTimeConfig`来读取这些数据

```ts
const config = useRuntimeConfig();

console.log(config.apiSecret);
console.log(config.public.apiBase);
```

可以使用`.env`文件来覆盖这些数据的中值

```
// .env
// 使用若runtimeConfig定义了key，则会被env文件覆盖，否则为undefined。
NUXT_KEY=200
```

#### 2.可以配置 ts 编译器

```ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        // 配置自动引入组件的类型声明
        types: ["./.nuxt/components.d.ts"],
      },
    },
  },
});
```

#### 3.开发者工具

```js
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
});
```

### app.vue

​ app.vue，前端项目的入口文件，整个网页视图靠`app.vue`文件的内容来渲染。Nuxt 项目无`main.ts`（Vue 项目的启动文件），Nuxt 会在幕后帮我们执行内置的程序入口文件，无须我们配置。

### components

​ 项目中，可重用的组件目录。在 Nuxt 中，组件不需要引入、注册，可以直接使用，因为 Nuxt 集成了自动导入组件、api 的插件。

​ 若像让组件获取 ts 类型支持，请看 ts.config.json 部分。

​ 例如：在 components 中创建 NButton.vue 文件，然后即可在任意组件中直接使用，并且可以直接获得 TS 的类型支持。

### ts.config.json

​ 为 Nuxt 项目的 ts 配置项，如果想要让 TS 编译器识别出组件的类型可以在这里配置`types`选项。

​ `.nuxt/components.d.ts`为 Nuxt 项目自动导入组件插件生成的类型声明的文件。

```json
{
  // https://nuxt.com/docs/guide/concepts/typescript
  "extends": "./.nuxt/tsconfig.json",
  "compilerOptions": {
    "types": ["./.nuxt/components.d.ts"]
  }
}
```

### server

​ server 为 Nuxt 应用的服务器部分，提供 HTTP 服务。可以采用 Nuxt 内置的接口编写方式，~~也可以使用 express、nest、koa 等服务端框架接入 Nuxt 应用来编写后端接口~~。

### app.config.ts

​ app.config.ts 和 nuxt.config.ts 中`runTimeConfig`差不多的功能，可以为其配置一些全局的环境变量数据。在应用中可以通过`useAppConfig`钩子来获取这些数据。

# 二、网络请求

## 1.配置代理服务器

### 1.使用 Nuxt 中间件拦截网络请求并转发

#### 依赖

```
npm i h3
```

#### 定义中间件

```ts
// server\middleware\apiProxy.ts
import { defineMiddleware, useBody, useCookies, useMethod, useQuery } from "h3";

const API_BASE = "/api"; // 拦截客户端 api
const BACKEND_URL = "https://v1.hitokoto.cn"; // 指向了后端服务地址

// 拦截api操作，转发后端接口
export default defineMiddleware(async (e) => {
  if (e.req.url.startsWith(API_BASE)) {
    // const url = BACKEND_URL + e.req.url;
    const url = BACKEND_URL;
    const method = useMethod(e);
    const query = useQuery(e);
    const headers = e.req.headers as any;
    const cookies = useCookies(e);
    const token = cookies["token"];
    if (!token || !token.length) {
      delete headers["token"];
    }

    headers["token"] = cookies["token"];
    let body = null;
    // 若非get请求需要携带请求体数据
    if ("GET" !== method.toUpperCase()) {
      body = await useBody(e);
    }

    return $fetch(url, {
      method,
      params: query,
      // headers,
      // body,
    });
  }
});
```

`API_BASE`为拦截客户端的接口请求。判断为`API_BASE`开头在 nuxt 服务器拦截代理。

#### 使用

pages 页面调用 localhost 即可，以`API_BASE`开头

```vue
<script setup>
const { pending, data, error } = useFetch("/api/getUser");
</script>
```

### 2.配置 nuxt.config.ts 转发请求

#### 1.devServer

​ 用来给网页请求做转发代理的

```ts
nitro:{
 	// 网络请求的代理
    devProxy: {
      '/api': {
        target: 'http://127.0.0.1:3001/api', // 这个api请求路径前缀为服务器自定义的
        changeOrigin: true,
        prependPath: true
      }
    }
}
```

#### 2.routeRules

​ 若为客户端渲染则不需要配置`routeRules`，不需要转发请求。服务端渲染则需要配置该选项。

```ts
  nitro: {
    // 若nuxt为ssr模式，需要配置服务端代理转发，
    // 当nuxt服务器接收到api开头的请求时转发给目标服务器
    routeRules: {
      // 当请求路径包含/api
      // 会将请求转发给对应服务器，发请求时会将**部分拼接为目标url发送请求。
      '/api/**': {
        proxy: 'http://127.0.0.1:3001/api/**' // 这个api请求路径前缀为服务器自定义的
      }
    }
  },
```

#### 3.完整配置项

```ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    // 若nuxt为ssr模式，需要配置服务端代理转发，
    // 当nuxt服务器接收到api开头的请求时转发给目标服务器
    routeRules: {
      // 当请求路径包含/api
      // 会将请求转发给对应服务器
      "/api/**": {
        proxy: "http://127.0.0.1:3001/api/**", // 这个api请求路径前缀为服务器自定义的
      },
    },
    // 网络请求的代理
    devProxy: {
      "/api": {
        target: "http://127.0.0.1:3001/api", // 这个api请求路径前缀为服务器自定义的
        changeOrigin: true,
        prependPath: true,
      },
    },
  },
});
```

## 2.获取数据

​ 网络请求方面最好不要选择未被 nuxt 封装过的 api，因为在首屏渲染时页面会被执行两次，一次是服务端预渲染，一次是客户端执行时也会执行，使用未被处理的 api，所以会导致发送两次请求。

例如使用 axios 会导致请求会发送两次，一次是后端，一次是前端

```ts
import axios from "axios";

axios.get("http://127.0.0.1:3001/api/hello").then((result) => {
  console.log(result);
});
```

### 1.useFetch

​ useFetch 可以保证不会发送多余的请求。

​ 返回值:

1. data:请求结果
2. pending：还在等待响应结果？
3. refresh：
4. error：获取数据失败，返回错误对象

```ts
const { data } = await useFetch("http://127.0.0.1:3001/api/hello");
```

### 2.useAsyncData

```ts
useAsyncData("获取随机10条文章", () => {
  // 此处可以编写自己的逻辑
  return $fetch("/navigation/web/random?number=10", {
    method: "get",
    baseURL: "https://nav.zym88.cn/api",
  }).then((res) => {
    console.log(res);
  });
});
```

​ 本质上 useFetch 和 useAsyncData 没有什么区别，useAsyncData 可以在请求的时候编写自己的业务逻辑

### 3.useLazyFetch

​ 该 api 的网络请求不会阻塞首屏渲染的响应时间。上述方式都是需要请求完成并渲染之后才会响应模板给客户端，该 api 是异步的请求数据，不会阻塞整个首屏的渲染，和 suspence 组件类似。

# 三、SEO 与 Meta

​ meta 标签的作用：https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML

## 1.全局配置

​ 全局配置网页元信息 meta，可以在 nuxt.config.ts 中进行配置网页的 meta 元信息。

[更多配置项](https://nuxt.com.cn/docs/api/nuxt-config)

```ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "你好！",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        {
          name: "keywords",
          content: "Nuxt3,Study,Record",
        },
        {
          name: "description",
          content: "A Project About Study Nuxt 3.",
        },
      ],
    },
  },
});
```

## 2.页面独享配置

​ 对某个页面单独配置 head 中的信息可以使用`useHead`

### useHead

​ useHead 可以为某个页面单独配置 meta、头部、body、加载外部资源等信息。[useHead 相关配置项](https://unhead.unjs.io/)

```ts
useHead({
  title: title.value,
  meta: [
    {
      name: "description",
      content: "这是学习Nuxt3框架的首页",
    },
  ],
  bodyAttrs: {
    class: "dark",
  },
  script: [],
});
```

### useSeoMeta

```vue
<script setup lang="ts">
useSeoMeta({
  title: "我的神奇网站",
  ogTitle: "我的神奇网站",
  description: "这是我的神奇网站，让我来告诉你关于它的一切。",
  ogDescription: "这是我的神奇网站，让我来告诉你关于它的一切。",
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image",
});
</script>
```

### 支持响应式数据

​ useHead 是支持配置响应式数据的，要想让 head 中的信息可以响应式更新，需要提前定义好一个 computed 依赖的数据。

​ 官方说无论是**computed**还是**getter**函数都是可以的，不过推荐使用**getter**函数

```ts
const title = ref("首页");
// computed
const _title = computed(() => title.value);
// getter函数
const _titleGet = () => title.value;

setTimeout(() => {
  title.value = "123";
}, 1000);

useHead({
  title: _titleGet,
  meta: [
    {
      name: "description",
      content: "这是学习Nuxt3框架的首页",
    },
  ],
  bodyAttrs: {
    class: "dark",
  },
  script: [],
});
```

## 3. 路由与网页标题

​ 通常，我们想根据不同的页面呈现不同的网页标题。

### 方式 1

​ useHead 钩子可以在任意地方使用，所以我们可以：

1. 在路由组件中通过`definePageMate`配置路由的元信息
2. 在全局路由中间件中通过读取路由元信息`to.meta.title`
3. 通过`useHead`配置页面的 title。

### 方式 2

​ 1.在对应页面通过`useHead`配置该页面的 title

```ts
// pages/post.vue
useHead({
  title: "文章",
});
```

2. 在 app 根组件中，通过标题模板来配置网页标题，根组件优先级更高。

```vue
// app.vue（根组件）
<template>
  <nuxt-page></nuxt-page>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    console.log(titleChunk);
    const siteName = "Nuxt3学习";
    return titleChunk ? `${titleChunk} - ${siteName}` : siteName;
  },
});
</script>
```
