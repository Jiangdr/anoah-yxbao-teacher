<template>
<div>
 <router-view style='height:100vh'></router-view>
  <slide class="tongji">
    <div v-for="(item, index) in mini" :key="index">
      <answer-column :params="item" v-if="item.qti_question_qti_question_type_id_id == 1 || item.qti_question_type_id == 2 || item.qti_question_type_id == 3 || item.qti_question_type_id == 6 || item.qti_question_type_id == 15"></answer-column>
      <choice-table :params="item" v-if="item.qti_question_type_id == 11"></choice-table>
      <correct-column :params="item" v-if="item.qti_question_type_id == 9 || item.qti_question_type_id == 21 || item.qti_question_type_id == 23 || item.qti_question_type_id == 24 || item.qti_question_type_id == 25 || item.qti_question_type_id == 26"></correct-column>
      <correct-table :params="item" v-if="item.qti_question_type_id == 4 || item.qti_question_type_id == 20"></correct-table>
      <!-- <hanzitingxie :params="item" v-if="parseInt(item.icom_id) || item.qti_question_type_id == 17"></hanzitingxie> -->
      <Subjective :params="item" v-if="item.qti_question_type_id == 5"></Subjective>
      <!-- <render-qti :id="item.source_pk_id + ''" :icom_id="item.icom_id" :dcom_id="item.source_pk_id" user_id="0" :setting="setting"></render-qti> -->
    </div>
    <!-- <div class="title border-bottom-1px">
      <van-row>
        <van-col span="2">
          <span
            class="back"
            @click="goBack"
          >
            <van-icon name='arrow-left'></van-icon>
            </span>
        </van-col>
        <van-col span="18">
          <span class="text">查看统计</span>
        </van-col>
        <van-col span="4">
          <span @click="linkTo">原题</span>
        </van-col>
      </van-row>
    </div>
    <answer-column :params="params" v-if="qti_question_type_id == 1 || qti_question_type_id == 2 || qti_question_type_id == 3 || qti_question_type_id == 6 || qti_question_type_id == 15"></answer-column>
    <choice-table :params="params" v-if="qti_question_type_id == 11"></choice-table>
    <correct-column :params="params" v-if="qti_question_type_id == 9 || qti_question_type_id == 21 || qti_question_type_id == 23 || qti_question_type_id == 24 || qti_question_type_id == 25 || qti_question_type_id == 26"></correct-column>
    <correct-table :params="params" v-if="qti_question_type_id == 4 || qti_question_type_id == 20"></correct-table>
    <hanzitingxie :params="params" v-if="parseInt(params.icom_id) || qti_question_type_id == 17"></hanzitingxie>
    <Subjective :params="params" v-if="qti_question_type_id == 5"></Subjective>
    <render-qti :id="params.source_pk_id + ''" :icom_id="params.icom_id" :dcom_id="params.source_pk_id" user_id="0" :setting="setting"></render-qti> -->
  </slide>
</div>
</template>

<script>
import {
  mapState
} from 'vuex'
import {
  Toast
} from 'vant';
import answerColumn from './question/answerColumn.vue'
import choiceTable from './question/choiceTable.vue'
import correctColumn from './question/correctColumn.vue'
import correctTable from './question/correctTable.vue'
import groupDetail from './question/groupDetail.vue'
import groupDetailColumn from './question/groupDetailColumn.vue'
import hanzitingxie from './question/hanzitingxie.vue'
import Subjective from './question/Subjective.vue'
import renderQti from '@/components/renderQti.vue'
import slide from '@/components/slide'
export default {
  name: 'tongji',
  created() {
    // this.detail();
  },
  activated() {},
  computed: {
    ...mapState({
      'params': (state) => state.homeworkDetail.params,
      'index': (state) => state.homeworkDetail.index,
      'mini': (state) => state.homeworkDetail.mini
    }),
    // qti_question_type_id() {
    //   return parseInt(this.params.qti_question_qti_question_type_id_id)
    // },
    setting() {
      let result = {
        'smt': 'no_self_smt',
        'publish_id': this.params.course_hour_publish_id,
        'course_resource_id': this.params.course_resource_id,
        'caller': 'ICLASS',
        'dcom_entity_id': this.params.dcom_entity_id,
        'titleflag': 1
      }
      return result
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    // onSwipeLeft() {
    //   this.$store.commit('homeworkDetail/setIndex', 1)
    //   if (this.index !=== this.mini.length) {
    //   } else {
    //     Toast('最后一道题');
    //   }
    // },
    // onSwipeRight() {
    //   this.$store.commit('homeworkDetail/setIndex', -1)
    //   if (this.index !=== 0) {
    //   } else {
    //     Toast('第一道题');
    //   }
    // },
    linkTo() {
      this.$router.push({path: '/originalQuestion/0'})
    }
  },
  components: {
    slide,
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

<style>
.tongji {
  height: 100vh;
}

.tongji>.title {
  text-align: center;
  line-height: 50px;
  height: 50px;
}

.tongji>.title .back {
  display: inline-block;
  float: left;
}

.tongji>.title .text {
  display: inline-block;
  width: calc(100% - 100px);
  font-weight: 600;
}

.tongji>.title-bar {
  padding: 0 10px;
  line-height: 50px;
  height: 50px;
  box-sizing: border-box;
}

.tongji>.title-bar .info-right {
  text-align: right;
}

.danxuan>.title-bar .info-right .correct {
  color: #ff4e00;
}
</style>
