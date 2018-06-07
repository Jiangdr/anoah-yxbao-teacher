<template>
  <div id="answer-situation">
    <div class="list">
      <div class="list-title">
        <div class="list-row">
          <div class="list-cell left">序号</div>
          <div class="list-cell question-content left">作业内容</div>
          <div class="list-cell">正确率</div>
          <div class="list-cell">用时</div>
        </div>
      </div>
      <div class="list-body">
        <div class="list-row van-hairline--bottom" v-for="(qus,index) in questionInfo" :key="index" @click="linkTo(qus)">
          <div class="list-cell left">{{index + 1}}</div>
          <div class="list-cell left question-content ellipsis">
            <span class="type">[{{qus.icom_name | questionName(qus)}}]</span>
            <span v-html="qus.resource_name"></span>
          </div>
          <div class="list-cell">{{Math.round(qus.average_rate * 100)}}%</div>
          <div class="list-cell">{{qus.average_time_length | timeFormatSecond}}</div>
          <div class="arrow">
            <i class="fa fa-angle-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 答案情况
import {mapGetters} from 'vuex'
export default {
  name: 'AnswerSituation',
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      'questionInfo': 'homeworkDetail/getHomeworkQuestionInfo'
    })
  },
  methods: {
    linkTo(qus) {
      if (this.util.judgeQuestionType(qus)) {
        alert('开发中，不要慌!!!')
      } else {
        alert('不支持题型')
      }
    }
  }
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
}
</style>
