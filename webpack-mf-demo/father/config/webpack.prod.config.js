const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin({
      verbose: true, // 打印被删除的文件
      protectWebpackAssets: false, // 允许删除cleanOnceBeforeBuildPatterns中的文件
      cleanOnceBeforeBuildPatterns: ['**/*', path.resolve(__dirname, 'public')]
    })
  ]
});
