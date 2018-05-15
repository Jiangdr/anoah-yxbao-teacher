<template>
  <div id="setting">
    <nav-bar :title="title" :hasBack="hasBack" @historyBack="back"></nav-bar>
    <van-cell-group>
      <van-cell title="缓存" value="20Mb" center />
      <van-cell title="修改密码" is-link @click="linkTo('password')"/>
      <van-cell title="消息设置" is-link @click="linkTo('setting')"/>
      <van-cell title="检查更新" value="v1.0.0" />
    </van-cell-group>
  </div>
</template>

<script>
import NavBar from '@/module/user-center/components/common/navbar'
export default {
  name: 'Setting',
  data () {
    return {
      title: '设置',
      hasBack: true
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
    }
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>
</style>
