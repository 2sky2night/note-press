## 模块化

### AMD

异步加载模块，模块加载完成后再执行后续操作

### CMD

同步加载模块，需要时才会通过 require 来获取导出模块。导出会输出一个对象，后续导入该模块都返回该对象，除非清空缓存，模块内部的操作不会影响导出的这个对象。

​ CMD 模块化，是运行时加载的，每次执行`require`都会执行整个模块，并获得导出数据的拷贝。

### ESModule

异步加载模块，有一个独立的模块依赖的解析阶段。并且是**编译时输出接口**，导出的是一个引用，所以通过引用修改导出的内容时，所有使用该模块的都会受到影响（浅拷贝）

​ ES 模块化是编译时加载的，每次导入会得到只读的引用数据。

### CMD 和 ESModule 的区别

1. 静态与动态：CMD 是运行时才确定模块间的依赖关系，ESModule 是编译时确定模块间的依赖关系。（**动态**是指对于模块的依赖关系建立在代码执行阶段；**静态**是指对于模块的依赖关系建立在代码编译阶段）

2. 引用与拷贝：CMD 导入的值都是一份拷贝，ESModule 导入的值是一份引用。

3. 异步与同步：CMD 是调用 require 函数才获取模块数据，ESModule 是编译时就已经加载好模块数据了。

4. 导入导出方式不一致

5. 执行次数：CMD 在导入多个相同模块，会执行对应次数的模块，ESModule 在导入多个相同模块时，只会执行依次。

### 在浏览器中使用 ESModule

在浏览器上,你可以通过将 type 属性设置为 module 用来告知浏览器将 script 标签视为模块。

```js
<script type="module" src="./main.mjs"></script>
<script type="module"></script>
```

模块默认情况下是延迟的,因此你还可以使用 defer 的方式延迟你的脚本。

## 参考

1. https://juejin.cn/post/7166046272300777508
