<template>
  <div id="class-score">
    <class-score-overview></class-score-overview>
    <div class="split-line"></div>
    <circle-chart></circle-chart>
    <div class="split-line"></div>
  </div>
</template>
<script>
// 全班成绩
import classScoreOverview from './classScoreOverview'
import circleChart from './circleChart'
export default {
  name: 'ClassScore',
  components: {
    classScoreOverview,
    circleChart
  }
}
</script>
<style lang="scss" scoped>
#class-score{
  .split-line{
    width: 100%;
    height: 10px;
    background: #f5f8f8;
  }
}
</style>
