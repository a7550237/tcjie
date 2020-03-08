module.exports = {
  lintOnSave: false,
  configureWebpack:{
    resolve:{
      alias:{
        "assets":"src/assets",
        "components":"src/components",
        "network":"src/network",
        "common":"src/common",
        "views":"src/views"
      }
    }
  }
}