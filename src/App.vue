<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view></router-view>
    </keep-alive>
    <router-view v-else/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{
  user-select: none;
}
</style>
