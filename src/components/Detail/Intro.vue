<template>
  <div>
    <div class="catalog intro" :style="'height:' + navheight">
      <div class="b-title">简介</div>
      <ul ref="introls">
        <li v-for="(item,index) in this.bookIntro" :key="index">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="actupd" @click="makeHeight">
      <i :class="status?'fa fa-angle-up':'fa fa-angle-down'"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cover',
  props: ['bookIntro', 'detailList'],
  data () {
    return {
      navheight: '',
      status: false
    }
  },
  methods: {
    makeHeight: function() {
      const status = this.status
      if(status) {
        this.navheight = '7rem'
        this.status = false
      }else {
        const h = this.$refs.introls.offsetHeight
        const nav = (h + 58) / 16
        this.navheight = `${nav}rem`
        this.status = true
      }
    }
  }
}
</script>
<style>

</style>