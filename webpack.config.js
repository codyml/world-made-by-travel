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
    publicPath: '/wp-content/themes/wmt-custom-theme/static/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.otf$/,
        loader: 'file-loader',
        options: {
          name: '[folder]/[name].[ext]',
          outputPath: 'fonts',
        },
      },
      {
        test: /\.css$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'css',
        },
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images',
        },
      },
    ],
  },
};
