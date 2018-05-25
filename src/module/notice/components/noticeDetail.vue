<template>
<div class="noticeDetail">
  <header-bar @back="goBack">
        <div slot="title-name">
          <div>通知详情</div>
        </div>
  </header-bar>
</div>
</template>

<script>
import headerBar from '@/components/headerBar.vue'

export default {
  name: 'noticeDetail',
  data() {
    return {}
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
</style>
