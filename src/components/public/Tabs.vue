<template>
  <nav class="bar-tab row">
    <router-link tag="li" v-bind:to="item.link" class="col" v-for="item in tabs" v-bind:key="item.id">
        <i v-bind:class="['fa', 'fa-'+item.icon]"></i>
        <span>{{item.title}}</span>
    </router-link>
  </nav>
</template>

<script>
import Config from '@/helper/config'
export default {
  name: 'Tabs',
  data () {
    return {
      tabs: Config.TabLabe
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
