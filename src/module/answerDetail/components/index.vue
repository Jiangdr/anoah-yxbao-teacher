<template>
<div id="question-detail" style="height:100%">
  <header-bar @back="goBack">
    <div slot="title-name">{{params && params.title || '标题需要传入'}}({{currectIndex}}/{{qtiCount}})</div>
    <div slot="right-area" v-if="params && params.type === 2 && judgeQtiType(resource[currentIndex - 1])" @click="linkTo">原题</div>
  </header-bar>
  <div class="swiper-container" :class="{scroll: params && judgeQtiType(resource[currentIndex - 1])}">
    <div class="swiper-wrapper" style="100%">
      <!-- 批改 -->
      <div class="swiper-slide" v-if="params.type === 1" v-for="(item, index) in renderResource" :key="index">
        <answer-column :params="item" v-if="item.qti_question_type_id == 1 || item.qti_question_type_id == 2 || item.qti_question_type_id == 3 || item.qti_question_type_id == 6 || item.qti_question_type_id == 15"></answer-column>
        <choice-table :params="item" v-if="item.qti_question_type_id == 11"></choice-table>
        <correct-column :params="item" v-if="item.qti_question_type_id == 9 || item.qti_question_type_id == 21 || item.qti_question_type_id == 23 || item.qti_question_type_id == 24 || item.qti_question_type_id == 25 || item.qti_question_type_id == 26 || item.qti_question_type_id == 33"></correct-column>
        <correct-table :params="item" v-if="item.qti_question_type_id == 4 || item.qti_question_type_id == 20 || item.qti_question_type_id == 38"></correct-table>
        <!-- <hanzitingxie :params="item" v-if="parseInt(item.icom_id) || item.qti_question_type_id == 17"></hanzitingxie> -->
        <!-- <Subjective :params="item" v-if="item.qti_question_type_id == 5"></Subjective> -->
        <render-qti v-if="Object.keys(item).length" :info="item" :qtiData="item.qti_data ? item.qti_data : ''"></render-qti>
      </div>
      <!-- 统计 -->
      <div class="swiper-slide" v-if="params.type === 2" v-for="(item, index) in renderResource" :key="index">
        <render-qti v-if="Object.keys(item).length" :info="item" :user_id="params.user_id" :qtiData="item.qti_data ? item.qti_data : ''"></render-qti>
      </div>
    </div>
  </div>
  <div class="subjective-button van-hairline--top" v-if="params && judgeQtiType(resource[currentIndex - 1])">
    <span @click="subjectiveQtiPigai(resource[currentIndex - 1])" v-if="resource[currentIndex - 1].status === 3 || resource[currentIndex - 1].status === 4 || resource[currentIndex - 1].read_only === 0">查看详情</span>
    <span v-if="resource[currentIndex - 1].status === 1" @click="toggleCorrectPopup">一键批阅</span>
    <span v-if="resource[currentIndex - 1].status === 1" @click="subjectiveQtiPigai(resource[currentIndex - 1])">批改本题</span>
  </div>
  <student-list v-if="showStudentList" :title="studentListTitle" :studentList="studentList"></student-list>
  <correct-item
      v-if="itemCorrectPopup"
      :publishId="resource[currentIndex - 1].course_hour_publish_id"
      :resourceId="resource[currentIndex - 1].course_resource_id"
      :questionId="resource[currentIndex - 1].qti_question_id"
      :entityId="resource[currentIndex - 1].dcom_entity_id"
      @toggle="toggleCorrectPopup"
      @callback="correctCallback">
    </correct-item>
</div>
</template>

<script>
import Vue from 'vue'
import {mapState, mapMutations} from 'vuex'
import {Toast} from 'vant'
import headerBar from '@/components/headerBar.vue'
import answerColumn from './question/answerColumn.vue'
import choiceTable from './question/choiceTable.vue'
import correctColumn from './question/correctColumn.vue'
import correctTable from './question/correctTable.vue'
import groupDetail from './question/groupDetail.vue'
import groupDetailColumn from './question/groupDetailColumn.vue'
import hanzitingxie from './question/hanzitingxie.vue'
import Subjective from './question/Subjective.vue'
import renderQti from '@/components/renderQti.vue'
import studentList from '@/components/studentList'
import correctItem from '@/components/common/itemCorrectPopup.vue'
export default {
  name: 'tongji',
  data () {
    return {
      renderResource: [], // 渲染所需的资源数据
      showStudentList: false,
      studentListTitle: '',
      studentList: [],
      qtiCount: 0,
      mySwiper: null,
      itemCorrectPopup: false
    }
  },
  activated() {
    window.bus.$on('showStudentList', (title, list) => {
      this.showStudentList = true
      this.studentListTitle = title
      this.studentList = list
    })
    window.bus.$on('closeStudentList', () => {
      this.showStudentList = false
    })
    window.bus.$on('chooseStu', (info) => {
      this.goToStuAnswer(info)
    })
    this.renderView()
  },
  computed: {
    ...mapState({
      'resource': state => state.answerDetail.resource,
      'params': state => state.answerDetail.params
    }),
    currentIndex: {
      get() {
        return this.params.index + 1
      },
      set(val) {
        this.setParamsIndex(val)
      }
    }
  },
  methods: {
    ...mapMutations({
      clearResource: 'answerDetail/clearResource',
      clearParams: 'answerDetail/clearParams',
      setParamsIndex: 'answerDetail/setParamsIndex',
      setStudentAnswerDetailData: 'answerDetail/setStudentAnswerDetailData'
    }),
    // 根据资源创建所需数据结构和swiper视图
    renderView() {
      if (this.mySwiper) {
        return false
      }
      let resource = this.resource
      for (let i = 0; i < resource.length; i++) {
        this.renderResource.push({})
      }
      this.qtiCount = this.renderResource.length
      this.currectIndex = this.params.index + 1
      this.renderResource[this.params.index] = this.resource[this.params.index]
      this.$nextTick(() => {
        this.mySwiper = new this.Swiper('.swiper-container', {
          init: false,
          observer: true, // 修改swiper自己或子元素时，自动初始化swiper
          observeParents: true, // 修改swiper的父元素时，自动初始化swiper
          on: {
            slideChange: () => {
              this.slideEnd()
            }
          }
        })
        this.mySwiper.touchEvents = {
          end: 'touchend',
          move: 'touchmove',
          start: 'touchstart'
        }
        this.mySwiper.init()
        this.mySwiper.slideTo(this.params.index, 0)
      })
    },
    goBack() {
      this.renderResource = []
      this.clearResource()
      this.clearParams()
      this.mySwiper.destroy()
      this.mySwiper = null
      this.$router.back(-1)
    },
    linkTo() {
      let questionInfo = this.renderResource[this.mySwiper.activeIndex]
      questionInfo.resource_name = ''
      this.$router.push({
        path: `/originalQuestion`,
        query: {
          user_id: 0,
          question_info: JSON.stringify(questionInfo),
          title: '原题'
        }
      })
    },
    slideEnd() {
      Vue.set(this.renderResource, this.mySwiper.activeIndex, this.resource[this.mySwiper.activeIndex])
      this.currectIndex = this.mySwiper.activeIndex + 1
      if (this.mySwiper.swipeDirection === 'prev') {
        this.$el.querySelectorAll('.swiper-slide')[this.mySwiper.activeIndex + 1].scrollTop = 0 + 'px'
      } else {
        this.$el.querySelectorAll('.swiper-slide')[this.mySwiper.activeIndex - 1].scrollTop = 0 + 'px'
      }
    },
    judgeQtiType() {
      let type = this.util.judgeQuestionType(this.resource[this.currectIndex - 1])
      if (type === 'subjectiveqti') {
        return true
      } else {
        return false
      }
    },
    // 主观题批改
    subjectiveQtiPigai(item) {
      this.setStudentAnswerDetailData(item);
      this.$router.push({
        name: "checkAnswerDetai",
        params: {
          detailData: item
        }
      })
    },
    // 跳转学生答案情况
    goToStuAnswer(info) {
      let questionInfo = this.renderResource[this.mySwiper.activeIndex]
      questionInfo.resource_name = ''
      this.$router.push({
        path: `/originalQuestion`,
        query: {
          user_id: info.userid,
          question_info: JSON.stringify(questionInfo),
          title: info.real_name
        }
      })
    },
    toggleCorrectPopup() {
      this.itemCorrectPopup = !this.itemCorrectPopup
    },
    correctCallback() {
      this.$store.commit('answerDetail/setCorrectStatus')
    }
  },
  components: {
    headerBar,
    answerColumn,
    choiceTable,
    correctColumn,
    correctTable,
    groupDetail,
    groupDetailColumn,
    hanzitingxie,
    Subjective,
    renderQti,
    studentList,
    correctItem
  }
}
</script>

<style lang="scss" scoped>
#question-detail{
  position: relative;
  .swiper-container{
    height: calc(100% - 45px);
    overflow: hidden;
    &.scroll{
      height: calc(100% - 45px - 50px);
    }
    .swiper-wrapper{
      height: 100%;
      .swiper-slide{
        height: 100%;
        overflow-y: scroll;
        &.scroll{
          height: calc(100% - 50px);
        }
      }
    }
  }
  .subjective-button{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    span{
      flex:0 0 120px;
      height: 40px;
      line-height: 40px;
      // padding: 8px 50px;
      background-color: #34c988;
      color: #fff;
      border-radius: 10px;
    }
  }
}
</style>
