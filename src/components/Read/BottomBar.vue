<template>
  <div class="bar-tab red-bar row" :class="oPen?'active':null">
    <div class="changft row" :class="font?'active':null">
      <div class="col" @click="changeFont('reduce')"><i class="fa fa-minus"></i></div>
      <div class="col">{{parseInt(fontSize * 16)+'号'}}</div>
      <div class="col" @click="changeFont('push')"><i class="fa fa-plus"></i></div>
    </div>
    <li class="col" @click="openMenu">
        <i class="fa fa-list-ol"></i>
        <span>目录</span>
    </li>
    <li class="col" @click="openFont">
        <i class="fa fa-font"></i>
        <span>字号</span>
    </li>
    <li class="col" @click="nightSun">
        <i class="fa" :class="nightMode? 'fa-sun-o': 'fa-moon-o'"></i>
        <span>{{nightMode? '日间':'夜间'}}</span>
    </li>
    <li class="col" @click="xOry">
        <i class="fa" :class="xoryParam? 'fa-arrows-v': 'fa-arrows-h'"></i>
        <span>{{xoryParam? '纵向':'横向'}}</span>
    </li>
  </div>
</template>

<script>
export default {
  name: 'BottomBar',
  props: [
    'oPen', 
    'openMenu', 
    'nightSun', 
    'nightMode', 
    'xOry', 
    'xoryParam',
    'fontSize',
    'changeFont'
  ],
  data() {
    return {
      font:false
    }
  },
  methods: {
    openFont() {
      this.font = !this.font
    }
  }
}
</script>