---
title: Node.js
outline: [1, 2, 3, 4]
---

# http 模块

## get 发送 http 请求

Node.js 环境也提供了发送请求的功能，由于不在浏览器环境下所以不受同源策略的限制，可以任意发送请求。**http 模块提供了 get 函数**，可以用来发送 http 请求，若想发送 https 请求需要使用 https 模块的 get 函数。

### 使用方式

```js
http.get(options, (res) => {
  /*响应成功的回调*/
});
```

### 获取响应内容

1. 在 get 方法的第二个参数是一个函数，函数接收一个 res 参数，该参数是响应报文，有响应头部等等相关信息。通过 res.on 方法来监听目的服务器相关的事件如`data`有数据传输时，`end`数据传输结束时，`error`响应错误时。

2. 通过` res.on('data',(chuck)=>{})`可以监听每次有数据传输过来时，可以执行的回调，回调接收一个 chuck 参数，chuck 就是目的服务器响应回来的内容，由于不确定是不是**分段传输**，我们需要不断接收保存目的服务器传输过来的数据。

3. 通过 `res.on('end',()=>{})`可以监听响应结束的回调，可以将保存的数据合并。

### 简单示例

```js
function get(options) {
  return new Promise((resolve, reject) => {
    const request = http.get(options, (res) => {
      const buffer = [];
      res.on("data", (chunk) => {
        // 每当响应有数据传输时，保存数据
        buffer.push(chunk);
      });
      res.on("end", () => {
        // 结束响应了
        resolve({
          headers: res.headers,
          data: Buffer.concat(buffer),
        });
      });
    });
    request.on("error", (error) => {
      reject(error);
    });
    request.end();
  });
}
```

### 捕获请求错误

http.get()返回一个 request 对象，可以监听请求事件，如 error，监听错误请求。

## 请求上下文（请求对象）

在监听 http 实例的 request 事件时，每次向目标服务器发送请求就会触发 request 事件。
通过 on 方法来监听 request 事件，第二个参数接收一个回调，回调可以接收两个参数，第一个就是请求上下文，第二个就是响应上下文。

```js
// 如何监听http实例的request事件?
server.on("request", (requset) => {});
```

### 请求上下文如何解析出请求体数据?

一般的网络请求中都会有需要解析出请求体中的数据，进而执行相关业务操作。由于每种请求体格式的解析方法都不太一样，所以我们需要根据请求体类型来执行对应的中间件来解析请求体数据。例如：`application/json`、 `application/x-www-form-urlencoded`、`multipart/form-data` 等等，需要通过不同的中间件来解析不同的数据。需要注意的是，无论那种请求体如何解析，都要注意，他们都是二进制数据。

#### 接收请求体数据

通常，我们接收请求体的数据都是通过 `request.on('data',(chunk)=>{})` 来监听发送过来的数据片段，每次发送都将数据保存起来，当数据请求完成时会触发`end`事件,我们可以通过监听 end 事件来告诉程序结束接收数据阶段。`request.on('end',()=>{})`。

为什么需要通过**request 监听**才能获取数据？因为客户端发送请求，请求中的数据通常是一片段一片段发送过来的，我们需要监听每次发送过来的事件来保存片段，监听 end 事件来结束接收数据，将片段汇聚成完整的请求体数据。**其实 requset 对象是一个 stream**。

#### application/json

json 格式虽然是二进制数据，但是可以通过 toString 转换成字符串，因为 json 本身就是一个字符串。

通过监听 request 对象的`data`事件，可以获取到客户端发送过来的二进制数据片段，我们可以通过一个数组来保存这些二进制片段；当客户端的数据发送完成时，可以通过监听 request 对象的`end`事件，来结束接收数据。结束后将二进制数据 Buffer 转换成字符串，因为 json 数据本就是字符串，可以将二进制数据转换成字符串,最终再将字符串转换成对象，需要注意，使用 try、catch 来捕获同步的 json 转换错误。

下列是一个简单示例:

```js
server.on('request',(req,res)=>{

})
    const contentType = req.headers['content-type']
    if (contentType !== 'application/json') {
      // 非application/json 不解析请求体数据
      res.end('非json格式的数据')
      return
    } else {
      // 是application/json的请求体类型
      const body = await new Promise(r => {
        const jsonBuffer: Buffer[] = []
        // 为什么要用data、end事件监听和json来累加数据？
        // 因为请求上传数据不是一瞬间完成的，而是根据网络情况一段一段的流式获取数据的
        // 每次数据发送过来就会触发data事件，我们可以通过req.on（data）事件来监听每次数据发送到服务器，回调里面接收的参数就是发送过来的请求体数据
        // 基本上请求体相关的数据都是这样的，流式数据，需要我们一段一段的接收，接收完成后才能做后续处理，比如校验参数，操作db等
        req.on('data', (jsonChunk) => {
          jsonBuffer.push(jsonChunk)
        })
        req.on('end', () => {
          // 合并buffer数据
          const buffer = Buffer.concat(jsonBuffer)
          try {
            // 将buffer数据以utf-8编码格式来转换成字符串
            r(JSON.parse(buffer.toString('utf-8')))
          } catch (error) {
            res.statusCode = 400
            res.end('Body type parse in json is error!')
          }
        })
      })
      res.setHeader('content-type','application/json')
      res.end(JSON.stringify(body))
    }
  },

```

#### multipary/form-data

这个是最难的，因为每次发送请求时都需要携带一个独一无二的分隔符（代表了请求体中某两个字段之间的分隔符），我们需要在请求头部中找到这个分隔符，在将这个二进制数据转换成字符串，通过分隔符将字符串切割成键值对的对象。
// 未完成...

```js
  // multipart/form-data
  async (req, res, next) => {
    if (req.method?.toUpperCase() === 'GET') {
      // 无请求体的方法不需要解析
      next()
    } else {
      const contentType = req.headers['content-type']
      if (contentType === undefined) {
        // 未携带请求体类型，不解析
        next()
      } else {
        const [_contentType, _boundary] = contentType.split('; ')
        if (_contentType === 'multipart/form-data') {
          const data = await new Promise<Buffer>(r => {
            const buffer: Buffer[] = []
            req.on('data', (chuck) => {
              buffer.push(chuck)
            })
            req.on('end', () => {
              r(Buffer.concat(buffer))
            })
          })
          console.log(data);

          next()
        } else {
          // 非multipary，不解析
          next()
        }
      }
    }
  },
```

#### application/x-www-form-urlencoded

这个相对比较容易，因为该类型的请求体实际上就是一个字符串，我们只需要将其解析成对象即可，获取数据的方式也是一样的，通过监听请求对象的 data 事件获取片段数据，监听请求对象的 end 事件来结束接收请求体，合并数据。

```js
  // x-www-form-urlencoded
  server.on('request',(req, res, next) => {
    if (req.method?.toUpperCase() === 'GET') {
      // 非能携带请求体的请求绕过解析
      // next()
    } else if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      const data = await new Promise<Buffer>(r => {
        const buffer: Buffer[] = []
        req.on('data', (chuck) => {
          buffer.push(chuck)
        })
        req.on('end', () => {
          r(Buffer.concat(buffer))
        })
      })
      // 解析数据
      const body = data.toString('utf-8')
        .split('&')
        .filter(ele => ele)
        // @ts-ignore
        .reduce((pre, ele) => {
          const [key, value] = ele.split('=')
          return {
            ...pre,
            [key]: value,
          }
        }, {});
      // @ts-ignore
      req.body=body
      // next()
    } else {
      //  非 x-www-form-urlencoded 请求体类型绕过解析
      // next()
    }
  }),
```

## 响应上下文

### 分块传输

https://segmentfault.com/a/1190000016704648

# fs 模块

## 一、文件常识

计算机中的一些文件知识，文件的权限位 mode、标识位 flag、文件描述符 fd 。node 中的 fs 模块与文件操作密切，这些是必须要了解的。

### 1.权限位 mode

因为 fs 模块需要对文件进行操作，会涉及到操作权限的问题，所以需要先清楚文件权限是什么，都有哪些权限。

文件权限表：

![img](http://img.inode.club/modules_fs_01.jpg)

在上面表格中，我们可以看出系统中针对三种类型进行权限分配，即文件所有者（自己）、文件所属组（家人）和其他用户（陌生人），文件操作权限又分为三种，读、写和执行，数字表示为八进制数，具备权限的八进制数分别为 `4`、`2`、`1`，不具备权限为 0。

为了更容易理解，我们可以随便在一个目录中打开 `Git`，使用 `Linux` 命令 `ls -al` 来查目录中文件和文件夹的权限位

```text
drwxr-xr-x 1 koala 197121 0 Jun 28 14:41 core
-rw-r--r-- 1 koala 197121 293 Jun 23 17:44 index.md
```

在上面的目录信息当中，很容易看出用户名、创建时间和文件名等信息，但最重要的是开头第一项（十位的字符）。

**文件权限信息**

文件权限信息由十位数字组成：包括了该文件是否是文件夹（1 位）、文件所有者权限（3 位）、用户组权限（3 位）、其他人的权限（3 位）。

第一位代表是文件还是文件夹，`d` 开头代表文件夹，`-` 开头的代表文件，而后面九位就代表当前用户、用户所属组和其他用户的权限位，按每三位划分，分别代表读（r）、写（w）和执行（x），`-` 代表没有当前位对应的权限。

例如:`drwxr-xr-x`

第一位：d 表示了是文件

第 2 位-第 4 位（文件拥有者的权限）：rwx，拥有读、写、执行权限

第 5 位-第 7 位 （文件所属组的权限）：r-x，拥有读、执行的权限

第 8 位-第 10 位 （其他用户的权限）：r-w，拥有读、执行的权限

> 权限参数 mode 主要针对 Linux 和 Unix 操作系统，Window 的权限默认是可读、可写、不可执行，所以权限位数字表示为 0o666，转换十进制表示为 438。

![img](http://img.inode.club/modules_fs_02.jpg)

### 2.标识位 flag {#custom-id}

Node.js 中，标识位代表着对文件的操作方式，如可读、可写、即可读又可写等等，在下面用一张表来表示文件操作的标识位和其对应的含义。

| 符号 | 含义                                                     |
| ---- | -------------------------------------------------------- |
| r    | 读取文件，如果文件不存在则抛出异常。                     |
| r+   | 读取并写入文件，如果文件不存在则抛出异常。               |
| rs   | 读取并写入文件，指示操作系统绕开本地文件系统缓存。       |
| w    | 写入文件，文件不存在会被创建，存在则清空后写入。         |
| wx   | 写入文件，排它方式打开。                                 |
| w+   | 读取并写入文件，文件不存在则创建文件，存在则清空后写入。 |
| wx+  | 和 w+ 类似，排他方式打开。                               |
| a    | 追加写入，文件不存在则创建文件。                         |
| ax   | 与 a 类似，排他方式打开。                                |
| a+   | 读取并追加写入，不存在则创建。                           |
| ax+  | 与 a+ 类似，排他方式打开。                               |

上面表格就是这些标识位的具体字符和含义，但是 flag 是不经常使用的，不容易被记住，所以在下面总结了一个加速记忆的方法。

- r：读取
- w：写入
- s：同步
- +：增加相反操作
- x：排他方式

> r+ 和 w+ 的区别，当文件不存在时，r+ 不会创建文件，而会抛出异常，但 w+ 会创建文件；如果文件存在，r+ 不会自动清空文件，但 w+ 会自动把已有文件的内容清空。

### 3.文件描述符 fs

> 操作系统会为每个打开的文件分配一个名为文件描述符的数值标识，文件操作使用这些文件描述符来识别与追踪每个特定的文件，Window 系统使用了一个不同但概念类似的机制来追踪资源，为方便用户，NodeJS 抽象了不同操作系统间的差异，为所有打开的文件分配了数值的文件描述符。

在 Node.js 中，每操作一个文件，文件描述符是递增的，文件描述符一般从 3 开始，因为前面有 0、1、2 三个比较特殊的描述符，分别代表 `process.stdin`（标准输入）、`process.stdout`（标准输出）和 `process.stderr`（错误输出）。

## 二、完整性读取文件

下列操作都会直接将文件读取到内存中进行操作，使用时注意内存开销。fs 的模块同一种方法一般都有两套 API，一种是同步的 Sync 后缀，一种是异步的，需要传递回调。

### 1.readFile、readFIleSync 文件读取函数

#### readFile

```
fs.readFile(filename,[encoding],[callback(error,data)]
```

1. 它接收第一个必选参数 filename，表示读取的文件名。

2. 第二个参数 encoding 是可选的，表示文件字符编码，例如'utf-8'。第二个参数也可以是配置项，可以配置以何种方式打开文件：

   `encoding`：以何种编码打开文件

   `flag`：以何种标识位[标识位](#custom-id)打开文件，默认`r`

   `signal` 允许中止正在进行的读取文件

3. 第三个参数`callback`是回调函数，用于接收文件的内容。 说明：如果不指定 encoding ，则`callback`就是第二个参数。 回调函数提供两个参数 err 和 data ， err 表示有没有错误发生，data 是文件内容。

4. 如果指定了 encoding ， data 是一个解析后的字符串，否则将会以 **Buffer** 形式表示的二进制数据。

```js
readFile(getFilePath("./01.txt"), { encoding: "utf-8" }, (err, data) => {
  if (err) {
    throw new Error(err);
  }
  console.log(data);
});
```

#### readFIleSync

​ readFIleSync 是 readFile 的另一种调用方式，readFile 是异步的，readFileSync 是同步的，就意味着读取文件会阻塞后续代码的执行。参数和 readFile 少一个回调。

```js
fs.readFileSync(filename, [options]);
```

### 2.writeFile、writeFileSync 写入文件

#### writeFile

```js
fs.writeFile(path, data, options, callback);
```

path：写入文件的路径

data：写入的内容

options：写入的方式

> ​ encoding：以什么编码写入内容
>
> ​ mode：新文件的权限，默认 0x666，所有人的权限都是读写执行
>
> ​ flag：写入文件的方式，默认`w`，会清空文件并写入内容。

callback：结果回调

```js
fs.writeFile(
  path.resolve(rootPath, "./01.txt"),
  Buffer.from("爱你!", "utf-8"), // 将爱你字符串转换成utf-8编码格式的二进制数据
  {
    flag: "a", // 追加文件
  },
  (err) => {
    if (err) return console.log(err);
  }
);
```

#### writeFileSync

​ writeFile 的同步版本，参数差不多，没有返回值

```js
fs.writeFileSync(path.resolve(rootPath, "./01.txt"), "爱你哟!", {
  flag: "w",
});
```

### 3.appendFile、appendFileSync 追加文件

​ `appendFile`和`writeFile`功能差不多，只不过`options`中的文件标识`flag`默认为`a`

```js
fs.appendFile(path, data, options, callback);
```

注意 options 中的 flag 是可以修改的。

```js
fs.appendFile(
  path.resolve(rootPath, "./01.txt"),
  "彻底疯狂!!",
  { flag: "w" }, // flag默认为 'a'
  (err) => {
    console.log(err);
  }
);
```

### 4.copyFile、copyFileSync 拷贝文件

copyFile 可以将源文件拷贝到目的路径中。

`dest`路径目录必须存在，文件可存在可不存在，若存在则会被覆盖，不存在则会新创建。

```js
// copyFile
const fs = require("fs");
const path = require("path");

const rootPath = path.resolve(__dirname, "../test");

fs.copyFile(
  path.resolve(rootPath, "./01.txt"), // src
  path.resolve(rootPath, "./02.txt"), // dest
  (err) => {
    if (err) {
      console.log(err);
    }
  }
);
```

### 5.unlink、unlinkSync 删除文件

unlink 可以将目标文件删除。

```json
fs.unlink(path,callback)
```

例：

```js
// unlink
fs.unlink(path.resolve(rootPath, "./02.txt"), (err) => {
  if (err) return console.log(err);
  console.log("删除成功!");
});
```

## 三、指定位置操作文件

​ 接下来的高级文件操作会与上面有些不同，流程稍微复杂一些，要先用`fs.open`来打开文件，然后才可以用`fs.read`去读，或者用`fs.write`去写文件，最后，你需要用`fs.close`去关掉文件。

### 1.fs.open

​ fs.open 可以打开文件。

```js
fs.open(path, flags, [mode], callback);
```

path 文件路径

flags 标识位，默认`r`

mode 文件权限位，默认`0o666`

callback 打开的回调:callback 可以接受两个参数，第一个是`err`错误信息，第二个是`fd`文件描述符。这个文件描述符可以帮助我们快速的操作文件而不是使用路径。

```js
const fs = require("fs");
const path = require("path");

const rootPath = path.resolve(__dirname, "../test");

fs.open(path.resolve(rootPath, "./01.txt"), "r", "0666", (err, fd) => {
  if (err) return console.log(err);
  console.log(fd); // 文件描述符
});
```

### 2.fs.read

​ read 函数可以读取文件指定长度的数据。

```js
fs.read(fd, buffer, offset, length, position, callback);
```

fd：文件描述符，需要先使用 open 打开，使用`fs.open`打开成功后返回的文件描述符；

buffer：一个 Buffer 对象，`v8`引擎分配的一段内存，要将内容读取到的 Buffer；

offset：整数，向 Buffer 缓存区写入的初始位置，以字节为单位；

length：整数，读取文件的长度；

position：整数，读取文件初始位置；文件大小以字节为单位

callback：回调函数，有三个参数 err（错误），bytesRead（实际读取的字节数），buffer（被写入的缓存区对象），读取执行完成后执行。

```js
// read
const fs = require("fs");
const path = require("path");

const rootPath = path.resolve(__dirname, "../test");

fs.open(path.resolve(rootPath, "./01.txt"), (err, fd) => {
  if (err) return console.log(err);
  const buf = Buffer.alloc(9); // 创建6个字节长度的缓存数据
  // 根据描述符fd来读取文件
  // 从文件的第0个字节开始读取九个字节
  // 将数据填充到buf对象，起始偏移量为1
  fs.read(fd, buf, 1, 8, 0, (err, data, buffer) => {
    if (err) return console.log(err);
    console.log(buffer.toString("utf-8"));
  });
});
```

### 3.fs.write

​ 将缓存对象写入到文件的某个位置中。**注意要写入内容需要以标志位写入的方式打开文件，否则无法写入内容！！！**

```js
fs.write(fd, buffer, offset, length, position, callback);
```

六个参数

1. fd：文件描述符，使用`fs.open` 打开成功后返回的；
2. buffer：一个 Buffer 对象，`v8` 引擎分配的一段内存，存储将要写入文件数据的 Buffer；
3. offset：整数，从 Buffer 缓存区读取数据的初始位置，以字节为单位；
4. length：整数，读取 Buffer 数据的字节数；
5. position：整数，写入文件初始位置；
6. callback：写入操作执行完成后回调函数，有三个参数 err（错误），bytesWritten（实际写入的字节数），buffer（被读取的缓存区对象），写入完成后执行。

```js
// 以写入的方式打开文件，以非写的方式打开文件是无法写入内容的。
fs.open(filename, "w", (err, fd) => {
  fs.write(fd, "你好~");
});
```

```js
// write
const fs = require("fs");
const path = require("path");

const rootPath = path.resolve(__dirname, "../test");

// 使用fs.open完成文件指定位置的复制

// 打开源文件
fs.open(path.resolve(rootPath, "./01.txt"), (err, fd) => {
  if (err) return console.log(err);
  // 保存读取的缓存数据
  const buffer = Buffer.alloc(12);
  // 目标源文件
  fs.read(fd, buffer, 0, 12, 0, (err, num, src_buffer) => {
    if (err) return console.log(err);
    console.log(src_buffer.toString()); // 读取目标文件的12个字节
    // 打开目标文件
    fs.open(path.resolve(rootPath, "./02.txt"), "w", (err, dest_fd) => {
      if (err) return console.log(err);
      // 将源文件的0-11个字节保存到目标文件中，起始偏移量为0
      fs.write(dest_fd, src_buffer, 0, 12, 0, (err) => {
        if (err) return console.log(err);
      });
    });
  });
});
```

### 4.fs.close

close 用来关闭文件，通过文件描述符关闭文件。

```js
fs.close(fd, callback);
```

`fd`要关闭哪个文件？

`callback`关闭的回调，接受一个 err 参数

```js
fs.open(require("path").resolve(rootPath, "01.txt"), (err, fd) => {
  if (err) return console.log(err);
  const buf = Buffer.alloc(3);
  fs.read(fd, buf, 0, 3, 3, (err, _, buffer) => {
    console.log(fd); // 3
    // 关闭文件，会释放对应文件描述符
    fs.close(fd, (err) => {
      if (err) return console.log(err);
      // 重新打开文件
      fs.open(require("path").resolve(rootPath, "01.txt"), (err, _fd) => {
        console.log(_fd); // 3
      });
    });
  });
});
```

### 5.fs.sync

​ 让文件与计算机存储的文件同步。

```
fs.fsync(fd, callback);
```

**参数：**该方法接受上述和以下所述的两个参数：

- **fd:**它是一种以同步方式获取的文件描述符(整数)。
- **callback:**它是一个回调函数，用于检查是否发生任何错误。

**返回值：**此函数不返回任何值。

## 四、目录

### 1.fs.stat

​ 查看文件的基本信息，包括创建时间、修改时间等信息。回调接受两个参数，err 和 stats

```js
fs.stat(path, callback);
```

stats 包括了以下数据

```
1. Stats {
2. dev: 2114,          // 包含文件的设备的数字标识符。
3. ino: 48064969,      // 文件的特定于文件系统的“Inode”编号。
4. mode: 33188,        // 描述文件类型和模式的位字段。
5. nlink: 1,           // 该文件存在的硬链接数。
6. uid: 85,            // 拥有文件（POSIX）的用户的数字用户标识符。
7. gid: 100,           // 拥有文件（POSIX）的组的数字组标识符。
8. rdev: 0,            // 如果文件表示设备，则为数字设备标识符。
9. size: 527,          // 文件的大小（以字节为单位）。
10. blksize: 4096,      // 用于i/o操作的文件系统块大小。
11. blocks: 8,          // 为此文件分配的块数。
12. atimeMs: 1318289051000.1,      // 最后一次访问此文件的时间戳（以毫秒为单位）。
13. mtimeMs: 1318289051000.1,      // 最后一次修改此文件的时间戳（以毫秒为单位）
14. ctimeMs: 1318289051000.1,      // 最后一次更改文件状态的时间戳（以毫秒为单位）
15. birthtimeMs: 1318289051000.1,  // 此文件创建时间的时间戳（以毫秒为单位）
16. atime: Mon, 10 Oct 2011 23:24:11 GMT,       // 指示上次访问此文件的时间。
17. mtime: Mon, 10 Oct 2011 23:24:11 GMT,       // 上次修改此文件的时间。
18. ctime: Mon, 10 Oct 2011 23:24:11 GMT,       // 上次更改文件状态的时间。
19. birthtime: Mon, 10 Oct 2011 23:24:11 GMT    // 此文件创建时间的时间。
20. }
```

```js
fs.stat(path.resolve(rootPath), (err, stats) => {
  if (err) return console.log(err);
  console.log(stats.isDirectory()); // 是否是目录
  console.log(stats.isFile()); // 是否是文件
});
```

### 2.fs.mkdir

​ 创建文件夹。

```js
fs.mkdir(path, [options], callback);
```

第一个参数：path 目录路径

第二个参数[options]，`recursive <boolean>` 默认值: false。 `mode <integer>` Windows 上不支持。默认值: 0o777。 可选的 options 参数可以是指定模式（权限和粘滞位）的整数，也可以是具有 mode 属性和 recursive 属性（指示是否应创建父文件夹）的对象。

第三个参数回调函数,回调函数有一个参数 err（错误），创建文件夹后执行。

**注意**：未开启递归选项时，若文件夹已经存在了则创建文件夹会失败。

```js
fs.mkdir(path.resolve(rootPath, "./00"), (err) => {
  if (err) return console.log(err);
  console.log("创建文件夹成功!");
});

fs.mkdir(
  path.resolve(rootPath, "./00/01"),
  { recursive: true }, // 开启递归选项，若路径中有文件夹不存在会帮你自动创建
  (err) => {
    if (err) return console.log(err);
    console.log("创建递归文件夹成功!");
  }
);
```

### 3.fs.rmdir

​ fs.rmdir 用来删除**空**文件夹，若文件夹中有文件是不允许删除的

```js
fs.rmdir(path, callback);
```

```js
fs.mkdir(dPath, (err) => {
  if (err) return console.log(err);
  console.log("创建文件夹成功");
  debugger;
  fs.rmdir(dPath, (err) => {
    if (err) return console.log(err);
    console.log("删除文件夹成功");
  });
});
```

### 4.fs.readdir

​ fs.readdir 用来读取目录

```js
fs.readdir(path, options, callback);
```

第一个参数：path 目录路径

第二个参数[options]可选的 options 参数可以是指定编码的字符串，也可以是具有 encoding 属性的对象，该属性指定用于传给回调的文件名的字符编码。 如果 encoding 设置为 'buffer'，则返回的文件名是 Buffer 对象。 如果 options.withFileTypes 设置为 true，则 files 数组将包含 fs.Dirent 对象。

第三个参数回调函数,回调函数有两个参数，第一个 err（错误），第二个返回 的 data 为一个数组，包含该文件夹的所有文件，是目录中的文件名的数组（不包括 `'.'` 和 `'..'`）。

回调接受两个参数，err 和 fileNameList，错误信息以及该文件夹中的文件列表（包括了文件夹和文件）

```js
const path = require("path");
const fs = require("fs");
const rootPath = path.resolve(__dirname, "../test");

// 默认utf-8编码输出文件名称
fs.readdir(rootPath, (err, files) => {
  if (err) return console.log(err);
  console.log(files); // 包含文件夹以及文件
});

// 指定buffer对象输出文件名称
fs.readdir(rootPath, "buffer", (err, files) => {
  if (err) return console.log(err);
  console.log(files); // 包含文件夹以及文件
});
```

### 5.fs.chmod

​ fs.chmod 修改文件或文件夹的权限，通过权限位来设置对应文件或文件夹的权限

​ 该方法只能适用于`unix`操作系统，在`windows`操作系统上执行不会生效。

```js
fs.chmod(path, mode, callback);
```

```js
fs.chmod(rootPath, 0o600, (err) => {
  //0o600 所有者可读可写。
  console.log(err);
});
```

### 6.fs.access

​ fs.access 查询是否有对应权限。mode 权限位，查看文件或文件夹是否满足该权限位。

```js
fs.access(path, mode, callback);
```

mode 的取值为

`F_OK`指示文件对调用进程可见的标志。 这对于确定文件是否存在很有用，但没有说明 `rwx` 权限。 未指定模式时的默认值。

`R_OK`指示文件可以被调用进程读取的标志。

`W_OK`指示文件可以被调用进程写入的标志。

`X_OK`指示文件可以被调用进程执行的标志。 这对 Windows 没有影响（将表现得像 `fs.constants.F_OK`）。

```js
// 调用进程是否可读
fs.access(rootPath, fs.constants.R_OK, (err) => {
  console.log(err);
});
```

### 7.fs.rename

​ 重命名文件或文件夹。重命名文件夹时无论文件夹是否有文件都可以成功重命名。

```js
// 重命名文件
rename("oldFile.txt", "newFile.txt", (err) => {
  if (err) throw err;
  console.log("Rename complete!");
});
// 重命名文件夹
fs.mkdir(path.resolve(rootPath, "哈哈"), (err) => {
  fs.rename(
    path.resolve(rootPath, "哈哈"),
    path.resolve(rootPath, "喜喜"),
    (err) => {}
  );
});
```

### 8.fs.watchFile

```js
fs.watchFile(filename[, options], listener)
```

监视文件的变化。 每次访问（更新？）文件时都会调用回调 `listener`。

options 的参数:

- `bigint` **默认值：** `false`
- `persistent`**默认值：** `true`
- `interval` **默认值：** `5007`

可以省略 `options` 参数。 如果提供，它应该是一个对象。 `options` 对象可以包含名为 `persistent` 的布尔值，其指示当文件正在被监视时，进程是否应该继续运行。 `options` 对象可以指定 `interval` 属性，指示应该轮询目标的频率（以毫秒为单位）。如果 `bigint` 选项为 `true`，则回调中的`current`，`pre`这些对象中的数值指定为 `BigInt`类型

```js
fs.watchFile(filename, (current, pre) => {
  // current当前文件信息
  // pre更新前的文件信息
  console.log("文件更新了!");
});

fs.open(filename, "a", (err, fd) => {
  const buffer = Buffer.from("你好~");
  fs.write(fd, buffer, (err, size, bf) => {
    fs.close(fd);
  });
});
```

### 9.fs.watch

​ 监听文件夹变化。文件夹中的任何操作，都会执行`listener`回调。

```js
fs.watch(filename[, options][, listener])
```

​ **options**:

- `persistent` 指示只要正在监视文件，进程（当前 node 程序）是否应继续运行。 **默认值：** `true`。
- `recursive` 指示是应监视所有子目录，还是仅监视当前目录。 这在指定目录时适用，并且仅适用于受支持的平台（参见 [caveats](https://nodejs.cn/dist/latest-v18.x/docs/api/fs.html#caveats)）。 **默认值：** `false`。
- `encoding`指定用于传给监听器的文件名的字符编码。 **默认值：** `'utf8'`。
- `signal` 允许使用中止信号关闭监视器。

**listener**

接受两个参数，一个 err，一个是更新的标识，取值有:change(更新)、rename（删除、重命名、创建）。只要目录中文件名出现或消失，就会触发 `'rename'`。

## 五、stream

### 介绍

什么是流？流可以接受数据也可以通过管道输送数据，其本质就是让数据流动起来。

以在线浏览电影为例，在发送请求加载电影时：

#### 使用 readFile

若我们通过 readFile 直接将整个大文件读取到内存中，然后再通过响应对象传输数据响应给客户端，这个就会造成很大的问题：

1. 将整个文件直接读取到内存中，会占用内存资源造成系统卡顿
2. 服务器需要耗费流量直接将整个文件传输给客户端，同时占用大量带宽
3. 客户端每次加载视频都会直接耗费整个文件大小的流量，再次访问用户还是需要重新加载整个文件，造成巨大的流量开销。
4. 若并发请求过多，服务器系统开销过大，可能会卡死。

```js
const data = fs.readFileSync(path.resolve(rootPath, "./01.mp4"));
res.setHeader("Content-Type", "video");
res.setHeader("cache-control", "max-age=10000");
res.end(data);
```

#### 使用流

​ 服务端通过分段传输流文件，先加载文件的前 10mb 的内容，响应流给客户端，客户端要看完前再次通过流读后 10mb 内容，响应给客户端....一点一点加载数据，直到视频播放完成。这样一来用户造成的流量开销小了，服务器的性能开销也小了，双赢。

```js
// 每次读取1mb的数据
const rs = fs.createReadStream(path.resolve(rootPath, "./01.mp4"), {
  highWaterMark: 1024 * 1024,
});
// rs.pipe(res); rs.pipe的原理就是下面的代码，每次有数据流过就通过管道写入到res流中
rs.on("data", (chunk) => {
  // 每次读取数据就将数据响应给客户端
  res.write(chunk);
});
// 读取完成，结束HTTP传输。
rs.on("end", () => res.end());
```

全部：

```js
// 读取文件长度，让前端知道文件总大小
fs.stat(path.resolve(rootPath, "./01.mp4"), (err, stats) => {
  if (err) {
    res.statusCode = 500;
    res.end("error");
    return;
  }
  // 返回文件总大小,前端可以知道传输的进度
  res.setHeader("Content-Length", String(stats.size));
  // 每次读取1mb的数据
  const rs = fs.createReadStream(path.resolve(rootPath, "./01.mp4"), {
    highWaterMark: 1024 * 1024,
  });
  // rs.pipe(res);
  rs.on("data", (chunk) => {
    res.write(chunk);
  });
  rs.on("end", () => {
    res.end();
  });
});
```

#### 对比流和直接读取

我们使用 apache 工具来测试[安装教程](https://cloud.tencent.com/developer/article/1698069)，安装完成后运行命令`ab -n 100 -c 100 http://localhost:8000/01.mp4`，其中`-n 100`表示先后发送 100 次请求，`-c 100`表示一次性发送的请求数目为 100 个。对比结果分析使用 stream 后，有非常大的性能提升。

### 1.目标流

​ `stream`也就是容器，存放着数据。通过管道将数据流向另一个容器里面。

如何创建流？

1. 从控制台输入
2. http 请求中的上下文都是流数据，`request`可以传输请求体数据、`response`可以传输响应体数据，`request`是 src 流，`response`是 dest 流。
3. 读取文件`createReadFile`。

`stream`对象可以监听`"data"`,`"end"`,`"open"`,`"close"`,`"error"`等事件。`node.js`中监听自定义事件使用`.on`方法，例如`process.stdin.on(‘data’,…)`, `req.on(‘data’,…)`,通过这种方式，能很直观的监听到`stream`数据的传入和结束。

### 2.管道 pipe

​ 管道 pipe 可以让容器中的数据流向另一个容器中。

​ `pipe`只能将**可读流**数据通过管道流向**可写流**。它会自动处理数据的传输和流的控制，无需手动编写数据的读取和写入逻辑。通过 `pipe` 方法，可以方便地实现将数据从一个流传输到另一个流的功能。

​ 其 pipe 原理就是:

```js
const rs = fs.createReadStream(src_path);
const ws = fs.createWriteStream(dest_path);

// 每次有数据流过就写入到可写流中
rs.on("data", (chunk) => ws.write(chunk));
// 读取完成
rs.on("end", () => {
  // 关闭文件
  ws.close();
  rs.close();
});
```

### 3.目标流

stream 的输出方式:

1. 输出控制台
2. `http`请求中的`response`
3. 写入文件`createWriteFile`

### 4.stream 的应用场景

​ `stream`主要就是用来处理`IO操作`的，而文件操作、网络传输都属于输入输出流。（网络传输需要接受和响应）。`stream`的本质——由于一次性`IO`操作过大，硬件开销太多，影响软件运行效率，因此将`IO`分批分段进行操作，让数据像水管一样流动起来，直到流动完成，也就是操作完成。

### 0.通过 stream 合并文件(可以优化为递归)

```js
const path = require("path");
const fs = require("fs");

const rootPath = path.resolve(__dirname, "../test");
const rs01 = fs.createReadStream(path.resolve(rootPath, "./02.txt"), "utf-8");

// 读取文件总长度
let readSize = 0;
// 创建可写流1将rs01文件内容写入到目标文件中
const ws01 = fs.createWriteStream(path.resolve(rootPath, "./03.txt"), {
  // 写入文件的起始位置
  start: readSize,
  encoding: "utf-8",
});
// rs01传输数据
rs01.on("data", (chunk) => {
  readSize += chunk.length;
  // 将流式数据写入到目标文件里
  ws01.write(chunk);
});
// rs01传输完成
rs01.on("end", () => {
  //  关闭可写流01
  ws01.close();
  // 开始读取文件02
  const rs02 = fs.createReadStream(path.resolve(rootPath, "./01.txt"), "utf-8");
  // 创建可写流02
  const ws02 = fs.createWriteStream(path.resolve(rootPath, "./03.txt"), {
    // 设置写入的起始位置
    start: readSize,
    encoding: "utf-8",
    // 设置标志位为追加，不然会重新创建文件
    flags: "a",
  });
  rs02.on("data", (chunk) => {
    readSize += chunk.length;
    ws02.write(chunk);
  });
  rs02.on("end", () => {
    console.log("合并总长度为:" + readSize);
  });
});
```

### 5.文件的可读可写流

https://juejin.cn/post/6844903681255538695#heading-6

#### 5.1createReadStream

​ 创建可读流`createReadStream` 方法有两个参数，第一个参数是读取文件的路径，第二个参数为 `options` 选项，其中有八个参数：

- flags：标识位，默认为 `r`；
- encoding：字符编码，默认为 `null`；
- fd：文件描述符，默认为 `null`；
- mode：权限位，默认为 `0o666`；
- autoClose：是否自动关闭文件，默认为 `true`；
- start：读取文件的起始位置；
- end：读取文件的（包含）结束位置；
- highWaterMark：最大读取文件的字节数，默认 `64 * 1024`。

`createReadStream` 的返回值为 `fs.ReadStream` 对象，读取文件的数据在不指定 `encoding` 时，默认为 Buffer。

```js
const rs = fs.createReadStream(path.resolve(__dirname, "../test/PCR.mp4"));

rs.on("open", (fd) => {
  console.log(fd);
});

rs.on("close", () => {
  console.log("关闭文件！");
});
```

##### **注意**

1.在创建可读流后默认是不会读取文件内容的，读取文件时，可读流有两种状态，暂停状态和流动状态。

2.如果注册了`"data"`事件监听，就会持续读取文件了，每次读取文件时都会执行`data`事件回调。

3.在读取完成时会调用`end`事件。

4.创建可读流时会触发`open`事件。

```js
const rs = fs.createReadStream(path.resolve(__dirname, "../test/01.txt"));

rs.on("open", (fd) => {
  console.log(fd);
});

// 注册了data事件就会自动读取文件了。
rs.on("data", (chunk) => {
  console.log(chunk.toString());
});

rs.on("close", () => {
  console.log("关闭文件！");
});
```

##### 流动状态

​ 流动状态是指只要可读流开始读取文件后，就会一直不停的读取单位长度（`highWaterMark`）的数据，就像水龙头一样，直到容器里没水（数据）了才会停止。每次读取文件都会触发`data`事件，执行 data 事件注册的回调。

```js
const rs = fs.createReadStream(path.resolve(__dirname, "../test/01.txt"), {
  // 每次读取3个字节的内容
  highWaterMark: 3,
  // 每次读取的数据将其转换成utf-8的编码格式的字符串
  encoding: "utf-8",
  start: 6,
  end: 11,
});

// 注册了data事件就会读取文件了。
rs.on("data", (chunk) => {
  console.log(chunk);
});
```

##### 暂停状态

​ `ReadStream`在默认情况下只要开始读取文件，就会一直按照`highWaterMark`长度的读取数据，直到读取完全部数据。当前我们也可以手动调用`pause`方法让`ReadStream`暂停，暂停之后，`ReadStream`就不会再读取数据直到我们手动调用`resume`方法恢复读取。

​ pause 关闭水龙头，流式数据不再传输数据。

​ resume 开启水龙头，流式数据继续传输剩余数据。

每秒读取一次数据。

```js
const rs = fs.createReadStream(path.resolve(__dirname, "../test/01.txt"), {
  // 每次读取3个字节的内容
  highWaterMark: 3,
  // 每次读取的数据将其转换成utf-8的编码格式的字符串
  encoding: "utf-8",
});

// 注册了data事件就会读取文件了。
rs.on("data", (chunk) => {
  console.log(chunk);
  // 暂停读取，关闭水龙头
  rs.pause();
  setTimeout(() => {
    // 恢复读取，重新读取数据
    rs.resume();
  }, 1000);
});

rs.on("close", () => {
  console.log("关闭文件！");
});
```

##### 事件

​ 可读流有以下事件监听:

`error`：错误时的回调。

`data`：数据读取时的回调。

`open`：文件打开时的回调。

`end`：数据读取完成的回调。

`close`：文件关闭的回调。

`pause`：暂停读取的回调。

`resume`：恢复读取的回调。

#### 5.2 createWriteStream

createWriteStream 用来创建可写流，可写流需要通过实例的 end 方法来关闭文件，释放内存。

`createWriteStream` 方法有两个参数，第一个参数是读取文件的路径，第二个参数为 `options` 选项，其中有七个参数：

- flags：标识位，默认为 `w`；
- encoding：字符编码，默认为 `utf8`；
- fd：文件描述符，默认为 `null`；
- mode：权限位，默认为 `0o666`；
- autoClose：是否自动关闭文件，默认为 `true`；
- start：写入文件的起始位置；
- highWaterMark：一个对比写入字节数的标识，默认 `16 * 1024`。规定写入数据的长度不能超过该字节长度。

`createWriteStream` 返回值为 `fs.WriteStream` 对象。

##### 1.write 写入内容

​ `write`接受缓冲区数据，将数据写入到可写流中，并写入到对应文件中。

​ `write`返回值是一个布尔值，代表 `highWaterMark` 的值是否足够当前的写入，如果足够，返回 `true`，否则返回 `false`，换种说法就是写入内容的长度是否超出了 `highWaterMark`，超出返回 `false`。若当前写入内容长度大于等于`heighWaterMark`则返回 false（超出后依旧可以填充数据），否则返回`true`。

##### 2.drain 吸干事件

​ `drain` 意为 “吸干”，当前写入数据的总大小已经大于等于了 `highWaterMark`，会触发 `drain` 事件，当写入数据大小大于等于`heighWaterMark`字节大小就会触发。换句话说，当容器装满溢出时触发。

##### 3.end 方法

​ end 方法，数据将作为最后的内容写入到可写流中，并触发 end 事件，且会关闭文件。

#### 5.3 pipe 管道

​ 有了可读和可写流，如果想要将可读流中的数据写入到可写流可以通过：

1.创建可读文件流，并将文件中的数据读取出来`ReadStream.on("data")`

2.创建可写流，将读取出来的数通过 write 写入到可写流中。`WriteStream.write(data)`

上述操作可以简化成`ReadSteam.pipe(WriteStream)`，可以直接通过 pipe 管道将可读流的数据直接流入到可写流中，不过原理还是同上 1、2 的步骤。

```js
const rs = createReadSteam(src_path);
const ws = createWriteSteam(dest_path);
rs.pipe(ws); // 将每次读取出来的数据通过write写入。
```

#### 5.4 复制文件封装

​ 时间上虽然都差不多，但是内存开销是完全不一样的，直接读取文件会将整个文件读取到内存中，非常占用内存资源，但流式数据就不一样了，每次读取`heighWaterMark`大小的数据到内存中，只会占用少部分空间，性能开销小。

```js
const fs = require("fs");
const path = require("path");

const rootPath = path.resolve(__dirname, "../test");
const srcPath = path.resolve(rootPath, "./01.mp4");
const destPath = path.resolve(rootPath, "./01_COPY.mp4");

// 通过流式来拷贝180mb的文件
function copyStream() {
  console.time();
  const rs = fs.createReadStream(srcPath);
  const ws = fs.createWriteStream(destPath);
  rs.on("data", (chunk) => {
    // 每次读取就立即写入到可写流中
    ws.write(chunk);
  });
  rs.on("end", () => {
    ws.end(() => {
      console.timeEnd();
    });
  });
}

// 直接拷贝
function copy() {
  console.time();
  const data = fs.readFileSync(srcPath);
  fs.writeFileSync(destPath, data);
  console.timeEnd();
}
```

# Buffer 模块

https://zhuanlan.zhihu.com/p/152214266

https://juejin.cn/post/6844903897438371847#heading-2

流传输的数据起始就是 buffer，buffer 是什么？就是一串串二进制数据，为什么 Node 要操作二进制数据？因为读写文件需要二进制（为什么读文件要二进制，因为不知道文件编码格式，还不如统一成二进制保护源数据）、http 传输是二进制.....

## 1.Buffer 创建

### 1.1 Buffer.alloc

​ 传递一个 int 类型的数据，代表分配多少字节的空间给缓冲区，且每个字节的值都被初始化为`0x00`，一个字节八位，一个字节为两位十六进制组成。

```js
const buf1 = Buffer.alloc(10);
buf1; // <Buffer 00 00 00 00 00 00 00 00 00 00 00>
```

### 1.2 Buffer.allocUnSafe

​ 传递一个 int 类型的数据，代表分配多少字节的空间给缓冲区，但**这段缓冲区可能有数据未被初始化**，只要内存中有空余的空间就抓过来使用。但创建速度比`alloc`快。

### 1.3 Buffer.from

​ 根据内容创建缓冲区,from 有三种重载：

1.第一个参数为字符串，第二个参数为字符编码，如 `ASCII`、`UTF-8`、`Base64` 等等。

2.传入一个数组，数组的每一项会以十六进制存储为 `Buffer` 的每一项。

3.传入一个`Buffer`，会将 `Buffer` 的每一项作为新返回 `Buffer` 的每一项。相当于拷贝了一份 buffer 数据

```js
const buf3 = Buffer.from([65, 66]); // <Buffer 65 66>
const buf4 = Buffer.from(buf3); // 拷贝了buf3的数据
const buf5 = Buffer.from("你好", "utf-8"); // 以对应编码格式创建二进制数据
```

## 2.实例方法

​ fill

# Path 模块

resolve

join

basename

extname

# Event 模块

​ **EventEmitter**。

# 参考

1. http://nqdeng.github.io/7-days-nodejs/#4.2.1
2. ​http://www.inode.club/node
