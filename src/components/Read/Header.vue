<template>
  <header class="read-head" :class="openThis?'active':null">
    <div class="item-header">
      <div class="back" @click="back"><i class="fa fa-angle-left"></i></div>
      <div class="item-nav"></div>
      <div class="search">
        <i class="fa fa-ellipsis-v"></i>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'BackHeader',
  props: ['headerTitle','openThis'],
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
}
</script>