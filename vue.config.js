module.exports = {
  configureWebpack: {
    externals: {
    	"core-js": "core-js",
      "vue": "Vue",
      "vue-router": "VueRouter",
      'swiper': 'Swiper'
    }
  },
  productionSourceMap:false
}