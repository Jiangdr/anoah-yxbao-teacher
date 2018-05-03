<template>
  <div id="user-info">
    <div @click="modifyIcon">头像</div>
    <div>账号</div>
    <router-link tag="div" :to="{name:'modifyName'}">姓名</router-link>
    <div>学校</div>
    <router-link tag="div" :to="{name:'modifyPhone'}">手机号</router-link>
    <van-actionsheet v-model="show" title="支持以下配送方式">
      <p>一些内容</p>
    </van-actionsheet>
  </div>
</template>

<script>
export default {
  name: 'Personal',
  data () {
    return {
      show: false
    }
  },
  methods: {
    modifyIcon () {
      this.show = !this.show
    }
  }
}
</script>

<style scoped>
</style>
