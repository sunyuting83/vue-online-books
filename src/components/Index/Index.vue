<template>
  <div v-if="status === 0">
    <Header></Header>
    <section class="content" @scroll="scrollListener" ref="xxxMy">
      <Slider :slider-list="slider"></Slider>
      <IndexMenu :index-menu="menu"></IndexMenu>
      <IndexReco :reco-list="recommend"></IndexReco>
      <IndexList :category-list="category" :scroll-top="scrollTop"></IndexList>
    </section>
    <Tabs></Tabs>
  </div>
  <Loading v-else :page-status="status" :get-data="getData"></Loading>
</template>

<script>
import Config from '@/helper/config'
import Storage from '@/helper/storageTTL'
import Loading from '@/components/public/Loading'
import Slider from '@/components/Index/Slider'
import IndexList from '@/components/Index/IndexList'
import IndexMenu from '@/components/Index/IndexMenu'
import IndexReco from '@/components/Index/IndexReco'
import IndexLs from '@/components/Index/IndexLs'
import Header from '@/components/public/Header'
import Tabs from '@/components/public/Tabs'

export default {
  components: {
    Loading,
    Slider,
    IndexList,
    IndexMenu,
    IndexReco,
    Header,
    IndexLs,
    Tabs
  },
  name: 'Index',
  data () {
    return {
      slider: [],
      status: 3,
      category: [],
      menu: Config.indexMenu,
      recommend : [],
      scrollTop: 0
    }
  },
  created() {
    this.params = {
      url: Config.IndexUrl,
      page: 'index',
      key: 'index',
      ttl: {
        status: true,
        ttl: 1000 * 60 * 60 * 12
      }
    }
    this.getData()
    document.title = Config.GlobalTitle
  },
  methods: {
    async getData() {
      this.status = 3
      const data = await Storage(this.params)
      // console.log(data)
      this.status = data.status
      this.slider = data.slider
      this.category = data.category
      this.recommend = data.recommend
    },
    scrollListener(e) {
      let scrollTop = e.target.scrollTop
      // console.log(scrollTop)
      this.scrollTop = scrollTop
    }
  },
  watch:{
    status(){
      this.$nextTick(() => {
        // 通过v-if渲染的页面，必须使用$nextTick获取ref元素
        const bk = sessionStorage.getItem('isGoBack:index')
        if(bk === '1') {
          const top = sessionStorage.getItem('setheight:index')
          this.$refs.xxxMy.scrollTop = top;
        }
      })
    }
  },
  beforeDestroy() {
    sessionStorage.setItem('isGoBack:index', 0)
  }
}
</script>
