<template>
  <div v-if="status === 0">
    <BackHeader :header-title="title"></BackHeader>
    <section class="content" style="background:#fff;padding-bottom:0">
      <div class="catalog">
        <div class="row row-wrap indlist">
          <router-link tag="div" class="col col-33" v-for="(item,index) in list" :key="index" :to="'/Detail/'+item.id">
            <div class="col indimg">
              <DefaultImg :img-url="item.cover" img-style="img100" ></DefaultImg>
            </div>
            <div class="col detail">
              <h3>{{item.title}}</h3>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
  <Loading v-else :page-status="status" :get-data="getData"></Loading>
</template>

<script>
import Config from '@/helper/config'
import Storage from '@/helper/storageTTL'
import DefaultImg from '@/components/public/DefaultImg'
import BackHeader from '@/components/public/BackHeader'
import Loading from '@/components/public/Loading'
export default {
  name: 'IndexList',
  components: {
    DefaultImg,
    BackHeader,
    Loading
  },
  data () {
    return {
      status: 3,
      id: 0,
      list: [],
      title: '',
      params: {}
    }
  },
  created() {
    this.id = this.$route.params.id
    this.params = {
      url: Config.IndexUrl,
      page: 'index',
      key: 'index',
      ttl: {
        status: true,
        ttl: 1000 * 60 * 60 * 12
      }
    }
    document.title = `${Config.indexMenu[this.id].title}-${Config.GlobalTitle}`
    this.getData()
  },
  methods: {
    async getData() {
      const id = Number(this.id)
      // console.log(id)
      this.status = 3
      const data = await Storage(this.params)
      // console.log(data)
      this.status = data.status
      this.list = data.some[id]
      this.title = Config.indexMenu[id].title
    }
  }
}
</script>
