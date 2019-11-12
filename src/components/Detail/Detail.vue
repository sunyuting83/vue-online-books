<template>
  <div>
    <div v-if="status === 0">
      <section @scroll="scrollListener" class="content decon">
        <header class="acheader" :style="hdactive">
          <div class="item-header">
            <div class="back" @click="back"><i class="fa fa-angle-left"></i></div>
            <div class="item-nav">书籍详情</div>
            <div class="search"></div>
          </div>
        </header>
        <Cover :book-detail="book"></Cover>
        <Intro :book-intro="book.intro"></Intro>
        <Cache :ca-che="cache" :cache-data="list[cnumber]" :book-id="id" :read-book="readBook"></Cache>
        <Last :last-data="book.last" :detail-list="getlist"></Last>
        <Recommend :reco-list="recommend"></Recommend>
      </section>
      <Bottom ref="bottom" :save-book="saveBook" :read-book="readBook" :book-id="id" :read-id="list[cnumber].id"></Bottom>
      <div class="class-tow" :class="opentwo">
        <List v-if="opentwo !== ''"  :some-list="list" :close-data="closeData" :open-title="book.title" :book-id="id"></List>
      </div>
    </div>
    <Loading v-else :page-status="status" :get-data="getData"></Loading>
  </div>
</template>

<script>
import Config from '@/helper/config'
import Storage from '@/helper/storageTTL'
import Loading from '@/components/public/Loading'
import Header from '@/components/public/Header'

import Cover from '@/components/Detail/Cover'
import Intro from '@/components/Detail/Intro'
import Last from '@/components/Detail/Last'
import Recommend from '@/components/Detail/Recommend'
import Cache from '@/components/Detail/Read'
import List from '@/components/Detail/List'
import Bottom from '@/components/Detail/Bottom'
export default {
  components: {
    Loading,
    Header,
    Cover,
    Intro,
    Cache,
    Last,
    Recommend,
    List,
    Bottom
  },
  name: 'Detail',
  data () {
    return {
      status: 0,
      id: this.$route.params.id,
      hdactive: 'background:rgba(90,90,90,0)',
      opentwo: '',
      prevPage:this.$route.query.prevPage,
      cache: false,
      cnumber: -1
    }
  },
  created: function () {
    // const id = this.$route.params.id
    // this.id = id
    const data = this.getData()
  },
  methods: {
    async getData() {
      this.status = 3
      this.params = {
        url: Config.DetailUrl(this.id),
        page: 'detail',
        key: `detail:${this.id}`,
        ttl: {
          status: false,
          ttl: 0
        }
      }
      const data = await Storage(this.params)
      // console.log(data)
      this.getCache()
      this.status = data.status
      this.recommend = data.recommend
      this.book = data.book
      this.list = data.list
      document.title = `${data.book.title},${Config.GlobalTitle}`
    },
    scrollListener(e) {
      let scrollTop = e.target.scrollTop //监听滚动高度
      let top = scrollTop*3/200<0.1?'0':scrollTop*3/200;
      if(scrollTop > 0 && scrollTop <= 100) {
        this.hdactive = `background:rgba(90,90,90,${top})`
      }else if(scrollTop === 0) {
        this.hdactive = `background:rgba(90,90,90,0)`
      }
    },
    back() {
      this.$router.go(-1);
    },
    getlist() {
      this.opentwo = 'cuur'
    },
    closeData() {
      this.opentwo = ''
    },
    saveBook() {
      let book = {
        id: this.id,
        title: this.book.title,
        cover: this.book.cover,
        writer: this.book.writer,
        intro: this.book.intro
      }
      const key = 'savebook'
      let cache = localStorage.getItem(key) //读取LocalStorage
      let list = []
      if (cache === null) { //如果没有缓存
        list = [...list, book]
        localStorage.setItem(key, JSON.stringify(list))
      }else {
        // cache = [...cache, book]
        // localStorage.setItem(key, JSON.stringify(cache))
        let old = JSON.parse(cache)
        const check = old.filter(x => x.id === this.id)
        if(check.length === 0) {
          old = [...old, book]
          localStorage.setItem(key, JSON.stringify(old))
          this.$refs.bottom.check = true
        }else{
          this.$refs.bottom.check = true
        }
      }
    },
    readBook() {
      sessionStorage.setItem('readbook', JSON.stringify(this.list))
      if(this.cache) {
        localStorage.setItem(`book.n:${this.id}`, this.cnumber)
      }else {
        localStorage.setItem(`book.n:${this.id}`, 0)
      }
    },
    getCache() {
      const c = localStorage.getItem(`book.n:${this.id}`)
      if(c) {
        // console.log(c)
        this.cache = true
        this.cnumber = Number(c)
      }else {
        this.cache = false
        this.cnumber = 0
      }
      // console.log(this.cnumber)
    }
  },
  watch:{
    '$route'(){
      this.id = this.$route.params.id
      this.hdactive = 'background:rgba(90,90,90,0)'
      this.getData()
    }
  },
  beforeDestroy(){
    sessionStorage.setItem(`isGoBack:${this.prevPage}`, 1)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
