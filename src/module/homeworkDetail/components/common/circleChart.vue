<template>
  <div id="circle-chart">
    <div class="title van-hairline--bottom">学生作业成绩分布</div>
    <div class="chart-content">
    </div>
  </div>
</template>
<script>
// 全班成绩中的环形图组件
export default {
  name: 'CircleChart'
}
</script>
<style lang="scss" scoped>
#circle-chart{
  width: 100%;
  height: 295px;
  box-sizing: border-box;
  overflow: hidden;
  .title{
    height: 45px;
    line-height: 45px;
    color: #1e1e1e;
    padding: 0 13px;
    font-size: 15px;
  }
}
</style>
