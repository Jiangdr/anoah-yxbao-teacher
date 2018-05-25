<template>
  <div id="tongji">
    <header-bar @back="back">
      <div slot="title-name">查看统计</div>
    </header-bar>
    <div class="percent-wrapper van-hairline--bottom">
      <div class="percent-item">
        <span class="name">正确率</span>
        <span class="percent red">{{correctRate}}</span>
      </div>
      <div class="percent-item">
        <span class="name">平均用时</span>
        <span class="percent black">{{avarageTime | timeFormatSecond}}</span>
      </div>
    </div>
    <div class="tab-wrapper van-hairline--bottom">
      <tab :tabType="tabType" @tabChange="tabChange"></tab>
    </div>
    <div class="list-wrapper">
      <according-question v-show="tabType === 1 && homeworkInfo.length" :homeworkInfo="homeworkInfo"></according-question>
      <according-student v-show="tabType === 2"></according-student>
    </div>
  </div>
</template>
<script>
import headerBar from '@/components/headerBar.vue'
import tab from './tab'
import accordingQuestion from './accordingQuestion'
import accordingStudent from './accordingStudent'
import api from '../axios/api'
export default {
  name: 'Tongji',
  data() {
    return {
      tabType: 1, // 1按试题统计，2按学生统计
      homeworkInfo: []
    }
  },
  computed: {
    questionInfo() {
      return this.$route.query
    },
    correctRate() {
      return Math.round(this.questionInfo.average_rate * 100) + '%'
    },
    avarageTime() {
      return this.questionInfo.average_time_length
    }
  },
  mounted() {
    this.getResource()
  },
  activated() {
    this.getResource()
  },
  methods: {
    back() {
      this.$router.back(-1)
    },
    tabChange(type) {
      this.tabType = type
    },
    getResource() {
      // 判断试题是单题还是复合题
      if (this.judgeQusType() === 1) {
        this.homeworkInfo = [this.questionInfo]
      } else {
        // 取小题
        this.getMiniResource()
      }
    },
    judgeQusType() {
      // 单题返1，复合题返2
      let result = 1
      let qus = this.questionInfo
      if (qus.resource_type === 'qti_exam') {
        result = 2
      }
      if (qus.resource_type === 'qti_question') {
        if (qus.qti_question_type_id === 12 || qus.qti_question_type_id === 16 || qus.qti_question_type_id === 17 || qus.qti_question_type_id === 35 || qus.qti_question_type_id === 37) {
          result = 2
        }
      }
      console.log(result)
      return result
    },
    getMiniResource() {
      api.getMiniResource({
        publish_id: this.questionInfo.course_hour_publish_id,
        course_resource_id: this.questionInfo.course_resource_id,
        dcom_entity_id: this.questionInfo.dcom_entity_id
      }).then(succ => {
        this.homeworkInfo = [...succ]
      })
    }
  },
  components: {
    headerBar,
    tab,
    accordingQuestion,
    accordingStudent
  }
}
</script>
<style lang="scss" scoped>
#tongji{
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  .percent-wrapper{
    width: 100%;
    height: 80px;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: 15px;
    .percent-item{
      flex: 1;
      display: inline-flex;
      flex-direction: column;
      text-align: center;
      .name{
        height: 24px;
        line-height: 24px;
        color: #7f8284;
      }
      .percent{
        height: 24px;
        line-height: 24px;
        &.red{
          color: #fc5363;
        }
        &.black{
          color: #1e1e1e;
        }
      }
    }
  }
  .tab-wrapper{
    width: 100%;
    height: 45px;
    background-color: #f5f8f8;
  }
  .list-wrapper{
    width: 100%;
    height: calc(100% - 80px - 45px - 45px);
    overflow-y: scroll;
  }
}
</style>
