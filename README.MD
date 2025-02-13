# ASCII-Art.js

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

一个轻量级的 JavaScript 图片转 ASCII 艺术库，支持浏览器和 Node.js 环境。

## 安装

### 浏览器环境
直接引入打包后的文件：
```html
<script src="dist/ascii-art.bundle.js"></script>
```

或者使用CDN引入：
```html
// JsDelivr引入
<script src="https://cdn.Jsdelivr.net/npm/ascii-art-js@1.0.1/dist/ascii-art.bundle.js"></script>

// JsDelivr中国站
<script src="https://jsdelivrcn.dev.tc/npm/ascii-art-js@1.0.1/dist/ascii-art.bundle.js"></script>



```

### Node.js 环境

> [!TIP]
> Nodejs环境下需要提供polyfill，否则抛出异常，不支持Image对象、不支持Canvas。

需要先安装依赖：
```bash
npm install ascii-art-js
```
然后通过 require 引入：
```javascript
const AsciiArt = require('ascii-art-js');
```

## 快速开始
```javascript
// 浏览器中使用
AsciiArt.convert('image.jpg', { width: 80 })
  .then(ascii => console.log(ascii))
  .catch(console.error);

// Node.js 中使用
const { readFileSync } = require('fs');
const imageBuffer = readFileSync('image.jpg');
const imageData = 'data:image/jpeg;base64,' + imageBuffer.toString('base64');

AsciiArt.convert(imageData, { width: 100 })
  .then(console.log)
  .catch(console.error);
```

## 配置选项
| 参数 | 类型 | 默认值 | 描述 |
|------|------|---------|-------------|
| width | number | 100 | 输出宽度（字符数） |
| height | number | 自动计算 | 输出高度（字符数） |
| asciiRamp | string | `@%#*+=-:. ` | 灰度映射字符集（从密到疏） |

## 示例输出
```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@%%%%%%%%%#####*********+++++=======::::::::...........
@@@%%%%%%%%%#####*********++++++======::::::::.............
@@%%%%%%%%%#####*********++++++======::::::::..............
@%%%%%%%%%#####*********++++++======::::::::...............
```

## 注意事项
1. 需要确保图片源允许跨域访问
2. 输出高度默认保持原图比例
3. Node.js 需要安装 canvas 依赖
4. 字符集建议使用等宽字体显示