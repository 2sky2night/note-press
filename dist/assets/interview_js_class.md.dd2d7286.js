import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.816b1713.js";const F=JSON.parse('{"title":"class 相关","description":"","frontmatter":{},"headers":[],"relativePath":"interview/js/class.md","filePath":"interview/js/class.md","lastUpdated":1699188084000}'),o={name:"interview/js/class.md"},p=l(`<h1 id="class-相关" tabindex="-1">class 相关 <a class="header-anchor" href="#class-相关" aria-label="Permalink to &quot;class 相关&quot;">​</a></h1><h2 id="箭头函数与类字段语法" tabindex="-1">箭头函数与类字段语法 <a class="header-anchor" href="#箭头函数与类字段语法" aria-label="Permalink to &quot;箭头函数与类字段语法&quot;">​</a></h2><p>我们都知道箭头函数是没有 this 的，他的 this 是通过作用域链找到最近的祖先作用域中的 this 来确定的。箭头函数的 this 是定义时就已经确定了，不会因为执行的对象不同而导致 this 的不同。</p><h3 id="类字段语法" tabindex="-1">类字段语法 <a class="header-anchor" href="#类字段语法" aria-label="Permalink to &quot;类字段语法&quot;">​</a></h3><p>这种方式是类字段语法，类的属性可以直接在类的定义中声明和初始化，而不需要在构造函数中进行赋值，这种方式声明的属性会将其添加到实例上。</p><p>并且在这里声明的箭头函数在调用时会继承外部作用域（class）而让<code>this</code>执行实例，调用该箭头函数时，它的 <code>this</code> 值将绑定到类的实例上，而不是调用位置的上下文。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Obj</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">a</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;b&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">ok</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Obj</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ok</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> obj.ok;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">ok</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// {a:&#39;b&#39;,ok:[Function]}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Obj</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">a</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;b&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">ok</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Obj</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ok</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> obj.ok;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">ok</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// {a:&#39;b&#39;,ok:[Function]}</span></span></code></pre></div><h3 id="object" tabindex="-1">Object <a class="header-anchor" href="#object" aria-label="Permalink to &quot;Object&quot;">​</a></h3><p>为什么这种声明的方式不能让 this 指向 obj 呢？因为此箭头函数是在全局作用域中定义的。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { </span><span style="color:#B392F0;">ok</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">) };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ok</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> obj.ok;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">ok</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// window</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { </span><span style="color:#6F42C1;">ok</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">) };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ok</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> obj.ok;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">ok</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// window</span></span></code></pre></div>`,10),e=[p];function c(t,r,E,y,i,d){return a(),n("div",null,e)}const b=s(o,[["render",c]]);export{F as __pageData,b as default};
