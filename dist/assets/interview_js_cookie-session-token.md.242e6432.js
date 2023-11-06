import{_ as e,o,c,Q as t}from"./chunks/framework.816b1713.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"interview/js/cookie-session-token.md","filePath":"interview/js/cookie-session-token.md","lastUpdated":1699188084000}'),i={name:"interview/js/cookie-session-token.md"},a=t('<h2 id="_1-http-无状态" tabindex="-1">1.http 无状态 <a class="header-anchor" href="#_1-http-无状态" aria-label="Permalink to &quot;1.http 无状态&quot;">​</a></h2><p>​ 不论是 cookie、session、token 都是用来校验用户身份的令牌，但为什么会出现令牌？？因为 HTTP 是无状态的协议，上一次请求和下一次请求无任何关系、无上下文。Web 应用想要知道用户的登录态就需要使用令牌了，通过令牌可以识别用户身份，从而操作对应用户的数据。</p><p>​ 在客户端发送登录请求后，服务端校验后给客户端颁发令牌，客户端下次发送请求服务端就可以鉴别请求的用户了。</p><h2 id="_2-cookie-客户端存储" tabindex="-1">2.cookie（客户端存储） <a class="header-anchor" href="#_2-cookie-客户端存储" aria-label="Permalink to &quot;2.cookie（客户端存储）&quot;">​</a></h2><p>​ cookie 是 HTTP 头部的字段，同时 cookie 也可以专门保存在本地浏览器中。在登录成功后，服务端在响应头部中设置 cookie，cookie 数据中一般包含识别用户身份的信息，客户端接收到后会将 cookie 存储起来，下次发送请求浏览器会自动在请求头部中携带 cookie，校验以及识别用户身份。</p><p>​ 浏览器本地的 cookie 是可以通过 JS 随意添加的，所以 cookie 可以被伪造。服务端可以设置字段 HTTP Only 禁止 JS 随意修改某个 cookie 字段。</p><h2 id="_3-session-服务端存储" tabindex="-1">3.session（服务端存储） <a class="header-anchor" href="#_3-session-服务端存储" aria-label="Permalink to &quot;3.session（服务端存储）&quot;">​</a></h2><p>​ session 的出现是为了解决 cookie 会被伪造的问题。</p><p>​ 所有的用户令牌由服务端维护，通过一个 key：value 的映射表来记录用户登录态，在客户端登录成功时，服务端创建 key：value（例如:&quot;随机字符串&quot;:&quot;张三&quot;）的一条记录，给客户端返回这个<code>key</code>，通过设置响应头部中设置 cookie 即可。客户端将<code>cookie</code>保存，下一次发送请求携带上<code>key</code>，服务端匹配查询是否有这个<code>key</code>，有则说明合法，无则说明不合法，合法通过读取这个<code>key</code>的<code>value</code>来识别这个用户。</p><p>​ 可以有效避免 cookie 被伪造，既时客户端修改了 key，服务端是无法命中映射表的。</p><p>​ 但是<code>session</code>的问题是：如果存在多个服务器如负载均衡时，每个服务器的状态表<strong>必须</strong>同步，或者抽离出来统一管理，如使用<code>Redis</code>等服务。</p><h2 id="_4-token" tabindex="-1">4.token <a class="header-anchor" href="#_4-token" aria-label="Permalink to &quot;4.token&quot;">​</a></h2><p>​ <code>session</code>方案对服务端的开销是比较大的，需要维护用户登录态。而 token 方案采用了客户端存储+加密，服务端检验来识别用户身份的。</p><p>​ 例如 JWT 就是使用 token 方案的。<code>JWT</code>由 3 部分构成：头部，负载和签名，加密方式采用对称加密。</p><ol><li>头部存储<code>Token</code>的类型和签名算法（上图中，类型是<code>jwt</code>，加密算法是<code>HS256</code>）</li><li>负载是<code>Token</code>要存储的信息（上图中，存储了用户姓名和昵称信息）</li><li>签名是由指定的算法，将转义后的头部和负载，加上密钥一同加密得到的。</li></ol><p>最后将这三部分用<code>.</code>号连接，就可以得到了一个<code>Token</code>了。</p><p>客户端如何存储<code>token</code>呢？</p><ol><li>存在<code>cookie</code>中，虽然设置<code>HttpOnly</code>可以有效防止<code>XSS</code>攻击中<code>token</code>被窃取，但是也就意味着客户端无法获取<code>token</code>来设置<code>CORS</code>头部。</li><li>存在<code>sessionStorage</code>或者<code>localStorage</code>中，可以设置头部解决跨域资源共享问题，同时也可以防止<code>CSRF</code>，但是就需要考虑<code>XSS</code>的问题防止凭证泄露。</li></ol><h2 id="_5-参考" tabindex="-1">5.参考 <a class="header-anchor" href="#_5-参考" aria-label="Permalink to &quot;5.参考&quot;">​</a></h2><p>​ 1. <a href="https://juejin.cn/post/6984210017398292487" target="_blank" rel="noreferrer">https://juejin.cn/post/6984210017398292487</a></p><p>​ 2. <a href="https://juejin.cn/post/6844903844942446600" target="_blank" rel="noreferrer">https://juejin.cn/post/6844903844942446600</a></p>',21),d=[a];function s(n,r,k,l,p,h){return o(),c("div",null,d)}const T=e(i,[["render",s]]);export{u as __pageData,T as default};