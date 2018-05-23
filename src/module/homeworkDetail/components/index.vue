<template>
  <div id="homework-content">
    <header-bar>
      <div slot="title-name">
        <span>作业报告</span>
        <span>作业详情</span>
      </div>
      <div slot="right-area">
        ...
      </div>
    </header-bar>
  </div>
</template>
<script>
// 单个作业详情，包括作业详情和作业报告
import headerBar from '@/components/headerBar.vue'
import homeworkDetail from './homeworkDetail'
import homeworkReport from './homewordReport'
export default {
  name: 'HomeContent',
  components: {
    headerBar,
    homeworkDetail,
    homeworkReport
  }
}
</script>
<style lang="scss" scoped>
#homework-content{
  width: 100%;
  height: 100%;
}
</style>
