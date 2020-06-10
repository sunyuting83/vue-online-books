<template>
  <div v-if="status === 0">
    <BackHeader :header-title="title"></BackHeader>
    <section class="content" style="background:#fff;padding-bottom:0">
      <div class="catalog">
        <router-link tag="div" class="row list" v-for="(item,index) in list" :key="index" :to="{ path: '/Detail/'+item.id, query: { prevPage: 'writer'}}">
          <div class="col col-20 img">
            <DefaultImg :img-url="item.cover" img-style="img100" ></DefaultImg>
          </div>
          <div class="col detail">
            <h3>{{item.title}}</h3>
            <div class="writer">字数： {{item.number}}</div>
            <div class="writer">状态： {{item.status? '连载': '完本'}}</div>
            <div>{{item.last.last_title}}</div>
          </div>
        </router-link>
      </div>
    </section>
  </div>
  <Loading v-else :page-status="status" :get-data="getData"></Loading>
</template>

<script>
import DefaultImg from '@/components/public/DefaultImg'
import Config from '@/helper/config'
import Storage from '@/helper/storageTTL'
import Loading from '@/components/public/Loading'
import BackHeader from '@/components/public/BackHeader'
export default {
  name: 'Writer',
  components: {
    DefaultImg,
    Loading,
    BackHeader
  },
  data () {
    return {
      status: 3,
      list: [],
      title: this.$route.params.id
    }
  },
  created: async function () {
    // console.log(this.title)
    this.params = {
      url: Config.WriterUrl(this.title),
      page: 'writer',
      key: 'writer',
      ttl: {
        status: false,
        ttl: 0
      }
    }
    this.getData()
  },
  methods: {
    async getData() {
      this.status = 3
      const data = await Storage(this.params)
      // console.log(data)
      this.status = data.status
      this.list = data.list
      document.title = `${this.title}-${Config.GlobalTitle}`
    },
    back() {
      this.$router.go(-1)
    }
  },
  watch: {
    '$route'(){
      this.title = this.$route.params.id
      this.getData()
    }
  }
}
</script>
