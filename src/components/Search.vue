<template>
  <div>
    <header>
      <div class="item-header">
        <div class="back" @click="back"><i class="fa fa-angle-left"></i></div>
        <div class="item-search">
          <div>
            <i class="fa fa-search sc"></i>
            <input v-model="key" placeholder="请输入关键字..." class="search-input" @keyup.enter="key.length > 0 ? getSearch() : null">
            <i class="fa fa-times-circle rc" v-if="key.length > 0" @click="cleanKey"></i>
          </div>
        </div>
        <div class="search-btn" :class="key.length > 0 ? 'active': null" @click="key.length > 0 ? getSearch() : null">搜索</div>
      </div>
    </header>
    <div v-if="keystatus === true">
      <div v-if="status === 0">
        <section class="content scontent">
          <ListData :list-data="list" :list-page="page" :add-page="addPage" :last-page="lastpage"></ListData>
        </section>
      </div>
      <Loading v-else :page-status="status" :get-data="getData"></Loading>
    </div>
    <div v-else>
      <section class="content scontent">
        <div class="catalog">
          <div v-if="searchL.length > 0" class="b-title">
            <em></em>
            搜索历史
            <span @click="cleanHotKey">清空历史</span>
          </div>
          <div class="row row-wrap" style="margin-top: 0.6rem;padding: 0 0.5rem">
            <div v-for="(item,i) in searchL" :key="i" class="col col-25 hotkey" @click="getHotKey(item)">{{item}}</div>
          </div>
        </div>
      </section>
    </div>
  </div>
  
</template>

<script>
import DefaultImg from '@/components/public/DefaultImg'
import Config from '@/helper/config'
import Storage from '@/helper/storageTTL'
import Loading from '@/components/public/Loading'
import ListData from '@/components/public/List'
export default {
  name: 'Search',
  components: {
    DefaultImg,
    Loading,
    ListData
  },
  data () {
    return {
      status: 3,
      key: '',
      list: [],
      params:{},
      page: 1,
      keystatus: false,
      searchL: []
    }
  },
  created: function () {
    document.title = `${Config.GlobalTitle}-搜索`
    const key = 'searchKey'
    let cache = localStorage.getItem(key) //读取LocalStorage
    if(cache) this.searchL = JSON.parse(cache)
  },
  methods: {
    async getData() {
      // this.status = 3
      // console.log('what')
      const data = await Storage(this.params)
      
      if(data.status === 5) {
        this.$router.push({path: `/Detail/${data.bookid}`})
      }else {
        this.status = data.status
        this.list = data.list
        this.lastpage = data.lastpage
        // console.log(data)
        const key = 'searchKey'
        let cache = localStorage.getItem(key) //读取LocalStorage
        if (cache === null) { //如果没有缓存
          localStorage.setItem(key,JSON.stringify([this.key]))
          this.searchL = [this.key]
        }else {
          cache = JSON.parse(cache)
          const check = cache.indexOf(this.key)
          // console.log(check)
          if(check === -1) {
            cache = [...cache, this.key]
            localStorage.setItem(key,JSON.stringify(cache))
            this.searchL = cache
          }
        }
      }
      document.title = `${Config.GlobalTitle}-搜索`
    },
    back() {
      this.$router.go(-1);
    },
    getSearch() {
      this.status = 3
      this.keystatus = true
      const key = this.key
      const page = this.page
      this.params = {
        url: Config.SearchUrl(key, page),
        page: 'search',
        key: 'search',
        ttl: {
          status: false,
          ttl: 0
        }
      }
      this.getData()
    },
    cleanKey() {
      this.key = ''
    },
    addPage() {
      let page = this.page + 1
      let id = this.key
      // console.log(page,id)
      this.params = {
        url: Config.SearchUrl(id,page),
        page: 'search',
        key: 'search',
        ttl: {
          status: false,
          ttl: 0
        }
      }
      this.getData()
      this.page = page
    },
    cleanHotKey() {
      localStorage.removeItem('searchKey')
      this.searchL = []
    },
    getHotKey(key) {
      const page = 1
      // console.log(page,id)
      this.key = key
      this.status = 3
      this.keystatus = true
      this.params = {
        url: Config.SearchUrl(key,page),
        page: 'search',
        key: 'search',
        ttl: {
          status: false,
          ttl: 0
        }
      }
      this.getData()
    }
  },
  watch: {
    key(val) {
      if(val.length === 0) this.keystatus = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
