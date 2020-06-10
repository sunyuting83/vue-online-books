<template>
  <div v-if="status === 3">
    <img v-bind:src="loading" class="loading" />
  </div>
  <div v-else>
    <img v-bind:src="error" class="loading" />
    <Button :disabled="button" @click="getData(); setButton(button)" class="reload">重新加载</Button>
  </div>
</template>

<script>
import Loading from "@/assets/loading.svg"
import Error from "@/assets/error.svg"
export default {
  name: 'Loading',
  props: ['pageStatus','getData'],
  data () {
    return {
      loading: Loading,
      error: Error,
      status: this.pageStatus,
      button: false
    }
  },
  watch: {
    pageStatus:{
      handler: function (val, oldVal) { 
      // console.log(val,oldVal)
        if(val !== oldVal) this.status = val
        if(val === 1) this.button = false
      },
      deep: true
    }
  },
  methods:{
    setButton(status) {
      this.button = !status
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
