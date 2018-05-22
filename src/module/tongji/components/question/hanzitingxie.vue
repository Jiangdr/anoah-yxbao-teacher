<template>
  <div class="hanzitingxie">
    <!-- <div class="title border-bottom-1px">
      <van-row>
        <van-col span="2">
          <span class="back" @click="goBack">
                  <van-icon name='arrow-left'></van-icon>
                  </span>
        </van-col>
        <van-col span="20">
          <span class="text">查看统计</span>
        </van-col>
        <van-col span="2"></van-col>
      </van-row>
    </div>-->
    <div class="title-bar">
      <van-row>
        <van-col span="6">
          <span>{{params.icom_name}}</span>
        </van-col>
        <van-col span="18" class="info-right">
          正确率：<span class="correct">{{correct}}</span>
        </van-col>
      </van-row>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="tabs">
          <van-row>
            <van-col span="12" class="tab" :class="{active:orderName==='question'}">
              <p @click="changeTab('question')">按题目</p>
            </van-col>
            <van-col span="12" class="tab" :class="{active:orderName==='student'}">
              <p @click="changeTab('student')">按学生</p>
            </van-col>
          </van-row>
        </div>
        <group-word v-if="orderName=='question'&&params.icom_id=='5018'" :resource="resource" :user="user"></group-word>
        <calculation v-else-if="orderName=='question'&&(params.icom_id=='5011'||params.icom_id=='5013')" :resource="resource"></calculation>
        <question v-else-if="orderName=='question'" :resource="resource" ></question>
        <student v-if="orderName=='student'" :user="user" :columnData="columnData"></student>
      </div>
    </div>
  </div>
</template>

<script>
import getStatistics from '../../axios/getQuestionStatistics.js'
import question from '../common/questionTable.vue'
import groupWord from '../common/groupWord.vue'
import calculation from '../common/calculation.vue'
import student from '../common/studentTable.vue'

// import {mapState} from 'vuex'

export default {
  name: 'hanzitingxie',
  props: ['params'],
  data() {
    return {
      allCorrect: {},
      resource: [],
      user: [],
      orderName: 'question',
      sortNum: 0,
      correctRate: 0,
      ordertype: 'column',
      columnData: []
    }
  },
  created() {
    this.getinfo();
  },
  watch: {
    params: 'getinfo'
  },
  activated() {
  },
  computed: {
    correct() {
      if (this.correctRate === '') {
        return '--'
      } else {
        return Math.round(this.correctRate * 100) + '%'
      }
    }
  },
  methods: {

    changeTab(name) {
      this.orderName = name
    },
    itemCorrect(correct) {
      if (correct === '' || correct === -1) {
        return '--'
      } else {
        return Math.round(correct * 100) + '%'
      }
    },
    getinfo() {
      let param = {
        "course_hour_publish_id": this.params.course_hour_publish_id,
        "course_resource_id": this.params.course_resource_id,
        "icom_id": this.params.icom_id,
        "dcom_entity_id": this.params.dcom_entity_id ? this.params.dcom_entity_id : 0
      }
      getStatistics.getIcomInfo(param).then((r) => {
        this.allCorrect = r.all_correct;
        this.resource = r.resource;
        this.user = r.user;
        this.columnData = r.clumn
      })
    }

  },
  components: {
    student, question, groupWord, calculation
  }
}
</script>

<style scoped>
  .hanzitingxie {
    height: 100vh;
    background: #f8f8f8;
  }

  .hanzitingxie>.title {
    text-align: center;
    line-height: 50px;
    height: 50px;
    background: #fff;
  }

  .hanzitingxie>.title .back {
    display: inline-block;
    float: left;
  }

  .hanzitingxie>.title .text {
    display: inline-block;
    width: calc(100% - 100px);
    font-weight: 600;
  }

  .hanzitingxie>.title-bar {
    padding: 0 10px;
    line-height: 50px;
    height: 50px;
    box-sizing: border-box;
  }

  .hanzitingxie>.title-bar .info-right {
    text-align: right;
  }

  .hanzitingxie>.title-bar .info-right .correct {
    color: #ff4e00;
  }

  .hanzitingxie .wrapper {
    line-height: 50px;
    height: calc(100% - 100px);
  }

  .hanzitingxie .wrapper>.container {
    background: #fff;
    text-align: center;
    height: 100%;
  }

  .hanzitingxie .wrapper>.container .tabs {
    height: 50px;
    line-height: 48px;
  }

  .hanzitingxie .wrapper>.container .tabs .tab {
    border-bottom: 2px solid #e2e2e2;
  }

  .hanzitingxie .wrapper>.container .tabs .tab.active {
    border-bottom: 2px solid #34c988;
  }
</style>
