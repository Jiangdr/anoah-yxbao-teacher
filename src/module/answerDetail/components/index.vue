<template>
<div id="question-detail" style="height:100%">
  <header-bar @back="goBack">
    <div slot="title-name">{{params && params.title || '标题需要传入'}}({{currectIndex}}/{{qtiCount}})</div>
    <div slot="right-area" v-if="params && params.type === 2">原题</div>
  </header-bar>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in renderResource" :key="index" @scroll="slideScroll">
        <answer-column :params="item" v-if="item.qti_question_type_id == 1 || item.qti_question_type_id == 2 || item.qti_question_type_id == 3 || item.qti_question_type_id == 6 || item.qti_question_type_id == 15"></answer-column>
        <choice-table :params="item" v-if="item.qti_question_type_id == 11"></choice-table>
        <correct-column :params="item" v-if="item.qti_question_type_id == 9 || item.qti_question_type_id == 21 || item.qti_question_type_id == 23 || item.qti_question_type_id == 24 || item.qti_question_type_id == 25 || item.qti_question_type_id == 26"></correct-column>
        <correct-table :params="item" v-if="item.qti_question_type_id == 4 || item.qti_question_type_id == 20"></correct-table>
        <!-- <hanzitingxie :params="item" v-if="parseInt(item.icom_id) || item.qti_question_type_id == 17"></hanzitingxie> -->
        <Subjective :params="item" v-if="item.qti_question_type_id == 5"></Subjective>
        <render-qti v-if="Object.keys(item).length" :info="item" :id="item.source_pk_id + ''" :icom_id="item.icom_id" :dcom_id="item.source_pk_id" user_id="0" :setting="setting"></render-qti>
      </div>
    </div>
  </div>
  <div class="subjective-button van-hairline--top" v-if="params && judgeQtiType(resource[currentIndex - 1])">
    <span @click="subjectiveQtiPigai(resource[currentIndex - 1])">查看详情</span>
  </div>
  <student-list v-if="showStudentList" :title="studentListTitle" :studentList="studentList"></student-list>
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
export default {
  name: 'tongji',
  data () {
    return {
      renderResource: [], // 渲染所需的资源数据
      showStudentList: false,
      studentListTitle: '',
      studentList: [],
      qtiCount: 0,
      mySwiper: null
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
    },
    setting: {
      get() {
        return {
          'smt': 'no_self_smt',
          'publish_id': this.resource[this.params.index].course_hour_publish_id,
          'course_resource_id': this.resource[this.params.index].course_resource_id,
          'caller': 'ICLASS',
          'dcom_entity_id': this.resource[this.params.index].dcom_entity_id,
          'titleflag': 1
        }
      },
      set(val) {
        return val
      }
    }
  },
  methods: {
    ...mapMutations({
      clearResource: 'answerDetail/clearResource',
      clearParams: 'answerDetail/clearParams',
      setParamsIndex: 'answerDetail/setParamsIndex'
    }),
    // 根据资源创建所需数据结构和swiper视图
    renderView() {
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
          autoHeight: true,
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
      this.$router.back(-1)
    },
    linkTo() {
      this.$router.push({path: '/originalQuestion/0'})
    },
    slideEnd() {
      Vue.set(this.renderResource, this.mySwiper.activeIndex, this.resource[this.mySwiper.activeIndex])
      this.currectIndex = this.mySwiper.activeIndex + 1
      this.setting = {
        'smt': 'no_self_smt',
        'publish_id': this.resource[this.mySwiper.activeIndex].course_hour_publish_id,
        'course_resource_id': this.resource[this.mySwiper.activeIndex].course_resource_id,
        'caller': 'ICLASS',
        'dcom_entity_id': this.resource[this.mySwiper.activeIndex].dcom_entity_id,
        'titleflag': 1
      }
      this.$el.querySelector('.swiper-container').scrollTop = 0 + 'px'
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
      console.log(item)
    },
    slideScroll(e) {
      // console.log(e)
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
    studentList
  }
}
</script>

<style lang="scss" scoped>
#question-detail{
  position: relative;
  .swiper-container{
    height: calc(100% - 45px);
    overflow: hidden;
    .swiper-slide{
      height: 100%;
      overflow-y: scroll;
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
    span{
      padding: 8px 50px;
      background-color: #34c988;
      color: #fff;
      border-radius: 10px;
    }
  }
}
</style>
