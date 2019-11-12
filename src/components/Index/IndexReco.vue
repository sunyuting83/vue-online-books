<template>
  <div class="catalog sld">
    <div class="b-title"><em></em>重磅推荐</div>
    <div class="swiper-container1">
      <div class="swiper-wrapper">
        <div v-for='item in slider' :key='item.id' class="swiper-slide">
          <router-link tag="div" @mouseover.native="setHeight()" class="row list relist" :to="{ path: '/Detail/'+item.id, query: { prevPage: 'index'}}">
            <div class="col col-25 img">
              <DefaultImg :img-url="item.cover" img-style="img100" ></DefaultImg>
            </div>
            <div class="col detail">
              <h3>{{item.title}}</h3>
              <div v-if="item.writer" @click="pushWriter(item.writer ,$event)" class="writer">作者： {{item.writer}}</div>
              <div class="intro">{{item.intro}}</div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="swiper-pagination1"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'; 
import 'swiper/css/swiper.min.css';
import DefaultImg from '@/components/public/DefaultImg'
export default {
  name: 'RecoSlider',
  props: ['recoList'],
  components: {
    DefaultImg
  },
  data () {
    return {
      slider: this.recoList
    }
  },
  methods: {
    setHeight() {
      // 路由点击函数不能使用@click 应使用@mouseover.native
      sessionStorage.setItem('setheight:index', 0)
    },
    pushWriter(id = '', event = '') {
      event.preventDefault()
      // console.log(id)
      this.$router.push({path: `/writer/${id}`})
    }
  },
  mounted(){
    this.$nextTick(function () {
      var mySwiper = new Swiper('.swiper-container1', {
        autoplay:true,
        loop:true,
        pagination: {
          el: '.swiper-pagination1'
        }
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->