<template>
  <div id="modify-name">
    <nav-bar :title="title" :hasBack="hasBack" @historyBack="back"></nav-bar>
  </div>
</template>

<script>
import NavBar from '@/module/user-center/components/common/navbar'
export default {
  name: 'ModifyName',
  data () {
    return {
      title: '修改姓名',
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
  #modify-name{
    width: 100%;
    height: 100%;
  }
</style>
