# HTML

## 1.src和href的区别

`src`和`href`都是代表引用外部的资源，**最大的区别就是src会阻塞后续代码的解析，href的加载与后续代码的解析是并行的**。

**src**：表示对资源的引用，他指向的内容会嵌入到当前标签所在的位置，src会对目标url发送请求下载并应用到文档中。

**href：** 表示超文本引用，它指向一些网络资源，建立和当前元素或本文档的链接关系。当浏览器识别到它他指向的⽂件时，就会并⾏下载资源，不会停⽌对当前⽂档的处理。 常用在a、link等标签上。

## 2.defer和async

​	这两个是`script`标签独有的两个属性，他们异步的加载脚本资源而不阻塞浏览器对后续代码的解析。

**defer**：html解析到script标签时会异步加载该脚本，等到html解析完成后才执行该脚本代码。在DOMContentload事件之前执行，对于defer的脚本资源的执行，所有的脚本代码执行完成后触发DOMContentloaded之前事件。多个defer按照处于文档的顺序来加载。

**async**：html解析到script标签时会异步加载该脚本，但网络请求加载完成后会立即执行脚本代码，可能会出现浏览器未解析完html就执行了脚本代码。

**默认**：html解析到该script时，会同步加载脚本资源，加载完成后会立即执行脚本代码。注意，这一过程都是同步在进行的，所以会阻塞浏览器解析后续html字符串。

## 3.HTML5新增

1.语义化标签

2.表单属性更新，type支持email、time、range等等值，placeholder、autofocus、requierd等属性

3.Web Storage：新增session和local存储

4.新增标签：canvas、audio、video、sourse

5.拖放API

## 4.DOCTYPE的作用

​	声明文档的类型，告诉浏览器以何种标准来解析该文档。

## 5.前端性能优化