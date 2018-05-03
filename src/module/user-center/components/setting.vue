<template>
  <div id="setting">
    <div>缓存</div>
    <router-link tag="div" :to="{name:'modifyPassword'}">修改密码</router-link>
    <router-link tag="div" :to="{name:'msgSetting'}">消息设置</router-link>
    <div>检查更新</div>
  </div>
</template>

<script>
export default {
  name: 'Setting'
}
</script>

<style scoped>
</style>
