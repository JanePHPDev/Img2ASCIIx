# Img2ASCIIx
![Screenshot_2025-02-13-17-23-09-09_a87fd7db6caa850b517aa6fa9d2fcd0e.jpg](https://cdn.mengze.vip/gh/YShenZe/Blog-Static-Resource@main/images/Screenshot_2025-02-13-17-23-09-09_a87fd7db6caa850b517aa6fa9d2fcd0e.jpg)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/img2asciix)](https://www.npmjs.com/package/img2asciix)

一个零依赖、体积小的轻量JavaScript图片转 ASCII 库，支持浏览器、Nodejs及小程序，甚至是跨端应用（Uniapp、Electron ）。支持自定义字符集、Web Worker 多线程，一键生成高还原度字符画，可用于 CLI 工具、前端特效、日志水印、Discord/Slack Bot 等场景，API 简洁，开箱即用。

## 安装

### 浏览器环境
直接引入打包后的文件：
```html
<script src="dist/img2asciix.bundle.js"></script>
```

或者使用CDN引入：
```html
// JsDelivr引入
<script src="https://cdn.Jsdelivr.net/npm/img2asciix/dist/img2asciix.bundle.js"></script>

// JsDelivr中国站
<script src="https://cdn.mengze.vip/npm/img2asciix/dist/img2asciix.bundle.js"></script>



```

### Node.js 环境

> [!TIP]
> Nodejs环境下需要提供polyfill，否则抛出异常，不支持Image对象、不支持Canvas。

需要先安装依赖：
```bash
npm install img2asciix
```
然后通过 require 引入：
```javascript
const AsciiArt = require('img2asciix');
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
