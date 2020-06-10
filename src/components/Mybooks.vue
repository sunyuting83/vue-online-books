<template>
  <div>
    <div v-if="status === 0">
      <Header></Header>
      <section class="content">
        <div class="catalog" v-if="st">
          <div ref="xxxMy">
            <div class="b-title"><em></em>我的书架</div>
            <div v-for="(item,index) in items" class="scroll" :key="index">
              <router-link tag="div" class="row list" :to="{ path: '/Detail/'+item.id, query: { prevPage: 'mybook'}}">
                <div class="col col-20 img">
                  <DefaultImg :img-url="item.cover" img-style="img100" ></DefaultImg>
                </div>
                <div class="col col-80 detail">
                  <h3>{{item.title}}</h3>
                  <div @click="pushWriter(item.writer ,$event)" class="writer">作者： {{item.writer}}</div>
                  <div class="intros">
                    <ul>
                      <li v-for="(intro,index) in item.intro" :key="index">
                        {{intro}}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col col-20 delete" @click="deleteBook(item.id,$event)">
                  <i class="fa fa-trash-o"></i>
                  <div>删除</div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div v-else class="catalog" style="height:100%">
          <img :src="tree" class="loading" />
          <h3 class="b-title" style="text-align: center;padding-left:0">书库空空入也</h3>
        </div>
      </section>
      <Tabs></Tabs>
    </div>
    <Loading v-else :page-status="status" :get-data="getData"></Loading>
  </div>
</template>

<script>
import Config from '@/helper/config'
import Loading from '@/components/public/Loading'
import Header from '@/components/public/Header'
import Tabs from '@/components/public/Tabs'
import DefaultImg from '@/components/public/DefaultImg'
import Tree from '@/assets/tree.svg'
import JRoll from 'jroll'
export default {
  components: {
    Loading,
    Header,
    Tabs,
    DefaultImg
  },
  name: 'Trophy',
  data () {
    return {
      status: 3,
      items: [],
      st: false,
      tree: Tree
    }
  },
  inject: ['reload'],
  mounted: function () {
    if(this.st) this.makeScroll()
  },
  created: function () {
    document.title = Config.GlobalTitle
    this.getData()
  },
  methods: {
    deleteBook(id,event) {
      // console.log(event)
      event.preventDefault()
      const key = 'savebook'
      this.items = this.items.filter(x=> x.id !== id)
      localStorage.setItem(key,JSON.stringify(this.items))
      this.reload()
    },
    getData() {
      this.items = []
      const key = 'savebook'
      let cache = localStorage.getItem(key) //读取LocalStorage
      if (cache === null) { //如果没有缓存
        this.st = false
        this.status = 0
      }else {
        cache = JSON.parse(cache)
        this.items = cache
        this.status = 0
        if(cache.length === 0) {
          this.st = false
        }else {
          this.st = true
        }
      }
    },
    makeScroll() {
      // 创建外层jroll实例
      var jroll = new JRoll(".content", {
          scrollBarY:true,
          bounce:false
      })
      
      var items = document.querySelectorAll(".scroll")
      var current = null //保存当前滑开的item
      for (var i=0,l=items.length; i<l; i++) {
          // 每行创建jroll实例
          const maxXX = items[0].querySelector('.delete').offsetWidth
          var j = new JRoll(items[i], {
              scrollX:true,
              bounce:false,
              maxX: -maxXX
          })

          j.on("scrollStart", function() {
              if (current && current !== this) {
                  current.scrollTo(0, 0, 100)
                  current = null
              }
          })

          j.on("scroll", function(e) {
              if (this.x === 0 && !current) {
                  this.call(jroll, e)
              } else {
                  current = this
              }
          })

          j.on("scrollEnd", function() {
              if (this.x > -50) {
                  this.scrollTo(0, 0, 100)
                  current = null
              } else {
                  this.scrollTo(this.maxScrollX, 0, 100)
              }
          })
      }
    },
    pushWriter(id = '', event = '') {
      event.preventDefault()
      // console.log(id)
      this.$router.push({path: `/writer/${id}`})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
