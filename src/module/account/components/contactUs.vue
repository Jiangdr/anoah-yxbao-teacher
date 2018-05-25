<template>
  <div id="contact-us">
    <nav-bar :title="title" :hasBack="hasBack" @historyBack="back"></nav-bar>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
import NavBar from '@/module/user-center/components/common/navbar'
export default {
  name: 'ContactUs',
  data () {
    return {
      title: '联系我们',
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
  #contact-us{
    height: 100%;
  }
</style>
