const path = require('path');

module.exports = {
  entry: './src/img2asciix.js',
  output: {
    filename: 'img2asciix.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'AsciiArt',
    libraryTarget: 'umd',
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  mode: 'production'
};
