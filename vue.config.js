const path = require('path');//引入path模块
function resolve(dir) {
  return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}
module.exports = {
  outputDir: "dist",
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('components', resolve('@/components'))
      .set('views', resolve('@/views'))
      .set('assets', resolve('@/assets'))
      .set('network', resolve('@/network'))
  },
  devServer: {
    host: "localhost",
    port: "9000",
    hot: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
}