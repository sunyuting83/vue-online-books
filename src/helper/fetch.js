export default (url = '', data = {}, type = 'GET') => {
  type = type.toUpperCase()
  // 此处规定get请求的参数使用时放在data中，如同post请求
  if (type === 'GET') {
    let dataStr = ''
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
  }

  let requestConfig = {
    // fetch默认不会带cookie，需要添加配置项credentials允许携带cookie
    method: type,
    headers: {
      'Content-type':'application/json;charset=UTF-8'
    }
  }

  if (type === 'POST') {
    Object.defineProperty(requestConfig, 'body', {
      value: JSON.stringify(data)
    })
  }
  return new Promise((resolve) => {
    fetch(url, requestConfig)
      .then(res => {
        if(res.ok) {
          resolve (res.json())
        }else {
          resolve({
            status: 1,
            message: res.status
          })
        }
      })
      .catch((err) => {
        resolve({
          status: 1,
          message: err.message
        })
      })
  })
}