<template>
  <div id="knowledge-point-analysis">
    知识点分析
  </div>
</template>
<script>
// 知识点分析
import api from '@/module/homeworkDetail/axios/detail'
export default {
  name: 'knowledgePointAnalysis',
  props: ['publishId'],
  data() {
    return {}
  },
  mounted() {
    api.kp({
      publish_id: this.publishId
    }).then(succ => {
      console.log(succ)
    })
  }
}
</script>
<style lang="scss" scoped>
</style>
