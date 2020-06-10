<template>
  <div v-if="status === 0">
    <header>
      <div class="item-header">
        <div class="back" @click="back"><i class="fa fa-angle-left"></i></div>
        <div class="item-nav">分类</div>
        <div class="search"></div>
      </div>
    </header>
    <section class="content" style="background:#fff;padding-bottom:0">
      <div class="catalog">
        <div class="row row-wrap catelist">
          <router-link tag="div" class="col col-50" v-for="(item,index) in category" :key="index" :to="'/category/'+item.id">
            <div class="row ca">
              <div class="col col-60 tt">
                <h3>{{item.title}}</h3>
              </div>
              <div class="col col-40">
                <DefaultImg :img-url="item.cover" img-style="img100" ></DefaultImg>
              </div>
            </div>
          </router-link>
        </div>
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
export default {
  name: 'catagoryList',
  components: {
    DefaultImg,
    Loading
  },
  data () {
    return {
      status: 3,
      category: [],
      params:{}
    }
  },
  created () {
    this.params = {
      url: Config.Category,
      page: 'getcategory',
      key: 'category',
      ttl: {
        status: true,
        ttl: 31536000000
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
      this.category = data.category
      document.title = `${Config.GlobalTitle}-分类`
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
