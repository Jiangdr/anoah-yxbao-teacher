<template>
  <div id="user-center">
    <nav-bar title="我的" :hasBack="hasBack"></nav-bar>
    <router-link class="item-choice van-hairline--bottom" tag="div" :to="{path:'/personal'}">个人资料</router-link>
    <router-link class="item-choice van-hairline--bottom" tag="div" :to="{path:'/myClass'}">我的班级</router-link>
    <router-link class="item-choice van-hairline--bottom" tag="div" :to="{path:'/feedback'}">意见反馈</router-link>
    <router-link class="item-choice van-hairline--bottom" tag="div" :to="{path:'/setting'}">设置</router-link>
    <router-link class="item-choice van-hairline--bottom" tag="div" :to="{path:'/aboutUs'}">关于我们</router-link>
    <van-tabbar v-model="active" @change="change" class="bar">
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="chat">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import NavBar from '@/module/user-center/components/common/navbar'
// import HeaderBar from '@/components/common/header-bar'
export default {
  name: 'UserCenter',
  data () {
    return {
      active: 1,
      hasBack: false
    }
  },
  created () {},
  computed: {},
  methods: {
    change (active) {
      this.$router.back(-1)
    }
  },
  components: {
    NavBar
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
    padding: 0 15px;
  }
</style>
