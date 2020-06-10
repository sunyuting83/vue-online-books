<template>
  <header>
    <div class="item-header">
      <div class="back" @click="back"><i class="fa fa-angle-left"></i></div>
      <div class="item-nav">{{headerTitle}}</div>
      <div class="search"></div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'BackHeader',
  props: ['headerTitle'],
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>