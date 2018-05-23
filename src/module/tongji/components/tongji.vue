<template>
<div>
 <router-view style='height:100vh'></router-view>
<v-touch
  class="tongji"
  v-on:swipeleft="onSwipeLeft"
  v-on:swiperight="onSwipeRight"
>
  <div class="title border-bottom-1px">
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
      <van-col span="4">原题</van-col>
    </van-row>
  </div>
  <answer-column :params="params" v-if="type === 1 || type === 2 || type === 3 || type === 6 || type === 15"></answer-column>
  <choice-table :params="params" v-else-if="type === 11"></choice-table>
  <correct-column :params="params" v-else-if="type === 9 || type === 21 || type === 23 || type === 24 || type === 25 || type === 26"></correct-column>
  <correct-table :params="params" v-else-if="type === 4 || type === 20"></correct-table>
  <hanzitingxie :params="params" v-else-if="parseInt(params.icom_id) || type === 17"></hanzitingxie>
  <Subjective :params="params" v-else-if="type === 5"></Subjective>
  </v-touch>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import {
  Toast
} from 'vant';
// 答案柱状图  例：判断题、单选题、多选题、不定选项、排序题
import answerColumn from './question/answerColumn.vue'
// 选项答案表格 例：完形填空
import choiceTable from './question/choiceTable.vue'
// 竖式除法、竖式加法类
import correctColumn from './question/correctColumn.vue'
// 正确率表格图  例：客观填空、选词填空
import correctTable from './question/correctTable.vue'
// 汉字听写组件 --按题目、学生排序统计类题目
import hanzitingxie from './question/hanzitingxie.vue'
// 主观题
import Subjective from './question/Subjective.vue'
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
    type() {
      return parseInt(this.params.qti_question_type_id)
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    onSwipeLeft() {
      this.$store.commit('homeworkDetail/setIndex', 1)
      if (this.index === this.mini.length) {
        Toast('最后一道题');
      }
    },
    onSwipeRight() {
      this.$store.commit('homeworkDetail/setIndex', -1)
      if (this.index === 0) {
        Toast('第一道题');
      }
    }
  },
  components: {
    answerColumn,
    choiceTable,
    correctColumn,
    correctTable,
    hanzitingxie,
    Subjective
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
