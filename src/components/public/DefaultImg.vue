<template>
  <img :src="url" :class="imgStyle" />
</template>

<script>
const rootimg = 'https://r5k.oss-cn-hongkong.aliyuncs.com/book/z2_88_88407/img01.jpg'
const defaultimg = `${rootimg}?x-oss-process=image/resize,w_80`
const loadingimg = `${rootimg}?x-oss-process=image/resize,w_15`
export default {
  name: 'DefaultImg',
  props: ['imgUrl','imgStyle'],
  data () {
    return {
      url: loadingimg
    }
  },
  mounted() {
    // let cache = localStorage.getItem(`cover:${this.bookId}`) //读取LocalStorage
    // if (cache === null) {
    //   var newImg = new Image()
    //   newImg.src = this.imgUrl
    //   newImg.onerror = () => { // 图片加载错误时的替换图片
    //     newImg.src = defaultimg
    //   } 
    //   newImg.onload = async() => { // 图片加载成功后把地址给原来的img
    //     // this.url = newImg.src
    //     this.url = await Api.Img2Base64(this.imgUrl, this.bookId)
    //   }
    // }else {
    //   this.url = cache
    // }
    var newImg = new Image()
    newImg.src = this.imgUrl
    newImg.onerror = () => { // 图片加载错误时的替换图片
      newImg.src = defaultimg
    }
    newImg.onload = async() => { // 图片加载成功后把地址给原来的img
      if(newImg.height < 100) {
        this.url = defaultimg
      }else {
        this.url = newImg.src
      }
      // this.url = await Api.Img2Base64(this.imgUrl, this.bookId)
    }
  }
}
</script>