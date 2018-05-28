<template>
  <div id="homework-report">
    <report-tab v-if="hwCompleteRate <= 80" :tab-type="tabType" @tabChange="tabChange"></report-tab>
    <div v-if="hwCompleteRate <= 80" class="wrapper">
      <div class="split-line"></div>
      <div class="content">
        <!-- 班级成绩 -->
        <class-score v-show="tabType === 1"></class-score>
        <!-- 答案情况 -->
        <answer-situation v-show="tabType === 2"></answer-situation>
        <!-- 知识点分析 -->
        <knowledge-point-analysis v-show="tabType === 3" :publishId="info.course_hour_publish_id"></knowledge-point-analysis>
      </div>
    </div>
    <div v-else class="no-data">
      <img :src="imgUrl" alt="">
      <span style="color:#1e1e1e;font-weight:600;margin-bottom:10px;">暂无报告</span>
      <span style="color:#c8c8c8;line-height:26px">80%学生完成或者作业截止后可查看作业</span>
    </div>
  </div>
</template>
<script>
// 作业报告
import reportTab from './common/reportTab'
import classScore from './common/classScore'
import answerSituation from './common/answerSituation'
import knowledgePointAnalysis from './common/knowledgePointAnalysis'
import {mapState} from 'vuex'
export default {
  name: 'HomeworkReport',
  data() {
    return {
      tabType: 1 // 1:全部成绩;2:答案情况;3:知识点分析
    }
  },
  computed: {
    ...mapState({
      info: state => state.homeworkDetail.homeworkInfo
    }),
    hwCompleteRate() {
      return (this.info.student_counter - this.info.unfinished_counter) / this.info.student_counter
    },
    imgUrl() {
      return require('@/assets/images/homeworkDetail/no-data.png')
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
  height: 100%;
  .wrapper{
    width: 100%;
    height: calc(100% - 45px);
    overflow: hidden;
    .content{
      height: calc(100% - 10px);
    }
    .split-line{
      width: 100%;
      height: 10px;
      background: #f5f8f8;
    }
  }
  .no-data{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    padding: 0 26px;
    text-align: center;
    img{
      width: 100px;
      height: 130px;
    }

  }
}
</style>
