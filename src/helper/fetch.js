import Api from './api'

export default async (url = '', pages = '', data = {}, type = 'GET') => {
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
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Content-type':'text/html;charset=UTF-8'
    }
  }

  if (type === 'POST') {
    Object.defineProperty(requestConfig, 'body', {
      value: JSON.stringify(data)
    })
  }
  return new Promise((resolve, reject) => {
    fetch(url, requestConfig)
      .then(res => {
        if(res.ok) {
          return res.blob()
        }else {
          resolve({
            status: 1,
            message: res.status
          })
        }
      })
      .then(blob => {
        var reader = new FileReader();
        reader.onload = function (e) {
          var text = reader.result;
          // console.log(pages)
          const json = makeData(pages, text)
          resolve(json)
        }
        reader.readAsText(blob, 'GBK')
      })
      .catch((err) => {
        resolve({
          status: 1,
          message: err.message
        })
      })
  })
}

function makeData(page, data) {
  let json = {}
  switch (page) {
    case 'index':
      json = Api.IndexJson(data)
      break
    case 'getcategory':
      json = Api.Category(data)
      break
    case 'trophy':
      json = Api.TrophyJson(data)
      break
    case 'quanben':
      json = Api.AllBooks(data)
      break
    case 'detail':
      json = Api.BookJson(data)
      break
    case 'writer':
      json = Api.writerJson(data)
      break
    case 'category':
      json = Api.catagoryJson(data)
      break
    case 'search':
      json = Api.writerJson(data)
      break
    case 'book':
      json = Api.readJson(data)
      break
    default:
      json = Api.IndexJson(data)
      break
  }
  return json
}