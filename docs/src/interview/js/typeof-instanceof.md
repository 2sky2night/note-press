## typeof instanceof

### typeof

typeof 可以输出数据的类型，基本数据类型除了 null 以外都是可以正确识别其类型，null 比较特殊，会输出 object。对于引用数据类型除了函数以外输出 function，其余都是输出 object

```ts
console.log(typeof true); //boolean
console.log(typeof 1); // number
console.log(typeof "ok"); // string
console.log(typeof null); // object
console.log(typeof 121n); // bigint
console.log(typeof Symbol("hello")); // symbol
console.log(typeof undefined); // undefined
console.log(typeof console.log); // function
console.log(typeof []); // object
console.log(typeof {}); // object
```

### instanceof

instanceof 的语法为 `ins intanceof A`,构造函数的 prototype 属性是否存在实例的原型链上，可以检测一个实例是否继承与某个类。
