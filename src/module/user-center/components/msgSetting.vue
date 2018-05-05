<template>
  <div id="msg-setting">
    <van-cell-group>
      <van-switch-cell border v-model="checked" title="接收作业消息" />
      <van-switch-cell border v-model="checked" title="接收学校通知" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'MsgSetting',
  data () {
    return {
      checked: true
    }
  }
}
</script>

<style scoped>
</style>
