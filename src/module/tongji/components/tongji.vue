<template>
  <div class="tongji">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'tongji'
}
</script>

<style>

</style>
