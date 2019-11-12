<template>
  <div v-if="status === 0">
    <section class="content readbook" :class="[night? 'night':null, xory?'x':'y']" ref="bookf">
      <Header :open-this="open"></Header>
      <div class="small-header">{{title}}</div>
      <div v-if="xory" class="prev" @click="prevPage(0)"></div>
      <div v-if="xory" class="readbk" :class="xory? 'xreadbk':'yreadbk'" :style="'font-size:'+fontsize+'rem;transform: translateX('+offset+')'" ref="bookc">
        <div class="xnav" v-html="nav"></div>
        <span ref="empty"></span>
      </div>
      <jroll-infinite
        v-else
        class="jroll-vue-infinite"
        ref="myJRoll"
        :total="lastpage"
        :jroll-options="options" 
        :pulldown-options="{}"
        @on-pulldown="pulldown"
        @on-scroll-bottom="scrollBottom">
        <div class="readbk" @click="openBar" :class="xory? 'xreadbk':'yreadbk'" :style="'font-size:'+fontsize+'rem;transform: translateX('+offset+')'" ref="bookc">
          <div class="xnav" v-html="nav"></div>
          <span ref="empty"></span>
        </div>
      </jroll-infinite>
      <div v-if="xory" class="function" @click="openBar"></div>
      <div v-if="xory" class="next" @click="nextPage"></div>
      <BottomBar 
        ref="bottom"
        :o-pen="open" 
        :open-menu="openMenu" 
        :night-sun="nightSun" 
        :night-mode="night" 
        :x-ory="xOry" 
        :xory-param="xory"
        :font-size="fontsize"
        :change-font="changeFont">
      </BottomBar>
      <div v-if="xory" class="bar-tab small-bar row">
        <div class="col" style="text-align: left">总进度：{{(Math.round(this.bookthis / this.lastpage * 10000) / 100.00) + '%'}}</div>
        <div class="col">{{current + 1}} / {{page + 1}}</div>
      </div>
      <div v-if="openmenu" @click="openMenu" class="blankback"></div>
    </section>
    <Menu 
      :menu-list="list" 
      :open-menu="openmenu" 
      :open-fun="openMenu" 
      :night-mode="night"
      :book-id="bookid"
      :page-id="bookthis"
      :get-data="menuGetData">
    </Menu>
  </div>
  <Loading v-else :page-status="status" :get-data="getData"></Loading>
</template>

<script>
import Config from '@/helper/config'
import Storage from '@/helper/storageTTL'
import JRoll from 'jroll'
import '@/helper/jroll-pulldown/jroll-pulldown.1.0.0.min'
import VueInfinite2 from 'jroll-vue-infinite2'

import Loading from '@/components/public/Loading'
import Header from '@/components/Read/Header'
import Menu from '@/components/Read/Menu'
import BottomBar from '@/components/Read/BottomBar'
// 时间不够用，请原谅我这一也写的这么了草
export default {
  name: 'Read',
  components: {
    Loading,
    Header,
    Menu,
    BottomBar,
    'jroll-infinite':JRoll.VueInfinite2()
  },
  data () {
    return {
      status: 3,
      list: [],
      title: '',
      nav: '',
      bookid: this.$route.params.bookid,
      id: this.$route.params.id,
      fontsize: 0,
      page: 0,
      current: 0,
      width: 0,
      offset: '',
      offleft: 0,
      open: false,
      night: false,
      openmenu: false,
      xory: true,
      options: {
        scrollX: false,
        scrollBarY: true,
        scrollBarFade: true
      },
      lastpage: 0,
      bookthis: 0,
      prevbook: 0,
      listparams: {}
    }
  },
  created() {
    this.params = {
      url: Config.ReadUrl(this.bookid,this.id),
      page: 'book',
      key: 'book',
      ttl: {
        status: false,
        ttl: 0
      }
    }
    let list = JSON.parse(sessionStorage.getItem('readbook'))
    if(list) {
      this.getSet()
      this.list = list
      this.lastpage = list.length - 1
      this.getData()
    }else {
      this.getList()
    }
  },
  methods: {
    async getList() {
      this.listparams = {
        url: Config.DetailUrl(this.bookid),
        page: 'detail',
        key: `detail:${this.bookid}`,
        ttl: {
          status: false,
          ttl: 0
        }
      }
      const data = await Storage(this.listparams)
      this.list =  data.list
      this.lastpage = data.list.length - 1
      sessionStorage.setItem('readbook', JSON.stringify(this.list))
      this.getSet()
      this.getData()
    },
    async getData() {
      const data = await Storage(this.params)
      // console.log(data)
      this.status = data.status
      this.nav = data.nav
      this.title = this.list[this.bookthis].title
      document.title = `${this.title}-${Config.GlobalTitle}`
    },
    async pushData(type = '') {
      this.title = this.list[this.bookthis].title
      document.title = `${this.title}-${Config.GlobalTitle}`
      const data = await Storage(this.params)
      if(type === 'push') {
        this.nav = `${this.nav}<br />${data.nav}`
        localStorage.setItem(`book.n:${this.bookid}`, this.bookthis)
      }else {
        this.nav = `${data.nav}<br />${this.nav}`
        localStorage.setItem(`book.p:${this.bookid}`, this.prevbook)
      }
    },
    menuGetData(index=0,id=0) {
      this.bookthis = index
      this.prevbook = index
      this.status = 3
        this.params = {
        url: Config.ReadUrl(this.bookid,id),
        page: 'book',
        key: 'book',
        ttl: {
          status: false,
          ttl: 0
        }
      }
      this.getData()
      this.openmenu = !this.openmenu
      this.open = false
      if(this.xory) {
        this.makePage()
        this.current = 0
        this.makeWidth()
      }
    },
    back() {
      this.$router.go(-1);
    },
    prevPage() {
      if(this.current > 0) {
        this.current = this.current - 1
        this.makeWidth()
      }else {
        if(this.prevbook >= 1) {
          const next = this.prevbook - 1
          this.bookthis = next
          const nextid = this.list[next].id
          this.prevbook = next
          this.status = 3
          this.params = {
            url: Config.ReadUrl(this.bookid,nextid),
            page: 'book',
            key: 'book',
            ttl: {
              status: false,
              ttl: 0
            }
          }
          this.$router.replace({path: `/read/${this.bookid}/${nextid}`})
          this.getData()
          localStorage.setItem(`book.n:${this.bookid}`, this.bookthis)
          localStorage.setItem(`book.p:${this.bookid}`, this.prevbook)
          if(this.xory) {
            const offset = (((this.width - 16) * this.current) / 16)
            this.offset = `-${offset}rem`
            this.current = 0
            this.makeWidth()
          }
        }
      } 
    },
    nextPage() {
      if(this.current !== this.page) {
        this.current = this.current + 1
        this.makeWidth()
      }else {
        // const book = 700
        if(this.bookthis <= this.lastpage) {
          const next = this.bookthis + 1
          this.bookthis = next
          const nextid = this.list[next].id
          this.prevbook = this.bookthis
          this.status = 3
          this.params = {
            url: Config.ReadUrl(this.bookid,nextid),
            page: 'book',
            key: 'book',
            ttl: {
              status: false,
              ttl: 0
            }
          }
          this.$router.replace({path: `/read/${this.bookid}/${nextid}`})
          this.getData()
          localStorage.setItem(`book.n:${this.bookid}`, this.bookthis)
          localStorage.setItem(`book.p:${this.bookid}`, this.prevbook)
          if(this.xory) {
            this.makePage()
            this.current = 0
            this.makeWidth()
          }
        }
      }
    },
    makeWidth() {
      const offset = (((this.width - 16) * this.current) / 16)
      this.offset = `-${offset}rem`
    },
    changeFont(type = '') {
      if(type === 'push') {
        if(this.fontsize < 1.7) this.fontsize = this.fontsize + 0.2
        localStorage.setItem('fontsize', this.fontsize)
        // console.log(this.fontsize)
      }else {
        // console.log(this.fontsize)
        if(this.fontsize > 1) this.fontsize = this.fontsize - 0.2
        localStorage.setItem('fontsize', this.fontsize)
      }
    },
    openBar() {
      this.open = !this.open
      this.$refs.bottom.font = false
    },
    nightSun() {
      this.night = !this.night
      this.open = !this.open
      localStorage.setItem('night', this.night)
    },
    openMenu() {
      this.openmenu = !this.openmenu
      this.open = !this.open
    },
    xOry() {
      this.xory = !this.xory
      this.open = !this.open
      this.offset = '0rem'
      document.scrollTop = 0
      this.current = 0
      localStorage.setItem('xory', this.xory)
    },
    getSet() {
      const night = localStorage.getItem('night')
      if(night) {
        if(night === 'true') {
          this.night = true
        }else {
          this.night = false
        }
      }else {
        this.night = false
      }
      const xory = localStorage.getItem('xory')
      if(xory) {
        if(xory === 'true') {
          this.xory = true
        }else {
          this.xory = false
        }
      }else {
        this.xory = false
      }
      const bookthis = localStorage.getItem(`book.n:${this.bookid}`)
      if(bookthis) {
        this.bookthis = Number(bookthis)
        this.prevbook = Number(bookthis)
      }else {
        this.bookthis = 0
        this.prevbook = 0
      }
      const fontsize = localStorage.getItem('fontsize')
      if(fontsize) {
        this.fontsize = Number(fontsize)
      }else {
        this.fontsize = 1
      }
    },
    makePage() {
      this.page = Math.ceil(this.offleft / this.width)
      // console.log(this.page)
    },
    scrollBottom: function (page, success,error) {
      const height = this.$refs.myJRoll.jroll._s.endY
      // console.log(page++)
      // console.log(this.$refs.myJRoll.jroll._s.endY)
      if(this.bookthis <= this.lastpage) {
        if(height < -2000) {
          const next = this.bookthis + 1
          this.bookthis = next
          const nextid = this.list[next].id
          // console.log(nextid)
          this.$router.replace({path: `/read/${this.bookid}/${nextid}`})
          this.addPage('push')
          success()
        }
      }
    },
    pulldown(success, error) {
      // console.log(this.prevbook)
      if(this.prevbook > 0) {
        // console.log(this.bookthis)
        const next = this.prevbook - 1
        this.prevbook = next
        const nextid = this.list[next].id
        // console.log(nextid)
        this.$router.replace({path: `/read/${this.bookid}/${nextid}`})
        this.addPage('add')
        success()
      }else {
        success()
      }
    },
    addPage(type = '') {
      const bookid = this.bookid
      const id = this.$route.params.id
      // console.log(bookid,id)
      this.params = {
        url: Config.ReadUrl(bookid, id),
        page: 'book',
        key: 'book',
        ttl: {
          status: false,
          ttl: 0
        }
      }
      this.pushData(type)
    }
  },
  watch: {
    status(val) {
      if(val === 0) {
        if(this.xory) {
          this.$nextTick(function () {
            this.width = this.$refs.bookc.offsetWidth
            this.offleft = this.$refs.empty.getBoundingClientRect().left
            this.makePage()
          })
        }
      }
    },
    fontsize() {
      if(this.xory) {
        this.$nextTick(function () {
          if(this.current === 0) {
            if(this.status === 0) {
              setTimeout(() => {
                this.width = this.$refs.bookc.offsetWidth
                this.offleft = this.$refs.empty.getBoundingClientRect().left
                this.makePage()
              }, 600)
            }
          }else {
            this.status = 3
            this.current = 0
            this.offset = '0rem'
            this.getData()
          }
        })
      }
    },
    xory(val) {
      if(val){
        this.$nextTick(function () {
          this.width = this.$refs.bookc.offsetWidth
          this.offleft = this.$refs.empty.getBoundingClientRect().left
          this.makePage()
        })
      }
    }
  }
}
</script>
