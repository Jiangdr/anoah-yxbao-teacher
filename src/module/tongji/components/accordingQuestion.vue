<template>
  <!-- 按题目统计 -->
  <div id="according-question">
    <div class="list">
      <div class="list-title">
        <div class="list-row">
          <div class="list-cell left">序号</div>
          <div class="list-cell question-content left">作业内容</div>
          <div class="list-cell">正确率</div>
        </div>
      </div>
      <div class="list-body">
        <div class="list-row van-hairline--bottom" v-for="(qus, index) in homeworkInfo" :key="index">
          <div class="list-cell left">{{index + 1}}</div>
          <div class="list-cell left question-content ellipsis">
            <span class="type">[{{qus.icom_name | questionName(qus)}}]</span>
            <span v-html="qus.resource_name"></span>
          </div>
          <div class="list-cell">{{Math.round((qus.average_rate || qus.correct_rate) * 100)}}%</div>
          <div class="arrow">
            <i class="fa fa-angle-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AccordingQuestion',
  props: ['homeworkInfo']
}
</script>
<style lang="scss" scoped>
.list{
  padding: 0 13px;
  font-size: 16px;
  .list-title{
    color: #848484
  }
  .list-body{
    color: #1e1e1e;
  }
  .list-row{
    display: flex;
    height: 45px;
    line-height: 45px;
  }
  .list-cell{
    flex: 1;
    text-align: center;
    &.question-content{
      flex: 2.5;
      padding: 0 5px;
    }
    &.left{
      text-align: left;
    }
  }
}
.type{
  color: #4d4d4d
}
</style>
