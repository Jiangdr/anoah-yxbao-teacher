<template>
  <div id="modify-phone">
    <nav-bar :title="title" :hasBack="hasBack" @historyBack="back"></nav-bar>
    修改手机号
  </div>
</template>

<script>
import NavBar from '@/module/user-center/components/common/navbar'
export default {
  name: 'ModifyPhone',
  data () {
    return {
      title: '修改手机',
      hasBack: true
    }
  },
  methods: {
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
