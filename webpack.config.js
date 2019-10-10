const path = require('path');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    './static-src/index.js',
  ],

  resolve: {
    alias: {
      styles: path.resolve(__dirname, 'static-src/styles/'),
    },
  },

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
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
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
        test: /\.png$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images',
        },
      },
      {
        test: /\.css$/,
        exclude: /\.module.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [postcssImport({ preserve: false }), postcssPresetEnv({ stage: 0 })],
            },
          },
        ],
      },
      {
        test: /\.module.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: { localIdentName: '[name]_[local]' },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [postcssImport({ preserve: false }), postcssPresetEnv({ stage: 0 })],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'styles.css' }),
  ],
};
