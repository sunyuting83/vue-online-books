<template>
  <div class="covertop">
    <div class="row list relist delist">
      <div class="col col-30 img">
        <DefaultImg :img-url="bookDetail.cover" img-style="img100" ></DefaultImg>
      </div>
      <div class="col detail">
        <h3 class="whites">{{bookDetail.title}}</h3>
        <div @click="pushWriter(bookDetail.writer ,$event)" class="writer whites">作者： {{bookDetail.writer}}</div>
        <div class="writer whites">字数： {{bookDetail.textnb}}</div>
        <div class="writer whites">阅读数： {{bookDetail.readed}}</div>
        <div class="writer whites">状态： {{bookDetail.status? '完本':'连载'}}</div>
      </div>
    </div>
    <img :src="topback" class="topback" />
  </div>
</template>

<script>
import DefaultImg from '@/components/public/DefaultImg'
import API from '@/helper/api'
export default {
  name: 'Cover',
  props: ['bookDetail'],
  components: {
    DefaultImg
  },
  data () {
    return {
      topback: ''
    }
  },
  created:async function (){
    this.topback = await API.Img2Base64(this.bookDetail.cover)
  },
  methods: {
    pushWriter(id = '', event = '') {
      event.preventDefault()
      // console.log(id)
      this.$router.push({path: `/writer/${id}`})
    }
  }
}
</script>
<style>

</style>