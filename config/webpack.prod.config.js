const { merge } = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const baseConfig = require('./webpack.base.config');

const prodConfiguration = () =>
  merge([
    {
      output: {
        publicPath: '/',
        filename: '[name].[contenthash].js',
      },
      optimization: {
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
        splitChunks: {
          chunks: 'all',
        },
        runtimeChunk: {
          name: (entrypoint) => `runtimechunk~${entrypoint.name}`,
        },
      },

      plugins: [
        new webpack.ids.HashedModuleIdsPlugin({
          context: __dirname,
          hashFunction: 'sha256',
          hashDigest: 'hex',
          hashDigestLength: 20,
        }),
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
        }),
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0,
        }),
      ],
      mode: 'production',
      performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
      },
      devtool: 'eval',
    },
  ]);

module.exports = (env) => merge(baseConfig(env), prodConfiguration(env));
