<template>
  <div v-if="caChe">
    <div class="catalog intro" style="height:auto">
      <div class="b-title">最后阅读章节</div>
      <router-link tag="ul" class="row" @mouseover.native="readBook()" :to="'/read/'+bookId+'/'+cacheData.id">
        <li class="col col-5"><i class="fa fa-circle-o"></i></li>
        <li class="col col-90 lsat_title">{{cacheData.title}}</li>
        <li class="col col-5"><i class="fa fa-chevron-right"></i></li>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cache',
  props: ['bookId','caChe','cacheData', 'readBook']
}
</script>