<template>
  <div id="other-question">
    <textarea cols="30" rows="10" placeholder="请简要描述你的问题和意见" v-model="msg"></textarea>
    <van-button type="primary" size="large" @click="complete">完成</van-button>
  </div>
</template>
<script>
export default {
  name: 'OtherQuestion',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    complete () {
      window.bus.$emit('complete', this.msg)
      this.$router.back(-1)
    }
  }
}
</script>
<style scoped>
</style>
