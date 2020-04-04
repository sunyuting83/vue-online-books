<template>
  <div>
    <header class="thisHeader" style="background:#d0c8a1;color:#333">
      <div class="item-header">
        <div class="back" @click="closeData(), cleanData()"><i class="fa fa-angle-left"></i></div>
        <div class="item-nav">{{title}}</div>
        <div class="search" @click="setSort">
          <i class="fa" :class="sort?'fa-sort-amount-asc':'fa-sort-amount-desc'"></i>
        </div>
      </div>
    </header>
    <div class="catalog" style="background:#d0c8a1">
      <router-link 
        tag="ul" 
        class="row" 
        v-for="(item,index) in list" 
        :key="index" 
        @mouseover.native="readBook(index)"
        :to="'/read/'+bookId+'/'+item.id">
        <li class="col listitle">{{item.title}}</li>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: ['someList','openTitle','closeData','bookId'],
  data () {
    return {
      list: this.someList,
      title: this.openTitle,
      id: this.bookId,
      sort: true
    }
  },
  methods: {
    cleanData() {
      this.list = []
      this.title = ''
    },
    setSort(){
      let sort = this.sort
      this.sort = !sort
      if(sort) {
        this.list.sort((a, b) => b.sort - a.sort)
      }else {
        this.list.sort((a, b) => a.sort - b.sort)
      }
      sessionStorage.setItem(`book.sort:${this.id}`, this.sort)
    },
    readBook(index) {
      sessionStorage.setItem('readbook', JSON.stringify(this.list))
      if(this.sort) {
        localStorage.setItem(`book.n:${this.id}`, index)
      }else {
        const s = this.list.length - 1 - index
        localStorage.setItem(`book.n:${this.id}`, s)
      }
    }
  },
  beforeDestroy() {
    this.sort = true
    this.list.sort((a, b) => b.sort - a.sort)
  }
}
</script>
<style>

</style>