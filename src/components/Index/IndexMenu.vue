<template>
  <div class="catalog row">
    <router-link tag="div" class="col col-20" v-for="item in menu" :key="item.id" :to="'/indexmenu/'+item.id">
      <i class="fa" :class="item.icon" :style="item.color"></i>
      {{item.title}}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'indexMenu',
  props: ['indexMenu'],
  data () {
    return {
      menu: this.indexMenu
    }
  }
}
</script>