module.exports = {
  transpileDependencies: ["vuetify"]
};
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= 'Kuuzza Vendor | Tap into our decentralised sales force and watch your business scale'
        return args
      })
  }
}