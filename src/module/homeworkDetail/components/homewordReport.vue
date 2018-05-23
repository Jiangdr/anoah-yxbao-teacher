<template>
  <div id="homework-report">
    <report-tab :tab-type="tabType" @tabChange="tabChange"></report-tab>
    <div class="wrapper">
      <div class="split-line"></div>
      <div class="content">
        <!-- 班级成绩 -->
        <class-score v-if="tabType === 1"></class-score>
        <!-- 答案情况 -->
        <answer-situation v-if="tabType === 2"></answer-situation>
        <!-- 知识点分析 -->
        <knowledge-point-analysis v-if="tabType === 3"></knowledge-point-analysis>
      </div>
    </div>
  </div>
</template>
<script>
// 作业报告
import reportTab from './common/reportTab'
import classScore from './common/classScore'
import answerSituation from './common/answerSituation'
import knowledgePointAnalysis from './common/knowledgePointAnalysis'
import {mapActions} from 'vuex'
export default {
  name: 'HomeworkReport',
  data() {
    return {
      tabType: 1 // 1:全部成绩;2:答案情况;3:知识点分析
    }
  },
  mounted() {
    this.getInfo({
      publish_id: this.$route.params.publishId,
      class_id: this.$route.params.classId
    })
  },
  methods: {
    ...mapActions({
      'getInfo': 'homeworkDetail/basicStateInfo'
    }),
    tabChange(type) {
      this.tabType = type
    }
  },
  components: {
    reportTab,
    classScore,
    answerSituation,
    knowledgePointAnalysis
  }
}
</script>
<style lang="scss" scoped>
#homework-report{
  height: 100%;
  .wrapper{
    width: 100%;
    height: calc(100% - 45px);
    overflow-y: scroll;
    overflow-x: hidden;
    .split-line{
      width: 100%;
      height: 10px;
      background: #f5f8f8;
    }
  }
}
</style>
