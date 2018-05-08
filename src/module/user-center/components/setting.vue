<template>
  <div id="setting">
    <van-cell-group>
      <van-cell title="缓存" value="20Mb" center />
      <van-cell title="修改密码" is-link @click="linkTo('password')"/>
      <van-cell title="消息设置" is-link @click="linkTo('setting')"/>
      <van-cell title="检查更新" value="v1.0.0" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'Setting',
  methods: {
    linkTo (param) {
      if (param === 'password') {
        this.$router.push({path: '/modifyPassword'})
      } else {
        this.$router.push({path: '/msgSetting'})
      }
    }
  }
}
</script>

<style scoped>
</style>
