import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index/Index'
import Trophy from '@/components/Trophy/Trophy'
import Detail from '@/components/Detail/Detail'
import Mybooks from '@/components/Mybooks'
import Writer from '@/components/Writer'
import Category from '@/components/Category/Category'
import CategoryList from '@/components/Category/CategoryList'
import IndexList from '@/components/Index/IndexLs'
import Search from '@/components/Search'
import Read from '@/components/Read/Read'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/trophy',
      name: 'Trophy',
      component: Trophy
    },
    {
      path: '/mybook',
      name: 'Mybooks',
      component: Mybooks
    }, {
      path: '/Detail/:id',
      name: 'Detail',
      component: Detail
    },{
      path: '/writer/:id',
      name: 'Writer',
      component: Writer
    }, {
      path: '/category',
      name: 'Category',
      component: Category
    }, {
      path: '/category/:id',
      name: 'CategoryList',
      component: CategoryList
    }, {
      path: '/indexmenu/:id',
      name: 'indexLs',
      component: IndexList
    }, {
      path: '/search',
      name: 'Search',
      component: Search
    }, {
      path: '/read/:bookid/:id',
      name: 'Read',
      component: Read
    }
  ]
})
