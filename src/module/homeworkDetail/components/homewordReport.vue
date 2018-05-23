<template>
  <div id="homework-report">
    <report-tab :tab-type="tabType" @tabChange="tabChange"></report-tab>
    <div class="split-line"></div>
    <div class="content">
      <class-score v-if="tabType === 1"></class-score>
      <answer-situation v-if="tabType === 2"></answer-situation>
      <knowledge-point-analysis v-if="tabType === 3"></knowledge-point-analysis>
    </div>
  </div>
</template>
<script>
// 作业报告
import reportTab from './common/reportTab'
import classScore from './common/classScore'
import answerSituation from './common/answerSituation'
import knowledgePointAnalysis from './common/knowledgePointAnalysis'
export default {
  name: 'HomeworkReport',
  data() {
    return {
      tabType: 1 // 1:全部成绩;2:答案情况;3:知识点分析
    }
  },
  methods: {
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
  .split-line{
    width: 100%;
    height: 10px;
    background: #f5f8f8;
  }
}
</style>
