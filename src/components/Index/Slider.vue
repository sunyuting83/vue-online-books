<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div v-for='item in slider' :key='item.id' class="swiper-slide">
        <router-link tag="div" v-bind:to="'/Detail/'+item.id">
          <img :src="item.cover" style="width:100%" :alt="item.title">
        </router-link>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'; 
import 'swiper/css/swiper.min.css';
export default {
  name: 'Slider',
  props: ['sliderList'],
  data () {
    return {
      slider: this.sliderList
    }
  },
  mounted(){
    this.$nextTick(function () {
      var mySwiper = new Swiper('.swiper-container', {
        autoplay:true,
        loop:true,
        pagination: {
          el: '.swiper-pagination'
        }
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
