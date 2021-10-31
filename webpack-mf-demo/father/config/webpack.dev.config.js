const path = require('path');
const Webpack = require('webpack');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'public'),
    open: true,
    compress: true,
    port: 2222,
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
