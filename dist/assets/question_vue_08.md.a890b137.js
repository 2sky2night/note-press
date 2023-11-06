import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.816b1713.js";const d=JSON.parse('{"title":"路由模式","description":"","frontmatter":{},"headers":[],"relativePath":"question/vue/08.md","filePath":"question/vue/08.md","lastUpdated":1699188084000}'),l={name:"question/vue/08.md"},o=p(`<h1 id="路由模式" tabindex="-1">路由模式 <a class="header-anchor" href="#路由模式" aria-label="Permalink to &quot;路由模式&quot;">​</a></h1><h2 id="前端路由" tabindex="-1">前端路由 <a class="header-anchor" href="#前端路由" aria-label="Permalink to &quot;前端路由&quot;">​</a></h2><p>浏览器的路由模式有两种:history 和 hash 模式，他们的表现形式都是在 url 呈现的，只不过 hash 模式以 hash 值表述，history 模式以模拟路径表示，他们两个相同点都是值发生变化时都不会导致 http 请求，比较大的不同点是第一次加载页面时，会发生一次网络请求加载 html 资源，但是 hash 值不会被后端接受到，而 history 模式下对应的模拟路径也会被当成请求的路径，从而会导致不能正确的加载 html 资源。</p><p>一个 URL 信息可以从 location 对象可以看出，如<code>(http://127.0.0.1:3001/sadasd?op=8#/dsad)</code>会被解析成:</p><p>host:&#39;127.0.0.1:3001&#39; 主机名</p><p>pathname:&#39;/sadasd&#39;</p><p>port:&#39;3001&#39;</p><p>hash:&#39;#/dasd&#39;</p><p>protocol:&#39;http:&#39;,</p><p>search:&#39;?op=8&#39;</p><p>....</p><h2 id="hash-模式" tabindex="-1">hash 模式 <a class="header-anchor" href="#hash-模式" aria-label="Permalink to &quot;hash 模式&quot;">​</a></h2><p>​ hash 模式的原理就是通过监听，url 上的 hash 值变化，根据当前 hash 值与路由表进行匹配，从而渲染对应内容。如何监听 hash 值的变化呢？使用 onhashchange 即可监听浏览器 hash 值变化了，hash 值变化从之执行相关操作即可。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 路由表</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">routes</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: </span><span style="color:#9ECBFF;">&quot;/home&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    template: </span><span style="color:#9ECBFF;">&quot;&lt;h1&gt;this is home&lt;/h1&gt;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: </span><span style="color:#9ECBFF;">&quot;/user&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    template: </span><span style="color:#9ECBFF;">&quot;&lt;div&gt;this is user&lt;/div&gt;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#6A737D;">// hash值变化时</span></span>
<span class="line"><span style="color:#E1E4E8;">window.</span><span style="color:#B392F0;">onhashchange</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">ev</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ev为一个事件对象，包含了新旧的url值等等</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">path</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ev.newURL.</span><span style="color:#B392F0;">split</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;#&quot;</span><span style="color:#E1E4E8;">)[</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 解析出路由路径后，进入路由表进行匹配，渲染对应内容</span></span>
<span class="line"><span style="color:#E1E4E8;">  routes.</span><span style="color:#B392F0;">some</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">ele</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (ele.path </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> path) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      body.innerHTML </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ele.template;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 路由表</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">routes</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    path: </span><span style="color:#032F62;">&quot;/home&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    template: </span><span style="color:#032F62;">&quot;&lt;h1&gt;this is home&lt;/h1&gt;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    path: </span><span style="color:#032F62;">&quot;/user&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    template: </span><span style="color:#032F62;">&quot;&lt;div&gt;this is user&lt;/div&gt;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#6A737D;">// hash值变化时</span></span>
<span class="line"><span style="color:#24292E;">window.</span><span style="color:#6F42C1;">onhashchange</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">ev</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ev为一个事件对象，包含了新旧的url值等等</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">path</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ev.newURL.</span><span style="color:#6F42C1;">split</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;#&quot;</span><span style="color:#24292E;">)[</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 解析出路由路径后，进入路由表进行匹配，渲染对应内容</span></span>
<span class="line"><span style="color:#24292E;">  routes.</span><span style="color:#6F42C1;">some</span><span style="color:#24292E;">((</span><span style="color:#E36209;">ele</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (ele.path </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> path) {</span></span>
<span class="line"><span style="color:#24292E;">      body.innerHTML </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ele.template;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h2 id="history-模式" tabindex="-1">history 模式 <a class="header-anchor" href="#history-模式" aria-label="Permalink to &quot;history 模式&quot;">​</a></h2><p>​ history 模式主要是使用 pushState、replaceState 这两个 API 实现 url 上 pathname 的变化，而 popState 做为 window 上的事件监听，可以监听浏览器前进或后退，从而执行渲染对应内容。</p><p>API</p><p>​ history.pushState(state,title,path)</p><p>​ 第一个参数可以作为路由传参的方式来保存数据？</p><p>​ 第二个是浏览器标题，一般传入空串即可，大部分浏览器会忽略该参数</p><p>​ 第三个是 path 路径，调用后 url 的 pathname 就会变成对应的 path 值。</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">history.</span><span style="color:#B392F0;">pushState</span><span style="color:#E1E4E8;">({}, </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;home&quot;</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">history.</span><span style="color:#6F42C1;">pushState</span><span style="color:#24292E;">({}, </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;home&quot;</span><span style="color:#24292E;">);</span></span></code></pre></div><p>调用后 url 上的 pathname 就会变成第三个参数的值，然后就可以根据 pathname 来匹配路由，从而渲染对应路由视图，<strong>注意调用 pushState 或 replaceState 都不会触发 popstate 事件。</strong></p><p>事件 popState</p><p>​ popState 会在浏览器前进后退时会触发，函数可以接受到一个事件对象，里面有对应 pushState 时传入的 state，事件触发后可以根据当前 pathname 匹配路由表来渲染对应路由</p>`,25),t=[o];function e(c,r,E,y,h,i){return a(),n("div",null,t)}const F=s(l,[["render",e]]);export{d as __pageData,F as default};
