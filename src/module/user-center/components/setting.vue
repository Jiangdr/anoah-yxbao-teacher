<template>
  <div id="setting">
    <nav-bar :title="title" :hasBack="hasBack" @historyBack="back"></nav-bar>
    <van-cell-group>
      <van-cell title="缓存" value="20Mb" center />
      <van-cell title="修改密码" is-link @click="linkTo('password')"/>
      <van-cell title="消息设置" is-link @click="linkTo('setting')"/>
      <van-cell title="检查更新" value="v1.0.0" />
    </van-cell-group>
    <van-button class="loginout" type="primary" size="large" @click="showActionSheet = true">退出</van-button>
    <van-actionsheet v-model="showActionSheet" :actions="actions" cancel-text="取消" />
  </div>
</template>

<script>
import NavBar from '@/module/user-center/components/common/navbar'
export default {
  name: 'Setting',
  data () {
    return {
      title: '设置',
      hasBack: true,
      showActionSheet: false,
      actions: [
        {
          name: '退出登录',
          callback: this.loginOut,
          className: 'warning'
        }
      ]
    }
  },
  methods: {
    linkTo (param) {
      if (param === 'password') {
        this.$router.push({path: '/modifyPassword'})
      } else {
        this.$router.push({path: '/msgSetting'})
      }
    },
    back () {
      this.$router.back(-1)
    },
    loginOut () {
      this.showActionSheet = false
      localStorage.clear()
      this.$router.push({path: '/login?redirect=/'})
    }
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>
.loginout{
  position: fixed;
  bottom: 0;
}
.warning{
  color: #e4393c !important;
}
</style>
