<template>
  <nav class="bar-tab row">
    <li class="col bot" @click="saveBook">
      <i class="fa fa-book"></i>
      <span>{{check?'已存入书架':'加入书架'}}</span>
    </li>
    <router-link tag="div" class="col read bot" @mouseover.native="readBook()" :to="'/read/'+bookId+'/'+readId">
      <i class="fa fa-wpforms"></i>
      <span>立即阅读</span>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'Bottom',
  props: ['saveBook', 'bookId', 'readId', 'readBook'],
  data() {
    return {
      check: false
    }
  },
  created() {
    const key = 'savebook'
    let cache = localStorage.getItem(key)
    if(cache) {
      cache = JSON.parse(cache)
      const check = cache.filter(x => x.id === this.bookId)
      if(check.length > 0) this.check = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
