<template>
  <header>
    <div class="item-header">
      <div class="item-search">
        <router-link tag="div" to="/search">
          <i class="fa fa-search"></i>
          搜索书名...
        </router-link>
      </div>
      <router-link tag="div" class="back" to="/category">
        <i class="fa fa-bars"></i>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>