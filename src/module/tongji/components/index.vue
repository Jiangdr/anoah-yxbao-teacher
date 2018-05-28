<template>
  <div id="tongji">
    <header-bar @back="back">
      <div slot="title-name">查看统计</div>
      <div slot="right-area" v-show="routeInfo.question_type === 'subjectiveqti'">原题</div>
    </header-bar>
    <div v-show="loading">加载中...</div>
    <div v-show="!loading" class="percent-wrapper van-hairline--bottom">
      <div class="percent-item">
        <span class="name">正确率</span>
        <span class="percent red">{{correctRate}}</span>
      </div>
      <div class="percent-item">
        <span class="name">平均用时</span>
        <span class="percent black">{{avarageTime | timeFormatSecond}}</span>
      </div>
    </div>
    <div class="list-wrapper according-q" v-if="routeInfo.question_type === 'subjectiveqti' && !loading">
      <according-student :info="homeworkInfo" :type="routeInfo.question_type"></according-student>
    </div>
    <div class="tab-wrapper van-hairline--bottom" v-if="routeInfo.question_type === 'combineqti' && !loading">
      <tab :tabType="tabType" @tabChange="tabChange"></tab>
    </div>
    <div class="list-wrapper" ref="list" :class="{noScroll: chartType === 2}" v-if="routeInfo.question_type === 'combineqti' && !loading">
      <according-question v-show="tabType === 1 && homeworkInfo.resource.length && !loading" :homeworkInfo="homeworkInfo.resource"></according-question>
      <according-student @showStudent="showStudent" v-show="tabType === 2 && homeworkInfo && !loading" :info="homeworkInfo" :type="routeInfo.question_type" :chartType="chartType"></according-student>
    </div>
    <div class="model-icon" v-show="tabType === 2" @click="changeChart">
      <img :src="iconUrl" alt="...">
      <span>{{chartType === 1 ? '统计' : '列表'}}</span>
    </div>
    <student-list v-if="studentListShow" :title="studentListInfo.title" :studentList="studentListInfo.studentList" @close="studentListShow = false"></student-list>
  </div>
</template>
<script>
import headerBar from '@/components/headerBar.vue'
import tab from './tab'
import accordingQuestion from './accordingQuestion'
import accordingStudent from './accordingStudent'
import studentList from './studentList'
import api from '../axios/api'
export default {
  name: 'Tongji',
  data() {
    return {
      tabType: 1, // 1按试题统计，2按学生统计
      chartType: 1, // 1列表,2图表
      homeworkInfo: null,
      loading: true,
      studentListShow: false,
      studentListInfo: {
        title: null,
        studentList: []
      }
    }
  },
  computed: {
    routeInfo() {
      return this.$route.params
    },
    correctRate() {
      return Math.round(this.routeInfo.average_rate * 100) + '%'
    },
    avarageTime() {
      return this.routeInfo.average_time_length
    },
    iconUrl() {
      let imgUrl
      if (this.chartType === 1) {
        imgUrl = require('@/assets/images/tongji/chart.png')
      } else {
        imgUrl = require('@/assets/images/tongji/list.png')
      }
      return imgUrl
    }
  },
  mounted() {
    this.getResource()
  },
  activated() {
    this.getResource()
  },
  methods: {
    // 返回
    back() {
      this.$router.back(-1)
      this.tabType = 1
      this.homeworkInfo = null
      this.loading = true
      this.chartType = 1
    },
    // 顶部tab切换
    tabChange(type) {
      this.tabType = type
    },
    // 获取资源
    getResource() {
      // 判断试题类型
      let type = this.routeInfo.question_type
      switch (type) {
        case 'subjectiveqti':
          this.getQuestionStatistics()
          break;
        case 'combineqti':
          this.qtiexamStatistics()
          break;
        case 'objectiveqti':
          this.getQuestionStatistics()
      }
    },
    // 获取单题资源
    getQuestionStatistics() {
      this.loading = true
      api.getQuestionStatistics({
        course_hour_publish_id: this.routeInfo.course_hour_publish_id,
        course_resource_id: this.routeInfo.course_resource_id,
        qti_question_id: this.routeInfo.resource_id,
        dcom_entity_id: this.routeInfo.dcom_entity_id,
        qti_question_sheet: 0
      }).then(succ => {
        this.loading = false
        succ.user.forEach(ele => {
          if (ele.avatar.indexOf('http://') === -1) {
            ele.avatar = window.bus.$store.getters['runEnv/old'] + ele.avatar
          }
        })
        this.homeworkInfo = succ
      })
    },
    // 获取套题资源
    qtiexamStatistics() {
      this.loading = true
      api.qtiexamStatistics({
        course_hour_publish_id: this.routeInfo.course_hour_publish_id,
        course_resource_id: this.routeInfo.course_resource_id,
        dcom_entity_id: this.routeInfo.dcom_entity_id,
        qti_question_sheet: 1,
        group_id: 0
      }).then(succ => {
        this.loading = false
        succ.user.forEach(ele => {
          if (ele.avatar.indexOf('http://') === -1) {
            ele.avatar = window.bus.$store.getters['runEnv/old'] + ele.avatar
          }
        })
        this.homeworkInfo = succ
      })
    },
    // 图标和列表的切换
    changeChart() {
      let wrapper = this.$refs.list
      this.$refs.list.scrollTop = 0;
      if (this.chartType === 1) {
        this.chartType = 2
      } else {
        this.chartType = 1
      }
    },
    // 显示学生该正确率下的学生列表
    showStudent(title, studentList) {
      this.studentListShow = true
      this.studentListInfo.title = title
      this.studentListInfo.studentList = studentList
    }
  },
  components: {
    headerBar,
    tab,
    accordingQuestion,
    accordingStudent,
    studentList
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
    &.according-q{
      height: calc(100% - 80px - 45px);
    }
    &.noScroll{
      overflow: hidden;
    }
  }
  .model-icon{
    position: fixed;
    width: 55px;
    height: 55px;
    bottom: 20px;
    right: 13px;
    background-color: #3ac69e;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, .2);
    img{
      width: 24px;
      height: 19px;
    }
    span{
      padding-top: 5px;
      color: #fff;
      font-size: 10px;
    }
  }
}
</style>
