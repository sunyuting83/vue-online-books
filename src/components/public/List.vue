<template>
<div id="jroll">
  <jroll-infinite
    class="jroll-vue-infinite"
    ref="myJRoll"
    :total="lspage"
    :jroll-options="options" 
    @on-scroll-bottom="scrollBottom">
    <router-link tag="div" class="row list" v-for="(item,index) in items" :key="index" :to="{ path: '/Detail/'+item.id, query: { prevPage: 'cat'}}">
      <div class="col col-20 img">
        <DefaultImg :img-url="item.cover" img-style="img100" ></DefaultImg>
      </div>
      <div class="col detail">
        <h3>{{item.title}}</h3>
        <div @click="pushWriter(item.writer ,$event)" class="writer">作者： {{item.writer}}</div>
        <div>{{item.last.last_title}}</div>
      </div>
    </router-link>
  </jroll-infinite>
</div>
</template>

<script>
import JRoll from 'jroll'
import VueInfinite2 from 'jroll-vue-infinite2'
import DefaultImg from '@/components/public/DefaultImg'
export default {
  name: 'ListData',
  components: {
    'jroll-infinite':JRoll.VueInfinite2(),
    DefaultImg
  },
  props: ['listData', 'listPage', 'addPage', 'lastPage'],
  data () {
    return {
      page: 1,
      items: this.listData,
      options: {
        scrollX: false,
        scrollBarY: true,
        scrollBarFade: true
      },
      lspage: this.lastPage
    }
  },
  mounted: function () {
    // console.log(this.$refs.myJRoll.jroll)
  },
  methods: {
    scrollBottom: function (page, success) {
      // this.$refs.myJRoll.jroll.disable()
      
      page + 1
      // console.log(this.page,this.lastPage)
      // if(this.lastPage === 1) {this.$refs.myJRoll.jroll.enable()}
      if(this.page < this.lastPage) {
        this.addPage()
      }else if(this.page >= this.lastPage) {
        // console.log(this.$refs.myJRoll.jroll.scroller.querySelector('.jroll-infinite-tip'))
        success()
        this.$refs.myJRoll.jroll.scroller.querySelector('.jroll-infinite-tip').style.display = 'none'
      }
    },
    pushWriter(id = '', event = '') {
      event.preventDefault()
      // console.log(id)
      this.$router.push({path: `/writer/${id}`})
    }
  },
  watch: {
    listData: function(val,oldval){
      if(val.length > 0) {
        if(val[0].id !== oldval[0].id)
        this.items = this.items.concat(val)
        // this.$refs.myJRoll.jroll.enable()
      }
    },
    listPage: function(val,oldval) {
      if(val !== oldval) this.page = val 
    },
    lastPage: function(val,oldval) {
      if(val !== oldval) this.lspage = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
