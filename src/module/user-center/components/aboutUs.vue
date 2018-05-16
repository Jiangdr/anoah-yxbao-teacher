<template>
  <div id="about-us">
    <nav-bar :title="title" :hasBack="hasBack" @historyBack="back"></nav-bar>
    关于我们
  </div>
</template>

<script>
import NavBar from '@/module/user-center/components/common/navbar'
export default {
  name: 'AboutUs',
  data () {
    return {
      title: '关于我们',
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
