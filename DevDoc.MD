# ASCII-Art.js 开发文档

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

## 开发指南
### 构建命令
```bash
npm install
npm run build
```

### 测试方案
```javascript
// 浏览器测试
test('基本转换', async () => {
  const ascii = await AsciiArt.convert('test.jpg', { width: 40 });
  expect(ascii).toMatchSnapshot();
});

// Node.js 测试
test('Node 环境支持', () => {
  expect(() => createCanvas(100, 100)).not.toThrow();
});
```

## 兼容性处理
### 环境检测策略
```javascript
// Canvas 创建
typeof document !== 'undefined' → 浏览器 DOM
typeof OffscreenCanvas !== 'undefined' → Web Worker
否则 → 抛出错误

// Image 对象
typeof Image !== 'undefined' → 使用原生 Image
否则 → 抛出错误
```

## 扩展建议
1. 支持自定义亮度计算回调
2. 添加颜色支持（ANSI 转义码）
3. 实现渐进式渲染
4. 添加 Web Worker 支持

## 已知限制
1. 需要 CORS 头才能处理跨域图片
2. 大尺寸图片可能内存不足
3. 字符换行依赖 `\n`（Windows 可能需要调整）

## 贡献指南
1. 提交前运行 `npm test`
2. 遵循 ESLint 规则
3. 更新测试快照：`npm test -- -u`