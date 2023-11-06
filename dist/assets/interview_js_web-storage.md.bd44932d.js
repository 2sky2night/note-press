import{_ as s,o,c as a,Q as e}from"./chunks/framework.816b1713.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"interview/js/web-storage.md","filePath":"interview/js/web-storage.md","lastUpdated":1699188084000}'),n={name:"interview/js/web-storage.md"},l=e(`<h2 id="cookie、sessionstorage、localstorage-的区别" tabindex="-1">cookie、sessionStorage、localStorage 的区别 <a class="header-anchor" href="#cookie、sessionstorage、localstorage-的区别" aria-label="Permalink to &quot;cookie、sessionStorage、localStorage 的区别&quot;">​</a></h2><h3 id="cookie" tabindex="-1">cookie <a class="header-anchor" href="#cookie" aria-label="Permalink to &quot;cookie&quot;">​</a></h3><p>cookie 是存储在浏览器中<strong>4kb</strong>的字符串，每个网页（域）使用共享 cookie，cookie 会在网络请求时自动携带在请求头部中，供服务端解析识别信息，可以用来获取请求用户的身份，保存一写数据等功能。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>每当客户端接收到服务端响应的报文时，若响应头部存在 cookie 则会将 cookie 中的内容自动保存在当前域的 cookie 存储中。</p><p>每当客户端在发送网络请求时，若本地浏览器存储的 cookie 在<strong>对应域</strong>下有数据，默认情况下会自动将 cookie 携带至请求头部中，作为请求头部的 cookie 字段。</p></div><p>document.cookie 是一个可读可写的属性，读取时会把当前网页（域）中的所有 cookie 获取出来，写入 cookie 时，只能添加一个有效的 cookie，通常是一个键值对的字符串，并且也可以配置过期时间和域等设置。</p><p>cookie 不方便的就是对于单项 cookie 的读取，因为每次读取都是整个 cookie 数据，每个 cookie 数据通过分号相隔，需要通过解析才能读取。 例如通过以下方式解析 cookie 数据:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">document.cookie.</span><span style="color:#B392F0;">split</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;; &quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">reduce</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">pre</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">ele</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">key</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ele.</span><span style="color:#B392F0;">split</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;=&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> { </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">pre, [key]: value };</span></span>
<span class="line"><span style="color:#E1E4E8;">}, {});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">document.cookie.</span><span style="color:#6F42C1;">split</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;; &quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">reduce</span><span style="color:#24292E;">((</span><span style="color:#E36209;">pre</span><span style="color:#24292E;">, </span><span style="color:#E36209;">ele</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">key</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">value</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ele.</span><span style="color:#6F42C1;">split</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;=&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> { </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">pre, [key]: value };</span></span>
<span class="line"><span style="color:#24292E;">}, {});</span></span></code></pre></div><h3 id="sessionstorage" tabindex="-1">sessionStorage <a class="header-anchor" href="#sessionstorage" aria-label="Permalink to &quot;sessionStorage&quot;">​</a></h3><p>会话存储是存储在浏览中<strong>5mb</strong>的数据，每个网页（域）独享一个会话存储，这些数据都是以键值对的方式存在，这些数据会在关闭标签页时同时被销毁。通过相关 api 可以读写删除数据。</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sessionStorage.</span><span style="color:#B392F0;">getItem</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;key&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">sessionStorage.</span><span style="color:#B392F0;">setItem</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;key&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;value&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">sessionStorage.</span><span style="color:#B392F0;">remove</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;key&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">sessionStorage.</span><span style="color:#B392F0;">clear</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sessionStorage.</span><span style="color:#6F42C1;">getItem</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;key&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">sessionStorage.</span><span style="color:#6F42C1;">setItem</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;key&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;value&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">sessionStorage.</span><span style="color:#6F42C1;">remove</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;key&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">sessionStorage.</span><span style="color:#6F42C1;">clear</span><span style="color:#24292E;">();</span></span></code></pre></div><h3 id="localstorage" tabindex="-1">localStorage <a class="header-anchor" href="#localstorage" aria-label="Permalink to &quot;localStorage&quot;">​</a></h3><p>本地存储和会话存储基本差不多，只不过他不会在关闭网页时销毁数据，只能通过用户删除或 js 才能删除数据。</p><h3 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h3><ol><li><p><a href="https://blog.csdn.net/qq_35585701/article/details/81393361?ydreferer=aHR0cHM6Ly9saW5rLmp1ZWppbi5jbi8%3D" target="_blank" rel="noreferrer">https://blog.csdn.net/qq_35585701/article/details/81393361?ydreferer=aHR0cHM6Ly9saW5rLmp1ZWppbi5jbi8%3D</a></p></li><li><p><a href="https://juejin.cn/post/6914109129267740686#heading-0" target="_blank" rel="noreferrer">https://juejin.cn/post/6914109129267740686#heading-0</a></p></li></ol>`,14),p=[l];function t(r,c,i,E,y,d){return o(),a("div",null,p)}const k=s(n,[["render",t]]);export{g as __pageData,k as default};