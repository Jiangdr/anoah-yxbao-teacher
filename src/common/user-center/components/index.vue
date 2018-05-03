<template>
  <div id="user-center">
    <router-link tag="div" :to="{name:'personal'}">个人资料</router-link>
    <router-link tag="div" :to="{name:'myClass'}">我的班级</router-link>
    <router-link tag="div" :to="{name:'feedback'}">意见反馈</router-link>
    <router-link tag="div" :to="{name:'setting'}">设置</router-link>
    <router-link tag="div" :to="{name:'aboutUs'}">关于我们</router-link>
    <van-tabbar v-model="active" @change="change">
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="chat">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'UserCenter',
  data () {
    return {
      active: 1
    }
  },
  created () {},
  computed: {},
  methods: {
    change (active) {
      this.$router.back(-1)
    }
  }
}
</script>

<style scoped>
</style>
