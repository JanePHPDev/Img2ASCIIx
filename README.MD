# Img2ASCIIx
![Screenshot_2025-02-13-17-23-09-09_a87fd7db6caa850b517aa6fa9d2fcd0e.jpg](https://jsdelivrcn.dev.tc/gh/YShenZe/Blog-Static-Resource@main/images/Screenshot_2025-02-13-17-23-09-09_a87fd7db6caa850b517aa6fa9d2fcd0e.jpg)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/img2asciix)](https://www.npmjs.com/package/img2asciix)

一个轻量级的 JavaScript 图片转 ASCII 艺术库，支持浏览器和 Node.js 环境。

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
<script src="https://jsdelivrcn.dev.tc/npm/img2asciix/dist/img2asciix.bundle.js"></script>



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

# 开发文档

## 架构设计
### 模块结构
```javascript
(function(global, factory) {
  // UMD 模块定义
})(global, function() {
  // 核心逻辑
  return {
    convert: convert
  };
});
```

## 核心 API
### `convert(image, options)`
#### 参数
- `image`: 支持类型
  - String: 图片 URL（支持 data URL）
  - Image 对象
- `options`: 配置对象

#### 处理流程
1. 图片加载 → 2. 创建画布 → 3. 绘制缩放 → 4. 像素分析 → 5. ASCII 生成

## 关键函数
### `createCanvas(width, height)`
支持环境检测：
- 浏览器环境：使用 `document.createElement`
- Web Worker：使用 `OffscreenCanvas`
- Node.js：需要安装 `canvas` 依赖

### 亮度计算算法
```javascript
const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
const charIndex = Math.floor((brightness / 255) * (ramp.length - 1));
```

## 性能优化
1. 使用单次 `drawImage` 完成缩放
2. 批量像素处理（O(n) 复杂度）
3. 预计算亮度值
