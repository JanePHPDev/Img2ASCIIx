/**
 * img2asciix.js
 *
 * 一个轻量级的 JavaScript 图片转 ASCII 艺术库，支持浏览器和 Node.js 环境。
 * @auther MengZe2 github/YShenZe
 *
 */
(function(global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else {
    global.AsciiArt = factory();
  }
})(typeof window !== 'undefined' ? window : this, function() {
  'use strict';

  function createCanvas(width, height) {
    if (typeof document !== 'undefined' && typeof document.createElement === 'function') {
      var canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      return canvas;
    } else if (typeof OffscreenCanvas !== 'undefined') {
      return new OffscreenCanvas(width, height);
    } else {
      throw new Error('当前环境不支持 Canvas，请在浏览器环境或提供 polyfill 后使用。');
    }
  }

  var ImageClass;
  if (typeof Image !== 'undefined') {
    ImageClass = Image;
  } else {
    ImageClass = function() {
      throw new Error('当前环境不支持 Image 对象，请在浏览器环境或提供 polyfill 后使用。');
    };
  }

  var DEFAULT_OPTIONS = {
    width: 100,
    height: undefined,
    asciiRamp: '@%#*+=-:. '
  };

  function mergeOptions(options) {
    var result = {};
    for (var key in DEFAULT_OPTIONS) {
      if (DEFAULT_OPTIONS.hasOwnProperty(key)) {
        result[key] = DEFAULT_OPTIONS[key];
      }
    }
    if (options) {
      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          result[key] = options[key];
        }
      }
    }
    return result;
  }

  function loadImage(src) {
    return new Promise(function(resolve, reject) {
      var img;
      try {
        img = new ImageClass();
      } catch (e) {
        return reject(e);
      }
      img.onload = function() {
        resolve(img);
      };
      img.onerror = function() {
        reject(new Error('加载图片失败：' + src));
      };
      img.src = src;
    });
  }

  /**
   * 将图片转换为 ASCII 艺术
   *
   * @param {string|Image} image - 图片 URL 或已加载的 Image 对象
   * @param {Object} [options] - 配置选项
   * @param {number} [options.width] - 输出 ASCII 的宽度（字符数）
   * @param {number} [options.height] - 输出 ASCII 的高度（字符数），可选
   * @param {string} [options.asciiRamp] - 灰度映射使用的字符集（从密到疏）
   * @returns {Promise<string>} 返回一个 Promise，resolve 的结果为生成的 ASCII 艺术字符串
   */
  function convert(image, options) {
    options = mergeOptions(options);
    return new Promise(function(resolve, reject) {
      var imagePromise;
      if (typeof image === 'string') {
        imagePromise = loadImage(image);
      } else {
        imagePromise = Promise.resolve(image);
      }

      imagePromise
        .then(function(img) {
          var aspectRatio = img.height / img.width;
          var width = options.width;
          var height = options.height || Math.round(width * aspectRatio);

          var canvas;
          try {
            canvas = createCanvas(width, height);
          } catch (e) {
            return reject(e);
          }
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          var imageData;
          try {
            imageData = ctx.getImageData(0, 0, width, height).data;
          } catch (e) {
            return reject(new Error('无法获取图像像素数据，可能是跨域问题。'));
          }

          var ascii = '';
          var ramp = options.asciiRamp;
          for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
              var index = (y * width + x) * 4;
              var r = imageData[index];
              var g = imageData[index + 1];
              var b = imageData[index + 2];
              var brightness = 0.299 * r + 0.587 * g + 0.114 * b;
              var charIndex = Math.floor((brightness / 255) * (ramp.length - 1));
              ascii += ramp.charAt(charIndex);
            }
            ascii += '\n';
          }
          resolve(ascii);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  return {
    convert: convert
  };
});