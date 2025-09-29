if (typeof window === 'undefined') {
  const { createCanvas, Image } = require('canvas');

  // Polyfill OffscreenCanvas createCanvas
  global.OffscreenCanvas = function(width, height) {
    return createCanvas(width, height);
  };

  // Polyfill Image
  global.Image = Image;
}