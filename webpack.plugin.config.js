/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');

const fileExtensions = ['png', 'jpg', 'jpeg', 'gif', 'svg'];

const options = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    // Background script
    background: path.join(__dirname, 'src', 'background', 'background.js'),

    // Popup script
    popup: path.join(__dirname, 'src', 'popup', 'popup.js'),

    // Content and page script app
    contentScriptApp: path.join(__dirname, 'src', 'content', 'contentScripts', 'application', 'contentScriptApp.js'),
    pageScriptApp: path.join(__dirname, 'src', 'content', 'contentScripts', 'application', 'pageScriptApp.js'),

    // Content and page script redux
    contentScriptRedux: path.join(__dirname, 'src', 'content', 'contentScripts', 'redux', 'contentScriptRedux.js'),
    pageScriptRedux: path.join(__dirname, 'src', 'content', 'contentScripts', 'redux', 'pageScriptRedux.js'),
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: true,
    }),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'popup', 'popup.html'),
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new CopyPlugin({
      patterns: [
        { from: path.join(__dirname, 'src', 'assets', 'logos'), to: 'logos' },
        path.join(__dirname, 'src', 'manifest.json'),
      ],
    }),
    new WriteFilePlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['@babel/plugin-transform-runtime',
                {
                  regenerator: true,
                }],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
      {
        test: new RegExp(`.(${fileExtensions.join('|')})$`),
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
        exclude: /node_modules/,
      },
    ],
  },

  optimization: {
    usedExports: true,
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        },
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: false,
    },
  },
};

if (process.env.NODE_ENV === 'development') {
  options.devtool = 'cheap-module-source-map';
}

module.exports = options;
