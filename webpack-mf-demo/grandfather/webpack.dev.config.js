const path = require('path');
const Webpack = require('webpack');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.join(__dirname, 'public'),
    open: true,
    compress: true,
    port: 1111,
    hot: true,
    client: {
      overlay: {
        errors: true
      }
    }
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin()
  ]
});
