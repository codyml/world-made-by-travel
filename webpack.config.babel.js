import path from 'path'; // eslint-disable-line import/no-extraneous-dependencies
import postcssPresetEnv from 'postcss-preset-env';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    'url-polyfill',
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
      },
      {
        test: /\.(otf|ttf)$/,
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
              plugins: () => [postcssPresetEnv({
                stage: 0,
                importFrom: 'static-src/styles/env.babel.js',
              })],
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
              plugins: () => [postcssPresetEnv({
                stage: 0,
                importFrom: 'static-src/styles/env.babel.js',
              })],
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
