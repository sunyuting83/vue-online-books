import Config from './config'
const Img2Base64 = (url = '') => {
  return new Promise((resolve) => {
    var newImg = new Image()
    newImg.src = `${Config.CROSUrl}${url}`
    // console.log(newImg.src)
    newImg.crossOrigin = 'Anonymous';
    let data = '' //存储压缩后的图片
    newImg.onload = () => { // 图片加载成功后把地址给原来的img
      let canvas = document.createElement('canvas') //创建一个canvas元素
      let context = canvas.getContext('2d') //context相当于画笔，里面有各种可以进行绘图的API
      const imageWidth = 10 //压缩后图片的宽度，这里设置为缩小一半
      const imageHeight = (newImg.height * 10) / newImg.width //压缩后图片的高度，这里设置为缩小一半
      
      canvas.width = imageHeight //设置绘图的宽度
      canvas.height = imageWidth //设置绘图的高度

      //使用drawImage重新设置img标签中的图片大小，实现压缩。drawImage方法的参数可以自行查阅W3C
      context.drawImage(newImg, 0, 0, imageHeight, imageWidth)

      //使用toDataURL将canvas上的图片转换为base64格式
      data = canvas.toDataURL('image/jpeg',0.1)
      resolve(data)
    }
  })
}

export default {
  Img2Base64
}