/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const dotenv = require('dotenv').config();

const APP_DIR = path.resolve(__dirname, '../src');

module.exports = (env = {}) => {
  const { NODE_ENV } = env;
  return merge([
    {
      entry: ['react-hot-loader/patch', APP_DIR],
      output: {
        publicPath: '/',
      },
      resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
          'react-dom': '@hot-loader/react-dom',
          '@src': path.resolve(__dirname, '../src'),
          '@Actions': path.resolve(__dirname, '..', 'src', 'actions'),
          '@Assets': path.resolve(__dirname, '..', 'src', 'assets'),
          '@Components': path.resolve(__dirname, '..', 'src', 'components'),
          '@Hooks': path.resolve(__dirname, '..', 'src', 'hooks'),
          '@Reducers': path.resolve(__dirname, '..', 'src', 'reducers'),
          '@Sagas': path.resolve(__dirname, '..', 'src', 'sagas'),
          '@Selectors': path.resolve(__dirname, '..', 'src', 'selectors'),
          '@Services': path.resolve(__dirname, '..', 'src', 'services'),
          '@Utils': path.resolve(__dirname, '..', 'src', 'utils'),
          // App: path.join(__dirname, '..', 'src'),
        },
      },
      module: {
        rules: [
          {
            // enforce: 'pre',
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                envName: NODE_ENV,
              },
            },
          },
          {
            test: /\.css$/,
            use: [NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
          },
          {
            test: /\.s(a|c)ss$/,
            use: [
              NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
              'css-loader',
              'sass-loader',
            ],
          },
          {
            test: /\.(png|jpg|gif)$/,
            type: 'asset/resource',
            // use: ['file-loader'],
            // use: [
            //   {
            //     loader: 'url-loader',
            //   },
            // ],
          },
          {
            test: /\.woff(2)?(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
            type: 'asset/resource',
          },
          {
            test: /\.(ttf|eot)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
            type: 'asset/resource',
          },
          {
            // test: /\.svg$/,
            // // use: ['@svgr/webpack', 'asset'],
            // use: 'asset',
            test: /\.svg$/,
            use: [
              {
                loader: '@svgr/webpack',
              },
              {
                loader: 'file-loader',
              },
            ],
            type: 'javascript/auto',
            issuer: {
              and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
            },
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          title: 'MY_APP',
          template: 'public/index.html',
          filename: 'index.html',
          inject: true,
          favicon: './src/assets/image/favicon.jpg',
          minify: {
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            minifyCSS: true,
            minifyURLs: true,
            minifyJS: true,
            removeComments: true,
            removeRedundantAttributes: true,
          },
        }),
        new ESLintPlugin({
          extensions: [`js`, `jsx`],
          exclude: [`/node_modules/`],
          failOnWarning: true,
          failOnError: true,
          fix: true,
        }),
        new webpack.DefinePlugin({
          'process.env': JSON.stringify(dotenv.parsed),
        }),
        // new webpack.DefinePlugin({
        // 'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        // }),
      ],
      devtool: 'eval-source-map',
    },
  ]);
};
