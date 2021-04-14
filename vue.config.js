module.exports = {
  configureWebpack: {
    resolve: {
      // extends:[]  配置省略的后缀名
      alias: {
        // 内部已经配置了 "@" : "src"
        "assets": '@/assets',
        "common": '@/common',
        "components": '@/components',
        "network": '@/network'
      }
    }
  }
}