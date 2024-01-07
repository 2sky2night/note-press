---
title: Next.js
outline: [1,2]
---

next.js，React版本的服务端同构渲染框架。

# 一、搭建 Next 应用

​	Next和Nuxt使用的都是同一种渲染流程，首次渲染使用服务端渲染（响应当前页面以及SPA的资源），后续客户端进行路由跳转时就请求对应的路由组件，并通过客户端 Router 操作DOM进行页面切换。

​	也就是说，首次渲染是服务端渲染，后续路由更新就是客户端渲染的方式。

​	Next服务器在接收到请求时若匹配上了路由，会对目标路由组件编译并执行，最终返回HTML给客户端，再次请求该页面时，Next会跳过编译直接执行路由组件得到结果，然后返回HTML给客户端，得益于缓存，提示了响应时间。

## 使用脚手架

利用脚手架快速创建Next模板应用。

使用js构建Next：`npx create-next-app@latest`

使用ts构建Next：`npx create-next-app@latest --typescript`

```
D:\随便写写\学习\next>npx create-next-app@latest --typescript
√ What is your project named? ... study-next  // 项目名称
√ Would you like to use ESLint? ... No / Yes  // 是否使用eslint
√ Would you like to use Tailwind CSS? ... No / Yes // 使用tailwindcss
√ Would you like to use `src/` directory? ... No / Yes // 创建src文件
√ Would you like to use App Router? (recommended) ... No / Yes //使用App 路由
√ Would you like to customize the default import alias (@/*)? ... No / Yes //是否需要自定义创建路径别名
√ What import alias would you like configured? ... @/* //路径别名的值为
```

进入项目根目录后使用`npm run dev`来启动项目。

通过next教授架创建的项目，目录结构为：

`.next`:这是Nextjs的缓存目录，在执行dev或者build等命令的时候，会在本地项目的根目录下生成此目录，开发不需要关注。想要了解更多的可以稍微研究一下，使用缓存/已生成的方式加速编译。

`node_modules`:项目的依赖文件。

`public`:这个主要放置静态资源，默认没有二级目录，为了方便可以简单创建几个目录来放相关资源。默认路径是在根目录，使用的时候可以使用类似`/favicon.ico`的形式引用。

`src`:这个目录是主要源代码的位置，初始目录下有`app`默认页和`pages`其他页面目录。

`.eslintrc.json`：主要是eslint的规则配置文件。

`.gitignore`：git排除文件。

`next-env.d.ts`：nextjs的一些ts相关内容，目前只有默认引用。

`next.config.js`：Nextjs的配置文件，这里默认只有`appDir`参数。

`package-lock.json`：项目依赖lock文件。

`package.json`：项目npm相关文件。

`README.md`：文档说明。

`tsconfig.json`：`typescript`相关配置文件。

## 不使用脚手架

## Next执行机制

默认情况下，Next.js会预渲染每个页面。这意味着Next.js提前为每个页面生成HTML，而不是让客户端JavaScript完成所有工作。预渲染可以带来更好的性能和SEO。

每个生成的HTML都与该页所需的最少JavaScript代码相关联。当浏览器加载页面时，它的JavaScript代码运行并使页面完全交互式。(这个过程被称为水合作用。)

# 二、页面路由

​	Next有两种路由模式，页面和应用，__建议学新版的应用级别的路由__，直接跳到`八、App Router`。

​	Next.js的路由系统和Nuxt.js一样都是基于文件系统的路由。Next配置路由需要在`/src/pages`文件夹中定义，每次接收到请求，都会根据请求路径与pages文件夹中的路由进行匹配。编译并打包、渲染路由组件最终响应给客户端。

> __提示__
>
> 若使用了脚手架创建的项目，请先删除src/app/page.tsx这个文件，再创建pages文件夹，因为App Router的优先级大于Page Router

## 1.定义路由表

在pages文件夹下创建路由后，其与路径的匹配关系为：

`/pages/index.tsx` —— `/`

`/pages/posts.tsx` —— `/posts`

`/pages/my/profile.tsx` —— `/my/profile`

`/pages/posts/index.tsx` —— `/posts`

## 2.路由导航

### 声明式

#### Link

​	使用Link组件进行路由导航，通过href属性指定需要导航的路径。

​	最终渲染效果就是是一个a标签，但这不是一个普通的a标签，他是一个被重写的超链接，在点击时不会请求完整页面，而是使用客户端渲染的方式加载路由组件资源，并使用 Router 来控制路由跳转。

```tsx
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/posts">Look for article.</Link>
    </div>
  );
}

```

如何验证Link是客户端渲染的？

​	你可以通过控制台给body设置一个背景色，然后点击这Link组件（客户端渲染），导航成功后看样式是否存在；再点击a标签（服务端渲染），导航成功后会发现样式消失了，这就是因为a标签会重新请求、渲染文档。

```tsx
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/posts">Look for article.</Link>
      <hr />
      <a href="/posts">To Posts (Native a tag)</a>
    </div>
  );
}

```

### 编程式

​	使用`useRouter`钩子来获取路由对象实例，可以用来导航、查看当前路由路径、查询参数、动态参数...

```tsx
import MyLayout from "@/app/layout";
import { useRouter } from "next/router";

export default function Posts() {
  const router = useRouter();
  const handleClick = () => router.push("/");
    
  return (
    <MyLayout>
      <div>
        <h1>Posts</h1>
        <button
          className="border text-xs px-2 py-1 bg-sky-300"
          onClick={handleClick}>
          Back to home.
        </button>
      </div>
    </MyLayout>
  );
}

```

## 3.动态路由

​	动态路由也就是对路径参数匹配上同一个路由组件。

### 简单使用【一个参数】😍

如何创建一个动态路由呢？

创建一个`/pages/user/[uid].tsx`，然后就可以通过`/user/1`来匹配上该路由了。然后可以通过`useRouter`来获取路径参数的值。

```tsx
import { useRouter } from "next/router";

export default function User() {
  const router = useRouter();
  // 对的，你没看错，query是动态参数，也是查询参数😅
  const { uid } = router.query;
  return (
    <div>
      <div>User id is {uid}</div>
    </div>
  );
}

```

### 稍有不适【多个参数】😅

我动态参数有两个，要怎么办呢？没问题，咱们Next对多个动态参数都进行了处理。

#### 示例1

例如有一个`/user/:uid/:page`的路由，那么我们需要创建`/pages/user/[uid]/[page].tsx`的路由组件。是的你没看错，就是文件名有点难看。

然后我们就可以通过`/user/52/2`来匹配上`[page].tsx`路由了。

#### 示例2

例如我有一个`/user/:xxx/yyy/:zzz`的路由，那么我们需要创建`/pages/[xxx]/yyy/[zzz].tsx`的路由组件。

既可以通过`/user/4/yyy/77`来匹配上路由。

### 有点恶心【捕获全部】🤢

Next拥有捕获所有路由参数的功能。可以在多个参数的情况下使用同一个路由组件，稍有不适那种情况参数个数不同对应的路由组件也不一样，而现在这个功能是多个参数公用一个组件，使用场景不一样。

例如我想要让`/user/:uid`和`/user/:uid/:page`都匹配同一个路由要咋整?

只需要创建`/pages/user/[...params].tsx`即可（不一定都叫params，可以自己取，router.query\[xxxx]，就是所有动态参数的值了），这样在访问这两种参数的路由时都可以匹配上该路由组件。

```tsx
const router = useRouter()
console.log(router.query) 
```

```
/user/1?ok=5 ---- {ok:"5",params:["1"]} // params属性名不固定根据你路由名称[...params]而定
/user/1/5 --- {params:["1","5"]}
/user/sasa/adsda/qwdqw/qwdwdq --- {params:["sasa","adsads"....]}
```

### 感到眩晕【可选参数】😵‍💫

假如我现在拥有`/user/[...params].tsx`的路由了，我直接访问`/user`会出现404，我想让我的网页可以让参数变得可选，从而可以正常访问`/user`匹配上`/user/[...params].tsx`，要怎么办呢?

很简单，只需要创建`/user/[[...params]].tsx`即可，这样就算未携带参数，也可以直接访问`/user/[[...paras]].tsx`组件了，就是这命名方式多少有点。。

### 非常难受【平行路由】🥵

App Router!!

<https://juejin.cn/post/7296330137284788275>

__aaa/@xxx/page.tsx__ 可以在 layout.tsx 里引入多个，叫做平行路由

### 地狱级别【拦截路由】💀

App Router!!

__aaa/(..)/bbb/page.js__ 可以拦截 /bbb 的路由，重写对应的组件，但是刷新后依然渲染原组件，叫做拦截路由。

<https://next.nodejs.cn/docs/app/building-your-application/routing/intercepting-routes>

### 天堂级别【分组路由】😇

App Router!!

路由组 (xxx) 加了个括号来表示分组，不参与导航。

## 4.路由传参

​	不论是动态参数还是查询参数都可以通过`useRouter().query`来获取。

​	例如：`/user/:uid` ，访问`/user/1?page=5`，则可以通过：

```tsx
const router = useRouter()
router.query // {uid:"1",page:"5"}
```

## 5.默认路由

​	index.tsx和page.tsx都是默认路由组件，例如：

```
/pages/index.tsx --- /
/pages/page.tsx --- /
/pages/user/index.tsx --- /user
/pages/user/page.tsx --- /user
/pages/user/[uid]/index.tsx --- /user/:uid
```

## 6.路由钩子

useRouter

# 三、静态资源

​	在Next的项目中，静态资源存储在public文件夹下，应用启动时会将public下的所有文件都挂载在Next服务器上。

​	例如`/public/dog.png`，则我们可以通过`/dog.png`或`localhost:3000/dog.png`来访问静态资源。同样的，文件夹中的文件也同样会被挂载，例如`/public/imgs/person/me.svg`，则我们可以通过`/imgs/person/me.svg`来访问该文件。

​	其实，任何文件都可以挂载在public文件夹中，甚至我们可以在public中创建index.html，在`localhost:3000/index.html`同样可以访问。__Next服务器在接收到请求时，会优先查看当前路径是否在public中存在，若存在则优先响应，若不存在才会通过路由系统匹配路由页面。__

# 四、元数据

​	这里的元数据是指网页的元数据，meta标签。Next提供了Head组件允许你在里面写入一些标签，并将这些标签添加到文档的head标签中。

## 简单示例

​	Next推荐编写meta、link、title标签在Head中，而不是在里面写UI、脚本。Head组件以外的UI内容都会被移入到路由组件中，这一点不需要担心。

```tsx
import Head from "next/head";

export default function Meta() {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="免费的 Web 教程"></meta>
        <meta
          name="keywords"
          content="HTML, CSS, JavaScript"></meta>
        <meta
          name="author"
          content="Bill Gates"></meta>
        <title>Meta Setting Page</title>
        <link
          ref="icon"
          href="/next.svg"></link>
      </Head>
      <div>
        <h1>Meta Page...</h1>
      </div>
    </>
  );
}

```

# 五、CSS

## 编码姿势

​	next内置开箱即用的tailwind css和css in js插件任君使用。如果你想使用 CSS Module、其他CSS in JS的差距，请随意！

### styled-jsx

​	styled-jsx是Next.js内置插件，可以直接使用，使用方式非常简单（并且扩展了css，可以使用scss预处理器编写css），并且不会污染其他组件、全局的样式（scoped）。个人感觉除了没提示以外都挺好的。

```tsx
export default function CSS() {
  return (
    <div>
      <h1>CSS coding</h1>
      <div>CSS in JS</div>
      <button>click me</button>
      <span className="fish-spin">🐟</span>
      <style jsx>{`
        h1 {
          color: red;
        }
        div {
          color: skyblue;
          font-size: 20px;
        }
        button {
          &:hover {
            background-color: blue;
          }
        }
        @keyframes Fish {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .fish-spin {
          display:inline-block;
          animation: Fish infinite 1s linear;
        }
      `}</style>
    </div>
  );
}

```

## 全局样式

​	这里会创建一个类似于根组件的文件，创建`/pages/_app.tsx`文件，他可以作为应用的根组件，每次渲染路由组件时都会执行一次，并且可以接收到一个props，其中包含了这些属性：

`pageProps`：传入的props。

`Components`：需要渲染的路由组件，一个函数式组件。

`router`：路由对象，其中包含了当前路由路径。

```tsx
// pages/_app.tsx
import { AppProps } from "next/app";
// 引入tindwind css或其他css文件
import "@/app/globals.css";

export default function App(props: AppProps) {
  // 需要被渲染的一级路由组件
  return <props.Component {...props.pageProps}></props.Component>;
}

```

`_app.tsx`作为根组件，适合用于全局样式导入、布局组件等功能。

## 使用CSS预处理器

​

# 六、布局组件

​	想让每个页面都有相似的结构（比如：后台管理系统，布局嵌入一级路由入口）？不妨自己编写一个布局组件，然后在路由组件中使用，这样就可以复用布局啦\~。

## 根组件

​	在`/app/layout.tsx`中默认导出的组件将会作为根组件。

```tsx
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}

```

## 局部

通过编写组件的方式复用UI结构

### 布局组件

```tsx
import { PropsWithChildren } from "react";
import { Inter } from "next/font/google";

// 引入tindwind css或其他css文件
import "./globals.css";
import Link from "next/link";

// 引入谷歌字体
const inter = Inter({ subsets: ["greek"] });

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className={inter.className}>
      <nav className="flex justify-around bg-slate-100 items-center py-2">
        <Link href="/">Home</Link>
        <Link href="/css">CSS</Link>
        <Link href="/meta">Meta</Link>
        <Link href="/posts">Post</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}

```

### 路由组件

```tsx
import MyLayout from "@/components/layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div>
        <h1>Home</h1>
        <Link href="/posts">Look for article.</Link>
        <hr />
        <a href="/posts">To Posts (Native a tag)</a>
      </div>
    </Layout>
  );
}

```

# 七、数据获取（Pages Router）

​	获取有两种方式，根据应用的模式来决定，若是SSR则使用__getServerSideProps__，若是SSG、ISG（增量生成）则使用__getStaticProps__和__getStaticPaths__。

## getServerSiderProps

​	是一个自己需要定义的函数，可以在路由组件加载时获取一些数据，其返回值可以作为参数传入路由组件中。

​	首先需要在路由组件文件中向外__按需暴露__`getServerSiderProps`函数，该函数必须是一个异步的函数。然后需要返回一个对象，对象中需要包含props属性，该props会被作为参数传入到路由组件中。

​	执行时机：

1. 首屏渲染时，服务器会调用此函数实现预渲染，得到完整的html页面响应给客户端。
2. 客户端请求该页面时，服务端直接响应该组件文件资源。在浏览器环境下渲染（执行）该组件时会以Ajax请求服务器接口，服务器再次调用该函数，最终响应结果。

### 1.定义

```ts
import { GetServerSideProps } from 'next';

const Page = props => {
    return <div>page</div>;
};

// 必须按需导出
export const getServerSideProps: GetServerSideProps = async context => {
    return {
        // 必须的返回值
        props: {}
    };
};

export default Page;
```

### 2.简单示例

```ts
import { GetServerSideProps } from "next";

interface Pokemon {
  name: string;
  url: string;
}
type PokemonList = Pokemon[];
interface Response {
  count: number;
  next: string;
  results: PokemonList;
}

export default function Pokemons({ results }: { results: PokemonList }) {
  return (
    <div>
      <h1>pokemons</h1>
      <hr></hr>
      <ul>
        {results.map((item) => (
          <li key={item.name}>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 此函数只会在服务器环境下运行
// 执行时机：
//  1.首屏渲染会调用此函数实现预渲染 
//  2.客户端请求并渲染对应路由组件时，会向服务器发送请求，服务器调用该函数并响应结果给客户端 
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { results }: Response = await (
    await fetch("https://pokeapi.co/api/v2/pokemon")
  ).json();
  console.log("server side");
  return {
    // props将作为对应路由组件的props传入
    props: {
      results,
    },
  };
};

```

### 3.context

`getServerSideProps` 中的 `context` 参数包含了常用的请求的 `req`、`res`、`params`、`query` 等参数，还包含了 `preview`、`previewData`、`resolvedUrl`、`locale` 等参数。

### 4.返回值或特殊处理

#### 将参数注入给页面组件

​	返回props即可在组件渲染时获取这些props数据。

#### 404

`getServerSideProps` 返回值除了可以设置 `props` 外还可以使用 `notFound` 来强制页面跳转到 404。

```tsx
export async function getServerSideProps(context) {
    const data = await getData();

    if (!data) {
        return {
            notFound: true
        };
    }

    return {
        props: { data }
}
```

#### 重定向

或者是使用 `redirect` 来将页面重定向。

```tsx
export async function getServerSideProps(context) {
    const data = await getData();

    if (!data) {
        return {
            redirect: {
                destination: '/',
                permanent: false // 是否永久重定向
            }
        };
    }

    return {
        props: { data }
    };
}
```

#### 500

如果 `getServerSideProps` 报错了，`next.js` 将会直接跳转到 500 页面，又省下一段异常处理代码，可喜可贺。

### 5.运行机制

当 `getServerSideProps` 所在页面为 `SSR` 服务端渲染（首屏渲染）时，`getServerSideProps` 中的数据将会被放到全局的 `_NEXT_DATA` 中，用于 `hydrate（水合）`。

而非 `SSR` 情况下，进入该页面 `next.js` 将会自动发请求到： `_next/data/development/{url}.json?{query}`，其中 `development` 为开发环境下地址段，该请求的返回值为：

```json
{
    "pageProps": "返回的 props 数据内容",
    "__N_SSP": true
}
```

从而将 `getServerSideProps` 返回值在页面挂载时注入进去。

### 6.注意

​	getServerSideProps无法调用内部接口，只能调用外部接口。

## getStaticProps

​	getStaticProps在SSG模式下使用，也就是静态网页。定义方式和getServerSideProps差不多，不过执行时机不一样，这个会在__build__的时候运行，用来生成静态网页。在渲染到使用了getStaticProps的组件时，会先执行获取后再执行组件渲染函数得到完整的静态页面。

​	例如Next应用中有个Home组件使用了getStaticProps，在打包时就会调用getStaticProps函数获取数据，并生成完整的页面。

## getStaticPaths

### 说明

​	搭配着getStaticProps一起使用，也会在build时候执行。

​	使用场景：在生成静态页面时包含了动态路由，由于不知道用户会访问哪些路径参数，使用getStaticPaths可以预先生成一些参数页面，若访问了预先生成的参数页面以外的就会根据策略来是否开启SSR模式。

​	例如有个动态参数路径的路由组件`/user/:id`，在打包时不知道未来会访问哪个值，所以可以通过getStaticPaths预先生成一些页面，比如生成id为1-10的10个静态页面，这样用户在访问`/user/1~10`时就可以直接返回静态页面接口，但访问了预设以外的参数，则会根据策略是否开启SSR，重新生成最新的页面，并将这个页面保存为静态页面，增加下一次请求的速度。

​	生成的静态页面可以在`/.next/server/pages`中查看。

### 用法

​	__函数返回值__是包含两个属性paths和fallback：

​	paths：一个数组代表了生成的静态页面个数，每个元素是一个对象包含一个params参数，表明每次生成静态页面时的路径参数值。

​	fallback：有三种取值方式，true（若请求预设以外的参数，则直接渲染组件同时发送请求获取数据）、false（404）、‘blocking’（开启SSR模式渲染页面，并保存此路径参数结果作为静态页面）。

### 执行流程

​	在通过build生成静态页面时，会先执行getStaticPaths获取需要生成静态页面个数，以及fallback策略。然后遍历paths数组，每次遍历都会创建一个静态页面，调用getStaticProps并将当前元素（包含了本次的路径参数）作为参数传入给getStaticProps，得到一个静态页面，直到遍历完成。

### fallback策略示例

#### blocking

​	会开启SSR渲染，客户端发送请求，会阻塞路由切换直到响应成功，服务器接收到请求后会调用`getStaticProps`，得到结果后响应给客户端，并保存此路径的静态页面。

```tsx
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
interface PokemonDetail {
  id: string;
  name: string;
  height: number;
  weight: number;
}

export default function Detail(props: PokemonDetail) {
  const nav = useRouter();
  const handleClick = () => nav.push(`/pokemons/${props.id + 1}`);
  return (
    <div>
      <h1>Pokemon Detail</h1>
      <div>ID:{props.id}</div>
      <div>Name:{props.name}</div>
      <div>
        <span>Weigth:{props.weight}</span>&nbsp;
        <span>Height:{props.height}</span>
      </div>
      <img
        width={100}
        height={100}
        alt={props.name}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`}
      />
      <button
        onClick={handleClick}
        className="rounded bg-sky-400 px-2 py-1 text-xs">
        Next Pokemon
      </button>
    </div>
  );
}

export const getStaticProps: GetStaticProps<{}, { id: string }> = async (
  context
) => {
  const { id } = context.params as { id: string };
  try {
    const data: PokemonDetail = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    ).then((r) => r.json());
    return {
      props: data,
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // 遍历生成20个静态页面，每次遍历都会执行getStaticProps并将这个返回值注入给context
    paths: Array.from({ length: 20 }).map((_, index) => {
      return {
        params: {
          id: index + 1 + "", // id为1-20
        },
      };
    }),
    // 访问了以外1-20以外的路径，则会开启SSR获取数据
    fallback: "blocking",
  };
};

```

#### true(异步加载)

​	fallback为真，则开启异步加载模式，若访问预设以外的参数，则会开启SSR渲染，客户端会对服务器发送Ajax请求获取最新数据，则服务器调用`getStaticProps`获取结果响应客户端，并以此参数路径生成最新的静态页面，提升下次请求统一参数值的请求速度。

```tsx
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
interface PokemonDetail {
  id: string;
  name: string;
  height: number;
  weight: number;
}

export default function Detail(props: PokemonDetail) {
  const nav = useRouter();
  if (props.id===undefined) {
    return <div>加载中</div>;
  } else {
    const handleClick = () => nav.push(`/pokemons/${props.id + 1}`);
    return (
      <div>
        <h1>Pokemon Detail</h1>
        <div>ID:{props.id}</div>
        <div>Name:{props.name}</div>
        <div>
          <span>Weigth:{props.weight}</span>&nbsp;
          <span>Height:{props.height}</span>
        </div>
        <img
          width={100}
          height={100}
          alt={props.name}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`}
        />
        <button
          onClick={handleClick}
          className="rounded bg-sky-400 px-2 py-1 text-xs">
          Next Pokemon
        </button>
      </div>
    );
  }
}

export const getStaticProps: GetStaticProps<{}, { id: string }> = async (
  context
) => {
  const { id } = context.params as { id: string };
  try {
    const data: PokemonDetail = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    ).then((r) => r.json());
    return {
      props: data,
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Array.from({ length: 10 }).map((_, index) => {
      return {
        params: {
          id: index + 1 + "",
        },
      };
    }),
    fallback: true,
  };
};

```

#### false

​	若fallback为false，则请求预设以外的参数都会跳转到404页面。

# 八、App Router

​	App Router（Application Router）和Pages Router都可以用来做路由系统的，不过App Router优先级更高，功能更完善些。

​	App Router中的所有组件默认都在服务端中加载，首屏渲染是，CSR模式下是发送请求获取页面内容，而页面内容需要服务端执行路由组件并响应完整的HTML结构给客户端，客户端获取到后直接嵌入浏览器替换旧的路由完成路由跳转的功能。

> 在 Next.js 13 之前，Pages Router 是在 Next.js 中创建路由的主要方式。 它使用直观的文件系统路由将每个文件映射到路由。 新版本的 Next.js 仍然支持 Pages Router，但我们建议迁移到新的 [应用路由](https://next.nodejs.cn/docs/app) 以利用 React 的最新功能。

## 1.文件约定

Next.js 提供了一组特殊文件来创建在嵌套路由中具有特定行为的 UI，__并且有且只能由这些文件名__:

| 文件名                                                                                                         | 含义                                                                                               |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [`layout`](https://next.nodejs.cn/docs/app/building-your-application/routing/pages-and-layouts#layouts)     | 段及其子段的共享 UI                                                                                      |
| [`page`](https://next.nodejs.cn/docs/app/building-your-application/routing/pages-and-layouts#pages)         | 路线的独特 UI 并使路线可公开访问                                                                               |
| [`loading`](https://next.nodejs.cn/docs/app/building-your-application/routing/loading-ui-and-streaming)     | 加载段及其子段的 UI                                                                                      |
| [`not-found`](https://next.nodejs.cn/docs/app/api-reference/file-conventions/not-found)                     | 未找到段及其子段的 UI                                                                                     |
| [`error`](https://next.nodejs.cn/docs/app/building-your-application/routing/error-handling)                 | 段及其子段的错误 UI                                                                                      |
| [`global-error`](https://next.nodejs.cn/docs/app/building-your-application/routing/error-handling)          | 全局错误用户界面                                                                                         |
| [`route`](https://next.nodejs.cn/docs/app/building-your-application/routing/route-handlers)                 | 服务器端 API 端点                                                                                      |
| [`template`](https://next.nodejs.cn/docs/app/building-your-application/routing/pages-and-layouts#templates) | 专门重新渲染布局 UI                                                                                      |
| [`default`](https://next.nodejs.cn/docs/app/api-reference/file-conventions/default)                         | [并行路由](https://next.nodejs.cn/docs/app/building-your-application/routing/parallel-routes) 的后备 UI |

文件结构---对应实际的组件结构。

![image-20231225102908806](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-file-conventions-component-hierarchy.png\&w=1920\&q=75\&dpl=dpl_BgDMtkMC7Ys3CBykeL1toqez4tqp)

### layout

​	布局组件，作为Next应用的根组件（替代`/pages/_app.tsx`和`/pages/_document.tsx`）。

​	每个路由都可以拥有Layout组件作为路由的公共部分，用来实现嵌套路由，但只有`/app/layout.jsx`组件可以拥有根组件和body组件。

> 根布局在 `app` 目录的顶层定义并适用于所有路由。 此布局使你能够修改从服务器返回的初始 HTML。

#### 根布局

```tsx
import { ReactNode } from "react";
import './globals.css'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}

```

> * `app` 目录必须包括根布局。
> * 根布局必须定义 `<html>` 和 `<body>` 标签，因为 Next.js 不会自动创建它们。
> * 你可以使用 [内置 SEO 支持](https://next.nodejs.cn/docs/app/building-your-application/optimizing/metadata) 来管理 `<head>` 个 HTML 元素，例如 `<title>` 元素。
> * 你可以使用 [路线组](https://next.nodejs.cn/docs/app/building-your-application/routing/route-groups) 创建多个根布局。 参见 [例子在这里](https://next.nodejs.cn/docs/app/building-your-application/routing/route-groups#creating-multiple-root-layouts)。
> * 根布局默认为 [服务器组件](https://next.nodejs.cn/docs/app/building-your-application/rendering/server-components)，__不能__ 设置为 [客户端组件](https://next.nodejs.cn/docs/app/building-your-application/rendering/client-components)。

> __从 `pages` 目录迁移：__ 根布局替换 [`_app.js`](https://next.nodejs.cn/docs/pages/building-your-application/routing/custom-app) 和 [`_document.js`](https://next.nodejs.cn/docs/pages/building-your-application/routing/custom-document) 文件。

#### 非根组件

​	非根组件的布局可以用来做路由嵌套的功能或兄弟路由的公共部分，注意非根布局不能添加`html`、`body`组件。

##### 兄弟路由

​	有`/user/my`和`/user/edit`两个路由，我想在my和edit路由组件显示一些公共的部分，可以创建`/app/user/layout.tsx`，并编写。

​	__注意__:这种方式意味着`/user`激活时依旧使用该布局组件!!

```tsx
export default Layout({children}:{children:ReactNode}){
    // children变量是当前激活的路由组件节点，可以直接用来渲染
    return <div>
    	<div>我是公共部分，可以用来做子路由的导航</div>
        {/*子路由入口，同viewrouter一样。*/}
        <div>{children}</div>
    </div>
}
```

##### 嵌套路由

### page

​	一个路由页面。只有文件夹中存在`page.tsx`文件，这个路由才会可达。

例如：

1. `/app/page.tsx` --- `/`
2. `/app/about/page.tsx` --- `/about`
3. `/user/goods/likes/page.tsx` ---`/user/goods/likes`

### loading

​	在CSR模式下，跳转到当前路由组件时，会向服务端发送请求获取路由组件片段，在请求过程中会显示loading组件。

​	SSR模式下不会渲染此组件，除非路由组件在执行过程中出现了错误，就会显示loading组件，并被替换成error组件。

```tsx
// /user/loading
export default function Loading() {
  return <h1>Loading</h1>;
}

```

### error

​	error是客户端组件。和Reac Router的errorElement差不多，如果说路由组件出现了错误，就会根据路由表查找自身或祖先是否有error.tsx组件，有就将渲染error.tsx组件，而不是渲染拥有error.tsx的组件。

​	error组件只会在客户端中渲染，组件可以接收两个参数error和reset，一个是错误信息，一个是重新加载当前路由（不是刷新页面，只是部分刷新）

```tsx
"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }>
        Try again
      </button>
    </div>
  );
}

```

### not-found

​	notFound是一个服务端组件。

#### 手动激活

​	not-found组件只会在路由组件中调用了`notFound`函数才会激活，激活时路由组件时执行了notFound函数，就会将原路由组件替换成not-found组件。

示例：

```tsx
// /app/user/[uid]/not-found.tsx
export default function NotFound() {
  return <div>找不到该用户</div>;
}
```

```tsx
// /app/user/[uid]/page.tsx
...
import { notFound } from "next/navigation";

type Props = {
  params: {
    uid: string;
  };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const userData = await getUser(props.params.uid);
    // getUser函数会在未找到用户时返回undefined
  if (userData === undefined) {
      // 设置标题
    return {
      title: "未找到用户",
    };
  }
  return {
    title: userData.name,
  };
}

export default async function UserDetail({ params: { uid } }: Props) {
  const userData = await getUser(uid);
  if (userData === undefined) {
      // 渲染notFound组件。
    return notFound();
  }
  const userPosts_P = getUserPosts(uid);
  return (
    <>
      <div>
        <div>ID:{userData.id}</div>
        <div>NAME:{userData.name}</div>
        <div>PHONE:{userData.phone}</div>
        <div>EMAIL:{userData.email}</div>
      </div>
      <hr></hr>
      <Suspense fallback={<div>Loading</div>}>
        {/*@ts-expect-error Server Component*/}
        <UserPost resolve={userPosts_P}></UserPost>
      </Suspense>
      <hr></hr>
      <Link
        href="/users"
        className="rounded px-2 py-1 bg-sky-400 text-xs">
        Back to Users
      </Link>
    </>
  );
}

```

#### 自动激活

​	在`/app/not-found`创建notFound组件，则会捕获未匹配路由时的错误，跳转到该页面中。

### route

​	编写接口的文件，支持这些请求方法。官方推荐的是将接口也放在对应路由中，但是这会导致一个问题就是`/user/route.ts`与`/user/page.ts`会发送冲突，导致会请求接口，而不是访问页面。

​	最好的做法就是在`/app/api/user/route.ts`创建接口文件，这样我们可以通过`/user`访问页面，`/api/user`来访问接口。

```tsx
export async function GET(request: Request) {}
 
export async function HEAD(request: Request) {}
 
export async function POST(request: Request) {}
 
export async function PUT(request: Request) {}
 
export async function DELETE(request: Request) {}
 
export async function PATCH(request: Request) {}
 
// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}
```

## 2.嵌套路由

通过文件夹来表示嵌套关系。例如：需要表示这种路由`/user/goods/likes`的嵌套关系并且激活时要显示组件路由的内容，对于则需要创建：

1. /user/layout.tsx  用来展示二级路由，以及`/user`激活时的公共部分
2. /user/goods/layout.tsx 用来展示三级路由，以及`/user/goods/`激活时的公共部分
3. /user/goods/like/page.tsx

## 3.修改Head

​	在App Router中有很多种方法来修改网页的Head部分。

### 1.Metadata

​	通过按需导出metadata变量，在里面写入各种配置项，Next会自动在路由激活时为网页添加元数据。

​	__注意__：使用了Metadata的方式就会导致在组件中编写的Head失效。

```tsx
import { Metadata } from "next";

export const metadata:Metadata={
  title: "制作人员",
  description:"Next学习"
}

export default function Person() {
  return <div>制作人员：张三 李四 王麻子</div>;
}

```

### 2.自定义Head组件

​	如果你不想太内聚，可以把head的内容拆分到单独的文件中。Next同样会把该组件的内容提升到文档的head标签内部。

创建Head组件:

```tsx
// about/head.tsx
export default function Head() {
  return (
    <>
      <title>About页面</title>
      <meta
        name="description"
        content="学习Next"></meta>
    </>
  );
}

```

引入:

```tsx
// about/page.tsx
import Head from "./head"

export default function About() {
  return (
    <>
      <Head></Head>
      <div>About</div>
    </>
  );
}

```

### 3.动态Head

​	例如帖子页面，需要让网页标题与帖子的标题同步，使用`generateMetadata`很有效。

​	他会在首次渲染时执行一次，服务器会执行`generateMetadata`以及__page__生成网页文档，执行完成（或Promise状态凝固）后，才会响应给客户端；在CSR模式下，客户端会请求该路由网页，服务器会执行`generateMetadata`以及__page__生成__网页片段__，执行完成（或Promise状态凝固）后，才会响应给客户端。

​	`generateMetadata`的执行结果是会被缓存的，缓存多久由Next决定。

#### 同步

```tsx
import { Metadata } from "next";

interface Props {
  params: {
    pid: string;
  };
}

export function generateMetadata(props: Props):Metadata {
  return {
    title:`文章id ${props.params.pid}`
  }
}

export default function (props: Props) {
  return <div>{props.params.pid}</div>;
}

```

#### 支持异步

​	在SSR下在__generateMetadata__完成后才会响应文档，在CSR下会发送请求，服务端执行__generateMetadata__、__对应路由组件__，都执行完成后才会响应文档片段。

```tsx
import { Metadata } from "next";

interface Props {
  params: {
    pid: string;
  };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  await new Promise((r) => setTimeout(r, 3000));
  return {
    title: `文章id ${props.params.pid}`,
  };
}

export default function (props: Props) {
  return <div>{props.params.pid}</div>;
}

```

## 4.动态路由

​	动态路由也就是对路径参数匹配上同一个路由组件。

### 简单使用【一个参数】😍

如何创建一个动态路由呢？

创建一个`/pages/user/[uid].tsx`，然后就可以通过`/user/1`来匹配上该路由了。然后可以通过`useRouter`来获取路径参数的值。

```tsx
import { useRouter } from "next/router";

export default function User() {
  const router = useRouter();
  // 对的，你没看错，query是动态参数，也是查询参数😅
  const { uid } = router.query;
  return (
    <div>
      <div>User id is {uid}</div>
    </div>
  );
}

```

### 稍有不适【多个参数】😅

我动态参数有两个，要怎么办呢？没问题，咱们Next对多个动态参数都进行了处理。

#### 示例1

例如有一个`/user/:uid/:page`的路由，那么我们需要创建`/pages/user/[uid]/[page].tsx`的路由组件。是的你没看错，就是文件名有点难看。

然后我们就可以通过`/user/52/2`来匹配上`[page].tsx`路由了。

#### 示例2

例如我有一个`/user/:xxx/yyy/:zzz`的路由，那么我们需要创建`/pages/[xxx]/yyy/[zzz].tsx`的路由组件。

既可以通过`/user/4/yyy/77`来匹配上路由。

### 有点恶心【捕获全部】🤢

Next拥有捕获所有路由参数的功能。可以在多个参数的情况下使用同一个路由组件，稍有不适那种情况参数个数不同对应的路由组件也不一样，而现在这个功能是多个参数公用一个组件，使用场景不一样。

例如我想要让`/user/:uid`和`/user/:uid/:page`都匹配同一个路由要咋整?

只需要创建`/pages/user/[...data].tsx`即可（不一定都叫params，可以自己取，router.query\[xxxx]，就是所有动态参数的值了），这样在访问这两种参数的路由时都可以匹配上该路由组件。

```
/user/1?ok=5 ---- {params:{data:["1"]},searchParams:{ok:"5"}}
/user/1/5 --- {params:{data:["1","5"]},searchParams:{}}
/user/sasa/adsda/qwdqw/qwdwdq --- {params:{data:["sasa","adsda"]},searchParams:{}}
```

### 感到眩晕【可选参数】😵‍💫

假如我现在拥有`/user/[...params].tsx`的路由了，我直接访问`/user`会出现404，我想让我的网页可以让参数变得可选，从而可以正常访问`/user`匹配上`/user/[...params].tsx`，要怎么办呢?

很简单，只需要创建`/user/[[...params]].tsx`即可，这样就算未携带参数，也可以直接访问`/user/[[...paras]].tsx`组件了，就是这命名方式多少有点。。

### 非常难受【平行路由】🥵

<https://juejin.cn/post/7296330137284788275>

__aaa/@xxx/page.tsx__ 可以在 layout.tsx 里引入多个，叫做平行路由

### 地狱级别【拦截路由】💀

__aaa/(..)/bbb/page.js__ 可以拦截 /bbb 的路由，重写对应的组件，但是刷新后依然渲染原组件，叫做拦截路由。

<https://next.nodejs.cn/docs/app/building-your-application/routing/intercepting-routes>

### 天堂级别【分组路由】😇

路由组 (xxx) 加了个括号来表示分组，不参与导航。

## 5.路由参数

​	App Router 获取路由参数大更新，路由参数可以直接在路由组件的props中获取。

​	路由组件的props只能获取两个参数`params`和`searchParams`。

```tsx
interface PageProps {
  // 路径参数
  params: {
    id: string;
  };
  // 查询参数
  searchParams:Record<string,string>;
}

export default function User(props: PageProps) {
  console.log(props); // {params:{...},searchParams:{...}}
  return <div>User Id is {props.params.id}</div>;
}

```

在参数不同的情况下params的值：

1.一个参数

​	例如`/user/[id]/page.tsx`，则params的值为 `{id:string}`

2.多个参数

​	例如`/data/[id]/xxx/[op]/page.tsx`，则params的值为`{id:string,op:string}`

3.捕获全部

​	例如`/user/[...data]`，则params的值为`{data:[参数列表]}`

4.可选参数

​	例如`/optional/[[...haha]]`，则有两种情况：

​	未传入任何参数：则params的值为`{}`

​	若传入值，和捕获全部的情况一样。

## 6.数据获取

### 简单示例

#### 1.创建获取数据的api

```tsx
// src/lib/getAllUser.ts

export default async function getAllUser() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (res.status !== 200) throw Error("Fetch Data Failed.");

  return res.json();
}

```

#### 2.创建ts定义文件

创建`types.d.ts`文件

```ts
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

```

任意名字都可以，只要是ts类型定义文件，ts编译器都会把他作为全局的类型定义，不需要引入就可以进行类型注释，因为在next项目中创建的ts.congfig.json自动配置了include选项，会自动把这些文件作为全局的类型定义文件。

```json
 "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
```

#### 在组件中使用

```tsx
import getAllUser from "@/lib/getAllUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "测试数据获取",
};

export default async function Users() {
  const usersData: Promise<User[]> = getAllUser();
  const users = await usersData;
  return (
    <div>
      <ul>
        {users.map((item) => {
          return (
            <li
              key={item.id}
              className="space-x-2">
              <span>name:{item.name}</span>
              <span>phone:{item.phone}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

```

### 异步加载

​	我想让组件内部的某些部分进行异步加载，需要怎么操作？就像Vue的Suspense组件一样，这次是真的和Suspense组件一样了，加载异步组件，同步渲染显示fallback插槽效果，异步组件加载完成后，替换fallback的内容。

​	在服务端中允许返回一个Promise的JSX片段。比方说我有个用户页面，想要优先加载用户的部分页面，而不是阻塞路由跳转直到加载完成，就可以用Suspense+async组件。下面这个案例就是优先加载用户页面，异步加载UserPost组件。

#### 使用异步的组件

​	使用异步组件需要注意，由于返回的是异步的JSX节点，会被TS报错，添加下列注释即可：

```
{/*@ts-expect-error Server Component*/}
```

```tsx
import UserPost from "@/app/components/UserPost";
import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
  params: {
    uid: string;
  };
};

export default async function UserDetail({ params: { uid } }: Props) {
  // 获取
  const userData = await getUser(uid);
  const userPosts_P = getUserPosts(uid);
  return (
    <>
      <div>
        <div>ID:{userData.id}</div>
        <div>NAME:{userData.name}</div>
        <div>PHONE:{userData.phone}</div>
        <div>EMAIL:{userData.email}</div>
      </div>
      <hr></hr>
      <Suspense fallback={<div>Loading</div>}>
        {/*@ts-expect-error Server Component*/}
        <UserPost resolve={userPosts_P}></UserPost>
      </Suspense>
      <hr></hr>
      <Link
        href="/users"
        className="rounded px-2 py-1 bg-sky-400 text-xs">
        Back to Users
      </Link>
    </>
  );
}

```

#### 需要异步加载的组件定义

​	是的，你没看错，可以直接返回一个异步的组件。

```tsx
export default async function ({resolve}:{resolve: Promise<Post[]>}) {
  const posts = await resolve
  
  return (
    <ul>
      <div>His Posts:</div>
      {posts.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}

```

## 7.渲染模式

## 8.路由导航

### 声明式

​	使用Link组件，和pages router一样的使用方式。Link组件在生产环境下，如果Link出现在浏览器视口中，则Link组件会根据其href属性，预先加载该页面的内容片段，再将来访问该页面时可以提高响应速度。

> 此外，在生产环境中，只要`<Link>`组件出现在浏览器的视图中，Next.js就会自动在后台预取链接路由的代码。当用户单击链接时，目标页面的代码已经在后台加载，这使得页面转换几乎是即时的!

### 编程式

​	客户端组件使用useRouter、服务端组件使用redirect。

### 服务端导航

​	例如需要鉴权的页面，用户无权限，可以通过`redirect`重定向某个页面

```tsx
import redisClient from "@/utils/redis";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Posts() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("sessionId");
  if (sessionId === undefined) {
    // 无权访问页面，重定向到401
    return redirect("/401");
  }
  redisClient.get(sessionId.value);
  return <div>{sessionId.value}</div>;
}

```

## 9.客户端组件

​	要想使用React的钩子，例如`useEffect`、`useState`等，需要给组件文件顶部写入一个`"use client"`来标识组件是客户端组件，从而可以使用客户端React钩子，禁用React服务端的钩子。

​	客户端组件只是意味着会在客户端中渲染，而不会在服务端中渲染。

```tsx
"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";

export default function SearchBar() {
  // 搜索关键词
  const [value, setValue] = useState(() => {
    // 请求获取一些搜索推荐词的操作
    return "今天圣诞节🎄";
  });
  // 导航
  const nav = useRouter();

  useEffect(() => {
    // 服务器端永远不会执行这个
    console.log("client");
  });

  const handleInput = useCallback((e: FormEvent) => {
    setValue((e.target as HTMLInputElement).value);
  }, []);

  const handleClick = useCallback(() => {
    setValue("");
    nav.push(`/search?keywords=${value}`);
  }, []);

  return (
    <div className="flex">
      <input
        className="outline-none"
        value={value}
        onInput={handleInput}></input>
      <button
        className="text-xs px-2 py-1 text-white bg-sky-400 hover:bg-sky-500"
        onClick={handleClick}>
        Search
      </button>
    </div>
  );
}

```

## 10.API Route

现在我们可以在Next中编写接口，文档规定的是

### 简单示例

​	创建`/app/api/hello/route.ts`，编写如下内容，就完成了一个简单的接口编写。

```tsx
// GET /api/hello
export async function GET() {
  return new Response('Hello,Next.js')
}
```

​	当然接口也可以嵌套编写。

​	创建`/app/api/hello/ok/route.ts`，编写如下内容，就完成了一个嵌套路由。这样就可以通过`/api/hello/ok`来访问接口了。

```tsx
import { NextResponse } from "next/server";

// GET api/hello/ok
export async function GET() {
  return NextResponse.json({ msg: "ok", data: {} });
}

```

### 请求方法

​	支持这些请求方法。

```ts
export async function GET(request: Request) {}
 
export async function HEAD(request: Request) {}
 
export async function POST(request: Request) {}
 
export async function PUT(request: Request) {}
 
export async function DELETE(request: Request) {}
 
export async function PATCH(request: Request) {}
 
// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}
```

### 请求上下文

#### 获取查询参数

```tsx
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // URL是node的全局方法，可以用来解析URL中的每个部分
  const { searchParams } = new URL(request.url)
  // 获取查询参数 (通过迭代器构造一个对象)
  const query = Object.fromEntries(searchParams.entries())
  // 返回响应
  return NextResponse.json({
    msg: "ok",
    data:query
  });
}

```

#### 获取请求体数据

##### 定义

```tsx
// /api/posts/routes.ts
import { NextResponse } from "next/server";

type CreatePostBody = {
  title: string;
  body: string;
};

export async function POST(request: Request) {
  const data: CreatePostBody = await request.json();
  request.json // 解析json数据
  request.formData // 解析formData数据
  console.log(data);
  return NextResponse.json({
    msg: "ok",
    data,
  });
}

```

##### 使用

```tsx
"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function PostCreate() {
  const router = useRouter();
  const [data, setData] = useState({
    title: "",
    body: "",
  });
  const handleUpdateTitle = (e: FormEvent) => {
    setData((pre) => ({ ...pre, title: (e.target as HTMLInputElement).value }));
  };
  const handleUpdateBody = (e: FormEvent) => {
    setData((pre) => ({ ...pre, body: (e.target as HTMLInputElement).value }));
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(data),
    }).then(() => {
      alert("发帖成功!");
      router.push("/");
    });
  };
  return (
    <div>
      <h1 className="text-xl font-semibold">Create A Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label>Article Title</label>
          <input
            value={data.title}
            onInput={handleUpdateTitle}
            className="border border-sky-300"></input>
        </div>
        <div className="flex flex-col">
          <label>Article Body</label>
          <textarea
            value={data.body}
            onInput={handleUpdateBody}
            className="border border-sky-300"></textarea>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="rounded px-2 py-1 bg-sky-400 text-white">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

```

### 路径参数

​	参数路径的接口可以这样创建。

```tsx
// /app/api/posts/[pid]/route.ts
import { NextResponse } from "next/server";

// /api/posts/:pid
export async function GET(
  _: Request,
  context: { params: Record<string, string> }
) {
  return NextResponse.json(
    {
      msg: "ok",
      data: context.params,
    },
    {
      status: 200,
      statusText: "ok",
    }
  );
}

```

### 响应Response

​	可以使用标准 Web API 方法在 Response 上设置 CORS 标头，Response可以配置响应头部。

```ts
export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: Request) {
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
```

## 11.中间件

​	中间件就是在请求和响应过程中执行的操作，在Next.js中，中间件的地位好像有点尴尬，明明在服务端运行的但又不能完整使用Node.js的API，只能执行浏览器相关的API。

### 全局中间件

​	在`根目录`或`src`下创建middleware.ts文件既可作为全局中间件。

```ts
import { NextResponse } from "next/server";

export function middleware(request: Request) {
  console.log(new URL(request.url).pathname);
  // 放行请求
  return NextResponse.next();
}

```

### 匹配中间件

```tsx
import { MiddlewareConfig } from "next/dist/build/analysis/get-page-static-info";
import { NextResponse } from "next/server";

export function middleware(request: Request) {
  console.log(new URL(request.url).pathname);
  // 放行请求
  return NextResponse.next();
}

export const config = {
  // 只有路径为/api的才会执行中间件
  matcher: "/api/:path*",
};

```

### 在中间件中执行重定向

```tsx
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/about/:path*',
}
```

### limiter

`limiter`是一个用于限制请求频率的Node.js库。它可以用于限制某些操作的频率，比如API请求、登录尝试、密码重置请求等，以防止恶意行为或意外的过度使用。

通过`limiter`库，你可以定义一个速率限制器，指定允许的请求速率（比如每秒多少次请求），然后在你的应用中使用这个限制器来控制请求的频率。如果请求超出了限制，`limiter`库可以帮助你拒绝请求或者采取其他自定义的行为。

这个库对于构建需要频率限制的应用程序非常有用，特别是在需要保护API端点或者控制用户行为的场景下。

#### 创建单实例的limiter

```tsx
import { RateLimiter } from "limiter";

export const limiter = new RateLimiter({
  // 可以发送150次请求
  tokensPerInterval: 150,
  // 一小时
  interval: "hour",
});

```

```tsx
import { NextResponse } from "next/server";
import { limiter } from "@/config/limiter";

export async function middleware(request: Request) {
  const remaining =await limiter.removeTokens(1);
  if (remaining === 0) {
    // 没有请求次数了!
    // ...
  }
  console.log("remaining:" + remaining);
  return NextResponse.next();
}

export const config = {
  // 只有路径为/api的才会执行中间件
  matcher: "/api/:path*",
};

```

## 12.Next.js函数

### 1.cookies

​	在App Router中，服务端组件可以调用cookies函数来获取本次请求客户端携带的cookie。这对于鉴权页面或需要通过身份返回不同的数据来说非常重要。

​	使用cookies就可以在服务端组件中操作客户端的cookie，增加、删除、修改、查询都是可以。

```tsx
import { cookies } from 'next/headers'

export default function Page() {
  const cookieStore = cookies()
  const sessionId = cookieStore.get('sessionId')
  if(sessionId){
	  return <div>你好，用户。</div>
  }else{
      return <div>请先登录</div>
  }
}
```

### 2.headers

​	在服务端组件中，你可以在组件中获取请求头部。

```tsx
import { headers } from 'next/headers'

export default function Page() {
  const headersList = headers()
  const referer = headersList.get('referer')

  return <div>Referer: {referer}</div>
}
```

### 3.notFound

​	在服务端组件中，你可以在用户请求不存在的资源时重定向到notFound组件中。Next会通过文件结构查找最近的not-found组件并渲染。

```tsx
import { notFound } from 'next/navigation'

async function fetchUser(id) {
  const res = await fetch('https://...')
  if (!res.ok) return undefined
  return res.json()
}

export default async function Profile({ params }) {
  const user = await fetchUser(params.id)

  if (!user) {
    notFound()
  }

  // ...
}
```

### 4.redirect

`redirect` 函数允许你将用户重定向到另一个 URL。 `redirect` 可用于服务器组件、客户端组件、[路由处理程序](https://next.nodejs.cn/docs/app/building-your-application/routing/route-handlers) 和 [服务器操作](https://next.nodejs.cn/docs/app/building-your-application/data-fetching/forms-and-mutations)。在客户端组件中使用还是推荐useRouter钩子。

```tsx
import { redirect } from 'next/navigation'

async function fetchTeam(id) {
  const res = await fetch('https://...')
  if (!res.ok) return undefined
  return res.json()
}

export default async function Profile({ params }) {
  const team = await fetchTeam(params.id)
  if (!team) {
    redirect('/login')
  }

  // ...
}
```

## 13.Next.js钩子

### 1.useRouter

​	可以进行导航、__刷新__、替换历史记录导航等功能。
