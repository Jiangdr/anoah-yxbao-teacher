<template>
<div class="schoolList">
  <div class="title">
   <header-bar @back="goBack">
        <div slot="title-name">
          <div>学校通知</div>
        </div>
      </header-bar>
  </div>
  <div class="container">
    <div class="wrapper">
    </div>
  </div>
</div>
</template>

<script>
import headerBar from '@/components/headerBar.vue'
export default {
  name: 'schoolList',
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    goDetail() {
      this.$router.push({
        name: 'noticeDetail'
      })
    },
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false
        console.log('刷新')
      }, 500)
    }
  }
}
</script>

<style scoped>
</style>
