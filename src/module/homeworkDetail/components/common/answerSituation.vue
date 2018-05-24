<template>
  <div id="answer-situation">
    <div class="list">
      <div class="list-title">
        <div class="list-row">
          <div class="list-cell">序号</div>
          <div class="list-cell question-content">作业内容</div>
          <div class="list-cell">正确率</div>
          <div class="list-cell">用时</div>
        </div>
      </div>
      <div class="list-body">
        <div class="list-row van-hairline--bottom">
          <div class="list-cell">1</div>
          <div class="list-cell question-content">惠顾 对对对 </div>
          <div class="list-cell">99%</div>
          <div class="list-cell">1'99''</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 全班成绩
export default {
  name: 'AnswerSituation'
}
</script>
<style lang="scss" scoped>
#answer-situation{
  height: 100%;
  overflow-y: scroll;
  .list{
    padding: 0 13px;
    font-size: 16px;
    .list-title{
      color: #848484;
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
      &.question-content{
        flex: 2.5;
      }
    }
  }
}
</style>
