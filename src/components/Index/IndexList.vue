<template>
  <div style="margin-top: 0.625rem;">
    <div class="catalog" v-for="(item,index) in category" :key="index">
      <div class="b-title"><em></em>{{item.title}}</div>
      <div class="row row-wrap indlist">
        <router-link tag="div" @mouseover.native="setHeight()" class="col col-33" v-for="item in item.list" :key="item.id" :to="{ path: '/Detail/'+item.id, query: { prevPage: 'index'}}">
          <div class="col indimg">
            <DefaultImg :img-url="item.cover" img-style="img100" ></DefaultImg>
          </div>
          <div class="col detail">
            <h3>{{item.title}}</h3>
            <div @click="pushWriter(item.writer ,$event)" class="writer">{{item.writer}}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import DefaultImg from '@/components/public/DefaultImg'
export default {
  name: 'catagoryList',
  props: ['categoryList', 'scrollTop'],
  components: {
    DefaultImg
  },
  data () {
    return {
      category: this.categoryList
    }
  },
  methods: {
    setHeight() {
      // 路由点击函数不能使用@click 应使用@mouseover.native
      sessionStorage.setItem('setheight:index', this.scrollTop)
    },
    pushWriter(id = '', event = '') {
      event.preventDefault()
      // console.log(id)
      this.$router.push({path: `/writer/${id}`})
    }
  }
}
</script>
