/**
 * @file: vue.config.js.
 * @authors: yangj (yangjia@fjxhx.cc).
 * @createDate: 2021/10/11.
 * @version: 1.0.
 * @copyright © 2021 新和兴 All rights reserved.
 */
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
var appData = require('./src/mock/mock.json')
module.exports = {
  chainWebpack(config) {
    config.plugin('monaco').use(new MonacoWebpackPlugin())
  },
  devServer: {
    before(app) {
      app.get('/mock', (req, res) => {//这样就不用配置代理了
        res.json(appData)
      })
    },
  }
}
