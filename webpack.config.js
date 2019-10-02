const path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    './static-src/index.js',
  ],

  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'wmt-custom-theme/static'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
