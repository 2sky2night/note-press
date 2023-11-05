## 类型转换机制

类型转换就是将变量存储的字面量的类型转换成另一个类型，有显示转换和隐式转换两种方式。

## 显示转换

其实就是强制类型转换，一般有 Number、parseInt（parseFloat）、String、Boolean 等等

### Number

Number 对于基本数据类型的转换严格，对于引用类型的数据会调用 Symbol.toPrimitive 方法再调用 toNumber,不过通常都是 NaN。

```js
console.log(Number(true)); // 1
console.log(Number(false)); // 0
console.log(Number("asdasd")); // not a number
console.log(Number("132")); // 132
console.log(Number("13s2")); // nan
console.log(Number("")); // 0
console.log(Number(undefined)); // nan
console.log(Number(null)); // nan
console.log(Number({})); // 0
console.log(Number(Symbol("hello"))); // 报错
// ...
```

### parseInt parseFloat

和 number 差不多，不过对于字符串转换来说他是逐个解析，若碰到无法解析的就停止解析返回当前解析的结果，为第一个就不是数字就返回 NaN

### String

将数据强制转换成字符型，基本上都是原样输出

```js
console.log(String(true)); // true
console.log(String(false)); // false
console.log(String(1n)); // 1，bigInt会被忽略n
console.log(String(100)); // 100
console.log(String(1.55)); // 1.5
console.log(String(undefined)); // 'undefined'
console.log(String(null)); // 'null'
console.log(String({})); // [obeject Type]
console.log(String(Symbol("hello"))); // Symbol(hello)
```

### Boolean

将数据强制转换成布尔型，数字非 0true，0false，字符串空串 false，其余 true，引用数据都是 true，因为是那变量保存的地址值在转换

```js
console.log(Boolean("123")); // true
console.log(Boolean("")); // false
console.log(Boolean(0)); // false
console.log(Boolean(1.55)); // true
console.log(Boolean(undefined)); // false
console.log(Boolean(null)); // false
console.log(Boolean({})); // true
console.log(Boolean(Symbol("hello"))); // true
```

## 隐式转换

隐式转换会出现在算术运算、逻辑运算、比较运算上。

### 布尔型

在需要布尔值的地方，系统会自动调用 Boolean 函数来，获得判断结果。**例如 if、循环条件语句、三目运算符**

### 数值型

在双目的算术运算中，遇到非数字类型的数据会自动将其转换成数字型，（字符串加法除外），若遇到无法转换的，则结果就为 NaN

### 字符串

只要是字符串与任意数据作加法运算，其结果都为字符串的拼接。
