import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.816b1713.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"interview/js/requestAnimation.md","filePath":"interview/js/requestAnimation.md","lastUpdated":1699188084000}'),p={name:"interview/js/requestAnimation.md"},o=l(`<h2 id="requestanimationframe" tabindex="-1">requestAnimationFrame <a class="header-anchor" href="#requestanimationframe" aria-label="Permalink to &quot;requestAnimationFrame&quot;">​</a></h2><p>requestAnimationFrame 可以通过 JS 控制动画，通过回调里面的操作来通知浏览器以该操作来重绘页面。</p><p>在反复调用该方法时，则会每帧执行一次回调函数，但帧这个东西时根据屏幕刷新率来定的，虽说在各种显示屏下触发的间隔可能不同，但是在同一屏幕刷新率下每次执行的间隔时间都是相同的。</p><p>定时器就不同了，可能会因为事件循环而产生时间间隔的误差（因为是红任务，红任务会在消息队列中排队到主线程处理，若到时间了但前面有任务没执行，就会产生误差），但<code>requestAnimationFrame</code>是异步任务，他可以保证反复执行时回调触发的间隔时间都是相同的。</p><p>基本用法:<code>requestAnimationFrame(callback)</code>,回调函数可以接受一个参数，这个参数代表了从页面加载完毕到执行该回调的时间，一般用来计算动画开始时间与动画执行的时间。</p><h3 id="案例-1" tabindex="-1">案例 1 <a class="header-anchor" href="#案例-1" aria-label="Permalink to &quot;案例 1&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">keyframesFun</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> start;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fun</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">timestamp</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// timestamp为程序开始，到执行回调函数的时间</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (start </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 获取开始时间</span></span>
<span class="line"><span style="color:#E1E4E8;">      start </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> timestamp;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 计算当前执行了多少秒了</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nowTime</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> timestamp </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> start;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (nowTime </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3000</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 3秒后不执行动画</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 通过移动了多少毫秒来设置每帧移动的偏移量</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 公式：</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 0.1 * nowTime，多少秒移动多少偏移量，nowTime为当前动画执行的时间</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Math.min(0.x * nowTime,最大移动的偏移量)，可以加大倍率，直到符合预期</span></span>
<span class="line"><span style="color:#E1E4E8;">    box3.style.transform </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`translateX(\${</span><span style="color:#E1E4E8;">Math</span><span style="color:#9ECBFF;">.</span><span style="color:#B392F0;">min</span><span style="color:#9ECBFF;">(</span><span style="color:#79B8FF;">0.2</span><span style="color:#9ECBFF;"> </span><span style="color:#F97583;">*</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">nowTime</span><span style="color:#9ECBFF;">, </span><span style="color:#79B8FF;">500</span><span style="color:#9ECBFF;">)</span><span style="color:#9ECBFF;">}px)\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    window.</span><span style="color:#B392F0;">requestAnimationFrame</span><span style="color:#E1E4E8;">(fun);</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onHandleClick</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  window.</span><span style="color:#B392F0;">requestAnimationFrame</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">keyframesFun</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">keyframesFun</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> start;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fun</span><span style="color:#24292E;">(</span><span style="color:#E36209;">timestamp</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// timestamp为程序开始，到执行回调函数的时间</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (start </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 获取开始时间</span></span>
<span class="line"><span style="color:#24292E;">      start </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> timestamp;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 计算当前执行了多少秒了</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nowTime</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> timestamp </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> start;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (nowTime </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3000</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 3秒后不执行动画</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 通过移动了多少毫秒来设置每帧移动的偏移量</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 公式：</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 0.1 * nowTime，多少秒移动多少偏移量，nowTime为当前动画执行的时间</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Math.min(0.x * nowTime,最大移动的偏移量)，可以加大倍率，直到符合预期</span></span>
<span class="line"><span style="color:#24292E;">    box3.style.transform </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`translateX(\${</span><span style="color:#24292E;">Math</span><span style="color:#032F62;">.</span><span style="color:#6F42C1;">min</span><span style="color:#032F62;">(</span><span style="color:#005CC5;">0.2</span><span style="color:#032F62;"> </span><span style="color:#D73A49;">*</span><span style="color:#032F62;"> </span><span style="color:#24292E;">nowTime</span><span style="color:#032F62;">, </span><span style="color:#005CC5;">500</span><span style="color:#032F62;">)</span><span style="color:#032F62;">}px)\`</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    window.</span><span style="color:#6F42C1;">requestAnimationFrame</span><span style="color:#24292E;">(fun);</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onHandleClick</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  window.</span><span style="color:#6F42C1;">requestAnimationFrame</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">keyframesFun</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h3 id="案例-2-测试屏幕帧数" tabindex="-1">案例 2：测试屏幕帧数 <a class="header-anchor" href="#案例-2-测试屏幕帧数" aria-label="Permalink to &quot;案例 2：测试屏幕帧数&quot;">​</a></h3><p>// 帧数为 1 秒可以显示多少张图片就多少帧 公式：1000/重绘时间间隔（ms）=多少张图片 多少时间间隔（timestamp - lasttime）可以显示一张图片</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fun01</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> lasttime </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fun</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">timestamp</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (lasttime </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(Math.</span><span style="color:#B392F0;">floor</span><span style="color:#E1E4E8;">(timestamp </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> lasttime));</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    lasttime </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> timestamp;</span></span>
<span class="line"><span style="color:#E1E4E8;">    window.</span><span style="color:#B392F0;">requestAnimationFrame</span><span style="color:#E1E4E8;">(fun);</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">window.</span><span style="color:#B392F0;">requestAnimationFrame</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">fun01</span><span style="color:#E1E4E8;">());</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fun01</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> lasttime </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fun</span><span style="color:#24292E;">(</span><span style="color:#E36209;">timestamp</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (lasttime </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(Math.</span><span style="color:#6F42C1;">floor</span><span style="color:#24292E;">(timestamp </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> lasttime));</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    lasttime </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> timestamp;</span></span>
<span class="line"><span style="color:#24292E;">    window.</span><span style="color:#6F42C1;">requestAnimationFrame</span><span style="color:#24292E;">(fun);</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">window.</span><span style="color:#6F42C1;">requestAnimationFrame</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">fun01</span><span style="color:#24292E;">());</span></span></code></pre></div><h3 id="异步任务" tabindex="-1">异步任务 <a class="header-anchor" href="#异步任务" aria-label="Permalink to &quot;异步任务&quot;">​</a></h3><p>结果：script--animation</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">requestAnimationFrame</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;animation&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;script&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">requestAnimationFrame</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;animation&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;script&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div>`,13),e=[o];function t(c,r,E,y,i,F){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{u as __pageData,d as default};