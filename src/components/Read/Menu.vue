<template>
  <div class="menu-list" :class="[openMenu? 'active':null,nightMode?'night':null]">
    <header class="menu-head">
      <div class="item-header">
        <div class="back" @click="openFun"><i class="fa fa-angle-left"></i></div>
        <div class="item-nav"></div>
        <div class="search" @click="setSort">
          <i class="fa" :class="sort?'fa-sort-amount-asc':'fa-sort-amount-desc'"></i>
        </div>
      </div>
    </header>
    <div>
      <ul class="row" v-for="(item,index) in list" :key="index" @click="getData(index,item.id)">
        <li class="col listitle" :style="pageId === index? 'color:#842424':null">{{item.title}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: [
    'openMenu',
    'openFun',
    'nightMode',
    'menuList',
    'pageId',
    'bookId',
    'getData'
    ],
  data() {
    return {
      list: this.menuList,
      sort: true
    }
  },
  methods: {
    setSort(){
      let sort = this.sort
      this.sort = !sort
      if(sort) {
        this.list.sort((a, b) => b.sort - a.sort)
      }else {
        this.list.sort((a, b) => a.sort - b.sort)
      }
    }
  }
}
</script>