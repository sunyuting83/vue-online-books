<template>
  <div>
    <div v-if="status === 0">
      <Header></Header>
      <section class="content">
        <div class="contentx">
          <TrophyClass :page-id="id" :change-data="changeData"></TrophyClass>
          <ListData :list-data="list" :list-page="page" :add-page="addPage" :last-page="lastpage"></ListData>
        </div>
      </section>
      <Tabs></Tabs>
    </div>
    <Loading v-else :page-status="status" :get-data="getData"></Loading>
  </div>
</template>

<script>
import Config from '@/helper/config'
import Storage from '@/helper/storageTTL'
import Loading from '@/components/public/Loading'
import TrophyClass from '@/components/Trophy/TrophyClass'
import ListData from '@/components/public/List'
import Header from '@/components/public/Header'
import Tabs from '@/components/public/Tabs'
export default {
  components: {
    Loading,
    TrophyClass,
    ListData,
    Header,
    Tabs
  },
  name: 'Trophy',
  data () {
    return {
      msg: 'teste',
      list: [],
      menu: [],
      status: 3,
      id: 'allvisit',
      page: 1
    }
  },
  created: function () {
    this.params = {
      url: Config.TrophyUrl(this.id,this.page),
      page: 'trophy',
      key: `trophy:${this.id}.${this.page}`,
      ttl: {
        status: true,
        ttl: 1000 * 60 * 60 * 12
      }
    }
    const data = this.getData()
    document.title = `${Config.GlobalTitle}-排行`
  },
  methods: {
    getData: async function() {
      // console.log(this.params)
      const data = await Storage(this.params)
      // console.log(data)
      this.status = data.status
      this.list = data.list
      this.menu = data.menu
      this.lastpage = data.lastpage
    },
    changeData: function(id = '') {
      // console.log(id)
      this.makeParams('cd', id)
    },
    addPage: function() {
      // this.status = 3
      // console.log(this.page)
      this.makeParams('ad', this.id)
    },
    makeParams: function(type = '', id = '') {
      let page = 1
      if(type === 'cd') {
        this.status = 3
        this.page = 1
        this.id = id
      }else {
        page = this.page + 1
      }
      const oldid = this.menu[this.menu.length - 1].id;
      let get_page = 'trophy'
      if(id === oldid) get_page = oldid
      // console.log(oldid, page)
      this.params = {
        url: Config.TrophyUrl(id,page),
        page: get_page,
        key: `trophy:${id}.${page}`,
        ttl: {
          status: true,
          ttl: 1000 * 60 * 60 * 12
        }
      }
      this.getData()
      if(type === 'ad') this.page = page
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
