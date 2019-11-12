<template>
  <div class="catalog">
    <div class="row row-wrap">
      <div v-for="(item,index) in menu" :key="index" class="col col-25">
        <div v-if="id !== item.id" @click="changeData(item.id)" :class="{'active':(id === item.id),'unactive':(id != item.id)}" class="label">{{item.title}}</div>
        <div v-else :class="{'active':(id === item.id),'unactive':(id != item.id)}" class="label">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrophyClass',
  props: ['pageId', 'changeData'],
  data () {
    return {
      id: this.pageId,
      menu: []
    }
  },
  created: function () {
    this.menu = JSON.parse(localStorage.getItem('trophy:allvisit.1')).menu
    // console.log(this.menu)
  },
  watch: {
    id: function (val, oldVal) { 
      // console.log(val,oldVal)
      if(val !== oldVal) this.id = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
