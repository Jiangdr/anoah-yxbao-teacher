<template>
  <div id="tongji">
    <header-bar @back="back">
      <div slot="title-name">查看统计</div>
    </header-bar>
    <div></div>
  </div>
</template>
<script>
import headerBar from '@/components/headerBar.vue'
export default {
  name: 'Tongji',
  methods: {
    back() {
      this.$router.back(-1)
    }
  },
  components: {
    headerBar
  }
}
</script>
<style lang="scss" scoped>
</style>
