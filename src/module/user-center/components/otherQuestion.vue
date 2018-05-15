<template>
  <div id="other-question">
    <nav-bar :title="title" :hasBack="hasBack" @historyBack="back"></nav-bar>
    <textarea cols="30" rows="10" placeholder="请简要描述你的问题和意见" v-model="msg"></textarea>
    <van-button type="primary" size="large" @click="complete">完成</van-button>
  </div>
</template>
<script>
import NavBar from '@/module/user-center/components/common/navbar'
export default {
  name: 'OtherQuestion',
  data () {
    return {
      title: '其他问题',
      hasBack: true,
      msg: ''
    }
  },
  methods: {
    complete () {
      window.bus.$emit('complete', this.msg)
      this.$router.back(-1)
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
