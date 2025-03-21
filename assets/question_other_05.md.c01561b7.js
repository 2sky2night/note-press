import{_ as n,o as a,c as p,O as l}from"./chunks/framework.da6780cc.js";const u=JSON.parse('{"title":"antd与tailwindcss冲突","description":"","frontmatter":{"title":"antd与tailwindcss冲突"},"headers":[],"relativePath":"question/other/05.md","filePath":"question/other/05.md","lastUpdated":1742572592000}'),e={name:"question/other/05.md"};function t(o,s,c,i,r,d){return a(),p("div",null,s[0]||(s[0]=[l(`<p>在 react 项目开发时，常常会使用这两个库，这两个库在一起工作时，在默认情况下会导致样式冲突的问题。</p><p>为了解决此问题，我们需要在 tailwind.config.js 中进行如下配置：</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">/** @type {import(&#39;tailwindcss&#39;).Config} */</span></span>
<span class="line"><span style="color:#E1E4E8;">export default {</span></span>
<span class="line"><span style="color:#E1E4E8;">  content: [&quot;./src/**/*.{js,ts,jsx,tsx}&quot;, &quot;./src/*.{js,ts,jsx,tsx}&quot;],</span></span>
<span class="line"><span style="color:#E1E4E8;">  theme: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    extend: {},</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#85E89D;">+  corePlugins: {</span></span>
<span class="line"><span style="color:#85E89D;">+    preflight: false,</span></span>
<span class="line"><span style="color:#85E89D;">+  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [],</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">/** @type {import(&#39;tailwindcss&#39;).Config} */</span></span>
<span class="line"><span style="color:#24292E;">export default {</span></span>
<span class="line"><span style="color:#24292E;">  content: [&quot;./src/**/*.{js,ts,jsx,tsx}&quot;, &quot;./src/*.{js,ts,jsx,tsx}&quot;],</span></span>
<span class="line"><span style="color:#24292E;">  theme: {</span></span>
<span class="line"><span style="color:#24292E;">    extend: {},</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#22863A;">+  corePlugins: {</span></span>
<span class="line"><span style="color:#22863A;">+    preflight: false,</span></span>
<span class="line"><span style="color:#22863A;">+  },</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [],</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div>`,3)]))}const y=n(e,[["render",t]]);export{u as __pageData,y as default};
