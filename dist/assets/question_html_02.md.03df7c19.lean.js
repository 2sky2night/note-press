import{_ as s,o as a,c as o,k as e,a as t}from"./chunks/framework.816b1713.js";const x=JSON.parse('{"title":"Img 标签渲染 svg 文件","description":"","frontmatter":{},"headers":[],"relativePath":"question/html/02.md","filePath":"question/html/02.md","lastUpdated":1699188084000}'),n={name:"question/html/02.md"},c=e("h1",{id:"img-标签渲染-svg-文件",tabindex:"-1"},[t("Img 标签渲染 svg 文件 "),e("a",{class:"header-anchor",href:"#img-标签渲染-svg-文件","aria-label":'Permalink to "Img 标签渲染 svg 文件"'},"​")],-1),l=e("p",null,"​ img 是可以接收一个 svg 文件，并渲染出来的。",-1),i=e("p",null,[t("img.src 为目标文件的 url 地址，后端在响应 svg 文件时，需要配置响应头部"),e("code",null,"Content-Type:image/svg+xml"),t("，这样浏览器接收到响应报文后，通过响应头部的"),e("code",null,"content-type"),t("知道这是一个 svg 图片从而成功渲染。")],-1),r=e("p",null,"img 标签的 src 作用就是将资源文件下载并嵌入到网页中。",-1),d=[c,l,i,r];function m(_,g,p,h,u,v){return a(),o("div",null,d)}const k=s(n,[["render",m]]);export{x as __pageData,k as default};