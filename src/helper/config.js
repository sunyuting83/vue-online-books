const CROSUrl = 'https://cors.zme.ink/'
const RootUrl = 'https://newapp.nds9.workers.dev/api/'
const IndexUrl = `${RootUrl}index`
const Category = `${RootUrl}category`
/**
 * 
http://www.xbiquge.la/
http://www.biqu6.com/
http://www.biqu.ge/
https://www.xiaoshuojie.com/
https://www.biqugeii.com/
http://www.biquger.com/
https://www.xsbiquge.net/
 */
const TrophyUrl = (id = '',page = '') => {
  return `${RootUrl}trophy?id=${id}&page=${page}`
}
const DetailUrl = (id = '') => {
  return `${RootUrl}detail?id=${id}`
}
const CategoryUrl = (id = 1, page = 1) => {
  return `${RootUrl}categorylist?id=${id}&page=${page}`
}
const WriterUrl = (id = '') => {
  // console.log(id)
  const url = `${RootUrl}writer?id=${id}`
  return url
}

const SearchUrl = (id = '',page = '') => {
  const url = `${RootUrl}search?id=${id}&page=${page}`
  return url
}

const ReadUrl = (bookid = '', id = '') => {
  return `${RootUrl}book?id=${id}&bookid=${bookid}`
}

const GlobalTitle = '免费小说-最新小说连载免费在线观看-笔趣阁'
const SliderRoot = 'https://www.r5k.com/'
const TabLabe = [
  {
    id: 0,
    title: '书架',
    icon: 'archive',
    link: '/mybook'
  },
  {
    id:1,
    title: '书城',
    icon: 'shopping-bag',
    link: '/'
  },
  {
    id:2,
    title: '排行',
    icon: 'trophy',
    link: '/trophy'
  },
]

const indexMenu = [
  {
    id: 0,
    title: '热门',
    icon: 'fa-free-code-camp',
    color: 'color:#fd6b67'
  },
  {
    id: 1,
    title: '排行',
    icon: 'fa-bar-chart',
    color: 'color:#6eccc6'
  },
  {
    id: 2,
    title: '人气',
    icon: 'fa-gg',
    color: 'color:#fd8a3f'
  }, {
    id: 3,
    title: '入库',
    icon: 'fa-cube',
    color: 'color:#74a8e6'
  },
  {
    id: 4,
    title: '最新',
    icon: 'fa-star',
    color: 'color:#aaca31'
  }
]

const slider = [
  `${SliderRoot}p/images/banner01.jpg`,
  `${SliderRoot}p/images/banner02.jpg`,
  `${SliderRoot}p/images/banner03.jpg`,
  `${SliderRoot}p/images/banner04.jpg`,
  `${SliderRoot}p/images/banner05.jpg`
]

export default {
  IndexUrl,
  Category,
  CategoryUrl,
  RootUrl,
  CROSUrl,
  TabLabe,
  slider,
  TrophyUrl,
  indexMenu,
  DetailUrl,
  SearchUrl,
  ReadUrl,
  WriterUrl,
  GlobalTitle
}
