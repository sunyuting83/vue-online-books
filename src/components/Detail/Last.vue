<template>
  <div>
    <div class="catalog intro" style="height:auto" @click="detailList">
      <div class="b-title">目录</div>
      <ul class="row">
        <li class="col col-5"><i class="fa fa-list-ul"></i></li>
        <li class="col col-90 lsat_title">{{lastData.title}}</li>
        <li class="col col-5"><i class="fa fa-chevron-right"></i></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Last',
  props: ['lastData','detailList']
}
</script>
<style>

</style>