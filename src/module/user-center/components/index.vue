<template>
  <div id="user-center">
    <router-link class="item-choice van-hairline--bottom" tag="div" :to="{name:'personal'}">个人资料</router-link>
    <router-link class="item-choice van-hairline--bottom" tag="div" :to="{name:'myClass'}">我的班级</router-link>
    <router-link class="item-choice van-hairline--bottom" tag="div" :to="{name:'feedback'}">意见反馈</router-link>
    <router-link class="item-choice van-hairline--bottom" tag="div" :to="{name:'setting'}">设置</router-link>
    <router-link class="item-choice van-hairline--bottom" tag="div" :to="{name:'aboutUs'}">关于我们</router-link>
    <van-tabbar v-model="active" @change="change" class="bar">
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
  #user-center{
    font-size: 16px;
  }
  #user-center .item-choice{
    line-height: 50px;
    height: 50px;
  }
</style>
