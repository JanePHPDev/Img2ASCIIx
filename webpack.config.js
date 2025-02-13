const path = require('path');

module.exports = {
  entry: './src/ascii-art.js',
  output: {
    filename: 'ascii-art.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'AsciiArt',
    libraryTarget: 'umd',
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  mode: 'production'
};