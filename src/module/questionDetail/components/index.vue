<template>
<div style="height:100%">
  <header-bar @back="goBack">
    <div slot="title-name">查看统计</div>
    <div slot="right-area">原题</div>
  </header-bar>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in 3" :key="index">
        {{item}}
      </div>
    </div>
  </div>
  <!-- <v-touch class="slide-container" @swipeleft="onSwipeLeft">
    <div class="slide-item" v-for="(item, index) in renderResource" :key="index">
      {{item}}
    </div>
  </v-touch> -->
  <!-- <swiper :options="swiperOption" ref="mySwiper" class="swiper-container">
    <swiper-slide v-for="(item, index) in renderResource" :key="index">
      <div class="slide-content" v-if="Object.keys(item).length">
        <answer-column :params="item" v-if="item.qti_question_type_id == 1 || item.qti_question_type_id == 2 || item.qti_question_type_id == 3 || item.qti_question_type_id == 6 || item.qti_question_type_id == 15"></answer-column>
        <choice-table :params="item" v-if="item.qti_question_type_id == 11"></choice-table>
        <correct-column :params="item" v-if="item.qti_question_type_id == 9 || item.qti_question_type_id == 21 || item.qti_question_type_id == 23 || item.qti_question_type_id == 24 || item.qti_question_type_id == 25 || item.qti_question_type_id == 26"></correct-column>
        <correct-table :params="item" v-if="item.qti_question_type_id == 4 || item.qti_question_type_id == 20"></correct-table>
        <hanzitingxie :params="item" v-if="parseInt(item.icom_id) || item.qti_question_type_id == 17"></hanzitingxie>
        <Subjective :params="item" v-if="item.qti_question_type_id == 5"></Subjective>
        <render-qti :info="item" :id="item.source_pk_id + ''" :icom_id="item.icom_id" :dcom_id="item.source_pk_id" user_id="0" :setting="setting"></render-qti>
      </div>
      <div class="no-data" v-else>
        加载中...
      </div>
      <div>{{item}}</div>
    </swiper-slide>
  </swiper> -->
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
export default {
  name: 'tongji',
  data () {
    return {
      renderResource: [], // 渲染所需的资源数据
      // swiper参数
      mySwiper: null,
      swiperOption: {
        autoHeight: true,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        on: {
          slideChange: () => {
            this.slideEnd()
          }
        }
      }
    }
  },
  activated() {
    this.renderView()
    // this.$nextTick(() => {
    //   this.mySwiper = new this.Swiper('.swiper-container', {
    //     autoHeight: true,
    //     observer: true, // 修改swiper自己或子元素时，自动初始化swiper
    //     observeParents: true // 修改swiper的父元素时，自动初始化swiper
    //   })
    // })
  },
  computed: {
    ...mapState({
      'params': (state) => state.homeworkDetail.params,
      'index': (state) => state.homeworkDetail.index,
      'mini': (state) => state.homeworkDetail.mini,
      'resource': state => state.questionDetail.resource
    }),
    setting: {
      get() {
        return {
          'smt': 'no_self_smt',
          'publish_id': this.params.course_hour_publish_id,
          'course_resource_id': this.params.course_resource_id,
          'caller': 'ICLASS',
          'dcom_entity_id': this.params.dcom_entity_id,
          'titleflag': 1
        }
      },
      set(val) {
        return val
      }
    },
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    routePrams() {
      return this.$route.params.params
    }
  },
  methods: {
    ...mapMutations({
      clearResource: 'questionDetail/clearResource'
    }),
    // 根据资源创建所需数据结构和swiper视图
    renderView() {
      let resource = this.resource
      for (let i = 0; i < resource.length; i++) {
        this.renderResource.push({})
      }
      this.renderResource[this.routePrams.index] = this.resource[this.routePrams.index]
      this.$nextTick(() => {
        this.mySwiper = new this.Swiper('.swiper-container', {
          autoplay: true,
          init: false,
          autoHeight: true,
          observer: true, // 修改swiper自己或子元素时，自动初始化swiper
          observeParents: true // 修改swiper的父元素时，自动初始化swiper
        })
        this.mySwiper.touchEvents = {
          end: 'touchend',
          move: 'touchmove',
          start: 'touchstart'
        }
        this.mySwiper.init()
        this.mySwiper.enableTouchControl()
        this.mySwiper.slideTo(this.routePrams.index, 0)
      })
      // this.swiper.update()
    },
    goBack() {
      this.renderResource = []
      this.clearResource()
      this.$router.go(-1)
    },
    linkTo() {
      this.$router.push({path: '/originalQuestion/0'})
    },
    slideEnd() {
      Vue.set(this.renderResource, this.swiper.activeIndex, this.resource[this.swiper.activeIndex])
      this.swiper.update()
      this.setting = {
        'smt': 'no_self_smt',
        'publish_id': this.resource[this.swiper.activeIndex].course_hour_publish_id,
        'course_resource_id': this.resource[this.swiper.activeIndex].course_resource_id,
        'caller': 'ICLASS',
        'dcom_entity_id': this.resource[this.swiper.activeIndex].dcom_entity_id,
        'titleflag': 1
      }
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
    renderQti
  }
}
</script>

<style lang="scss" scoped>
.swiper-container{
  height: calc(100% - 45px);
  overflow-y: scroll;
}
</style>
