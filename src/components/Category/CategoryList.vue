<template>
  <div>
    <div v-if="status === 0">
      <BackHeader :header-title="title"></BackHeader>
      <section class="content">
        <div class="contentx clist">
          <IndexReco :reco-list="slider"></IndexReco>
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
import ListData from '@/components/public/List'
import IndexReco from '@/components/Index/IndexReco'
import BackHeader from '@/components/public/BackHeader'
import Tabs from '@/components/public/Tabs'
export default {
  components: {
    Loading,
    ListData,
    BackHeader,
    Tabs,
    IndexReco
  },
  name: 'CategoryList',
  data () {
    return {
      list: [],
      status: 3,
      slider: [],
      id: this.$route.params.id,
      page: 1,
      lastpage: 0
    }
  },
  created() {
    this.id = this.$route.params.id
    this.params = {
      url: Config.CategoryUrl(this.id,this.page),
      page: 'category',
      key: `category:${this.id}.${this.page}`,
      ttl: {
        status: true,
        ttl: 1000 * 60 * 60 * 12
      }
    }
    this.getData()
  },
  methods: {
    async getData() {
      // console.log(this.params)
      const data = await Storage(this.params)
      // console.log(data)
      this.status = data.status
      this.list = data.list
      this.lastpage = data.lastpage
      this.slider = data.slider
      if(this.page === 1) this.title = data.title
      document.title = `${this.title},${Config.GlobalTitle}`
    },
    changeData(id = '') {
      // console.log(id)
      this.makeParams('cd', id)
    },
    addPage() {
      // this.status = 3
      // console.log(this.page)
      this.makeParams('ad', this.id)
    },
    makeParams(type = '', id = '') {
      let page = 1
      if(type === 'cd') {
        this.status = 3
        this.page = 1
        this.id = id
      }else {
        page = this.page + 1
      }
      let get_page = 'category'
      this.params = {
        url: Config.CategoryUrl(id,page),
        page: get_page,
        key: `category:${id}.${page}`,
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
