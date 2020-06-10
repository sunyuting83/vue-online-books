<template>
  <div style="margin-top: 0.625rem">
    <div class="catalog">
      <div class="b-title"><em></em>强烈推荐</div>
      <div class="row row-wrap indlist">
        <div class="col col-33" v-for="item in recoList" :key="item.id">
          <router-link tag="div" class="col indimg" v-bind:to="'/Detail/'+item.id">
            <DefaultImg :img-url="item.cover" img-style="img100" ></DefaultImg>
          </router-link>
          <div class="col detail">
            <h3>{{item.title}}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DefaultImg from '@/components/public/DefaultImg'
export default {
  name: 'Recommend',
  props: ['recoList'],
  components: {
    DefaultImg
  }
}
</script>