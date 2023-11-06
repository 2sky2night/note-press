import{_ as s,o as n,c as o,Q as a}from"./chunks/framework.816b1713.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"interview/js/typeof-instanceof.md","filePath":"interview/js/typeof-instanceof.md","lastUpdated":1699188084000}'),l={name:"interview/js/typeof-instanceof.md"},p=a(`<h2 id="typeof-instanceof" tabindex="-1">typeof instanceof <a class="header-anchor" href="#typeof-instanceof" aria-label="Permalink to &quot;typeof instanceof&quot;">​</a></h2><h3 id="typeof" tabindex="-1">typeof <a class="header-anchor" href="#typeof" aria-label="Permalink to &quot;typeof&quot;">​</a></h3><p>typeof 可以输出数据的类型，基本数据类型除了 null 以外都是可以正确识别其类型，null 比较特殊，会输出 object。对于引用数据类型除了函数以外输出 function，其余都是输出 object</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">//boolean</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// number</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;ok&quot;</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// string</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// object</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">121</span><span style="color:#F97583;">n</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// bigint</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Symbol</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;hello&quot;</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// symbol</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// undefined</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> console.log); </span><span style="color:#6A737D;">// function</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> []); </span><span style="color:#6A737D;">// object</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> {}); </span><span style="color:#6A737D;">// object</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">//boolean</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// number</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;ok&quot;</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// string</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// object</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">121</span><span style="color:#D73A49;">n</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// bigint</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Symbol</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;hello&quot;</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// symbol</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// undefined</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> console.log); </span><span style="color:#6A737D;">// function</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> []); </span><span style="color:#6A737D;">// object</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> {}); </span><span style="color:#6A737D;">// object</span></span></code></pre></div><h3 id="instanceof" tabindex="-1">instanceof <a class="header-anchor" href="#instanceof" aria-label="Permalink to &quot;instanceof&quot;">​</a></h3><p>instanceof 的语法为 <code>ins intanceof A</code>,构造函数的 prototype 属性是否存在实例的原型链上，可以检测一个实例是否继承与某个类。</p>`,6),e=[p];function t(c,r,y,E,i,f){return n(),o("div",null,e)}const u=s(l,[["render",t]]);export{d as __pageData,u as default};
