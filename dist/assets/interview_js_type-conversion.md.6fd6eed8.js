import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.816b1713.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"interview/js/type-conversion.md","filePath":"interview/js/type-conversion.md","lastUpdated":1699188084000}'),o={name:"interview/js/type-conversion.md"},p=l(`<h2 id="类型转换机制" tabindex="-1">类型转换机制 <a class="header-anchor" href="#类型转换机制" aria-label="Permalink to &quot;类型转换机制&quot;">​</a></h2><p>类型转换就是将变量存储的字面量的类型转换成另一个类型，有显示转换和隐式转换两种方式。</p><h2 id="显示转换" tabindex="-1">显示转换 <a class="header-anchor" href="#显示转换" aria-label="Permalink to &quot;显示转换&quot;">​</a></h2><p>其实就是强制类型转换，一般有 Number、parseInt（parseFloat）、String、Boolean 等等</p><h3 id="number" tabindex="-1">Number <a class="header-anchor" href="#number" aria-label="Permalink to &quot;Number&quot;">​</a></h3><p>Number 对于基本数据类型的转换严格，对于引用类型的数据会调用 Symbol.toPrimitive 方法再调用 toNumber,不过通常都是 NaN。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">Number</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// 1</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">Number</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// 0</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">Number</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;asdasd&quot;</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// not a number</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">Number</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;132&quot;</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// 132</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">Number</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;13s2&quot;</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// nan</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">Number</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// 0</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">Number</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// nan</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">Number</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// nan</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">Number</span><span style="color:#E1E4E8;">({})); </span><span style="color:#6A737D;">// 0</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">Number</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">Symbol</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;hello&quot;</span><span style="color:#E1E4E8;">))); </span><span style="color:#6A737D;">// 报错</span></span>
<span class="line"><span style="color:#6A737D;">// ...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">Number</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// 1</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">Number</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">false</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// 0</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">Number</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;asdasd&quot;</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// not a number</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">Number</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;132&quot;</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// 132</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">Number</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;13s2&quot;</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// nan</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">Number</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// 0</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">Number</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// nan</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">Number</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// nan</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">Number</span><span style="color:#24292E;">({})); </span><span style="color:#6A737D;">// 0</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">Number</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">Symbol</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;hello&quot;</span><span style="color:#24292E;">))); </span><span style="color:#6A737D;">// 报错</span></span>
<span class="line"><span style="color:#6A737D;">// ...</span></span></code></pre></div><h3 id="parseint-parsefloat" tabindex="-1">parseInt parseFloat <a class="header-anchor" href="#parseint-parsefloat" aria-label="Permalink to &quot;parseInt parseFloat&quot;">​</a></h3><p>和 number 差不多，不过对于字符串转换来说他是逐个解析，若碰到无法解析的就停止解析返回当前解析的结果，为第一个就不是数字就返回 NaN</p><h3 id="string" tabindex="-1">String <a class="header-anchor" href="#string" aria-label="Permalink to &quot;String&quot;">​</a></h3><p>将数据强制转换成字符型，基本上都是原样输出</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// true</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// false</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">n</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// 1，bigInt会被忽略n</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// 100</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1.55</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// 1.5</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// &#39;undefined&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// &#39;null&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">({})); </span><span style="color:#6A737D;">// [obeject Type]</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">Symbol</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;hello&quot;</span><span style="color:#E1E4E8;">))); </span><span style="color:#6A737D;">// Symbol(hello)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">String</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// true</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">String</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">false</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// false</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">String</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">n</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// 1，bigInt会被忽略n</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">String</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">100</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// 100</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">String</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1.55</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// 1.5</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">String</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// &#39;undefined&#39;</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">String</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// &#39;null&#39;</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">String</span><span style="color:#24292E;">({})); </span><span style="color:#6A737D;">// [obeject Type]</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">String</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">Symbol</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;hello&quot;</span><span style="color:#24292E;">))); </span><span style="color:#6A737D;">// Symbol(hello)</span></span></code></pre></div><h3 id="boolean" tabindex="-1">Boolean <a class="header-anchor" href="#boolean" aria-label="Permalink to &quot;Boolean&quot;">​</a></h3><p>将数据强制转换成布尔型，数字非 0true，0false，字符串空串 false，其余 true，引用数据都是 true，因为是那变量保存的地址值在转换</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">Boolean</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;123&quot;</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// true</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">Boolean</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// false</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">Boolean</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// false</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">Boolean</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1.55</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// true</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">Boolean</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// false</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">Boolean</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">)); </span><span style="color:#6A737D;">// false</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">Boolean</span><span style="color:#E1E4E8;">({})); </span><span style="color:#6A737D;">// true</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">Boolean</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">Symbol</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;hello&quot;</span><span style="color:#E1E4E8;">))); </span><span style="color:#6A737D;">// true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">Boolean</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;123&quot;</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// true</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">Boolean</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// false</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">Boolean</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// false</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">Boolean</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1.55</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// true</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">Boolean</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// false</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">Boolean</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">)); </span><span style="color:#6A737D;">// false</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">Boolean</span><span style="color:#24292E;">({})); </span><span style="color:#6A737D;">// true</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">Boolean</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">Symbol</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;hello&quot;</span><span style="color:#24292E;">))); </span><span style="color:#6A737D;">// true</span></span></code></pre></div><h2 id="隐式转换" tabindex="-1">隐式转换 <a class="header-anchor" href="#隐式转换" aria-label="Permalink to &quot;隐式转换&quot;">​</a></h2><p>隐式转换会出现在算术运算、逻辑运算、比较运算上。</p><h3 id="布尔型" tabindex="-1">布尔型 <a class="header-anchor" href="#布尔型" aria-label="Permalink to &quot;布尔型&quot;">​</a></h3><p>在需要布尔值的地方，系统会自动调用 Boolean 函数来，获得判断结果。<strong>例如 if、循环条件语句、三目运算符</strong></p><h3 id="数值型" tabindex="-1">数值型 <a class="header-anchor" href="#数值型" aria-label="Permalink to &quot;数值型&quot;">​</a></h3><p>在双目的算术运算中，遇到非数字类型的数据会自动将其转换成数字型，（字符串加法除外），若遇到无法转换的，则结果就为 NaN</p><h3 id="字符串" tabindex="-1">字符串 <a class="header-anchor" href="#字符串" aria-label="Permalink to &quot;字符串&quot;">​</a></h3><p>只要是字符串与任意数据作加法运算，其结果都为字符串的拼接。</p>`,23),e=[p];function t(c,r,y,E,i,F){return n(),a("div",null,e)}const g=s(o,[["render",t]]);export{C as __pageData,g as default};
