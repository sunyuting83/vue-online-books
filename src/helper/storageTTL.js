/**
 * @param {String} url api网址
 * @param {String} page 请求页面
 * @param {Object} ttl 超时状态及超时时间
 * @param {String} key 缓存Key
 * @return {Object}
 */
import fetch from './fetch'
export default async function Storage (params = {}) {
  const {url, page, key, ttl} = params
  let cache = localStorage.getItem(key) //读取LocalStorage
  if (cache === null) { //如果没有缓存
    // console.log(url,page)
    let data = await fetch(url, page) //拉取数据
    // console.log(data)
    if(ttl.status === false) {// 如果不需要缓存超时处理
      return data //返回数据
    }else {
      // 需要缓存超时
      if(data.status === 0) {
        const now = Date.now() + 1 //获取当前时间
        data['ttl'] = now + ttl.ttl //设置超时时间
        // console.log(data)
        localStorage.setItem(key, JSON.stringify(data)) //保存缓存
      }
      return data //返回数据
    }
  } else { //如果缓存存在
    if (ttl.status === false) { // 如果不需要缓存超时处理
      return cache //返回缓存数据
    } else {
      const now = Date.now() + 1 //获取当前时间
      cache = JSON.parse(cache) //JSON化缓存数据
      if (now >= cache.ttl) { //如果超时
        localStorage.removeItem(key) // 删除缓存
        let data = await fetch(url, page) //拉取数据
        if (data.status === 0) {
          data['ttl'] = now + ttl.ttl //设置超时时间
          localStorage.setItem(key, JSON.stringify(data)) //保存缓存
        }
        return data //返回数据
      } else {
        return cache //返回缓存数据
      }
    }
  }
}