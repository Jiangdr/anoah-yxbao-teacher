<template>
  <div class="hanzitingxie">
    <div class="title border-bottom-1px">
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
    </div>
    <div class="title-bar">
      <van-row>
        <van-col span="6">
          <span>汉字听写</span>
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
        <div class="order-question" v-if="orderName=='question'">
          <div class="item">
            <van-row>
              <van-col span="12">题目</van-col>
              <van-col span="12">正确率</van-col>
            </van-row>
          </div>
          <div v-for="(item,index) in resource" :key="index" class="item">
            <van-row>
              <van-col span="12">{{item.content}}</van-col>
              <van-col span="12">
                <p>
                  <span>{{itemCorrect(item.correct_rate)}}</span>
                  <span class="progress" v-if="item.correct_rate!=''||item.correct_rate!=-1">
                         <span class="progress-bar" :style="{width:itemCorrect(item.correct_rate)}"></span>
                  </span>
                  <van-icon name="arrow"> </van-icon>
                </p>
              </van-col>
            </van-row>
          </div>
        </div>
        <div class="order-student" v-if="orderName=='student'">
          <div class="type">
            <van-row>
              <van-col span="8" offset="16">
                    <span @click="toggleOrdertype('list')">
                      <van-icon name="wap-nav" ></van-icon>
                    </span>
                    <span @click="toggleOrdertype('column')">
                      <van-icon name="exchange" ></van-icon>
                    </span>
              </van-col>
            </van-row>
          </div>
          <div v-if="ordertype=='list'">
             <div class="head">
              <van-row>
                <van-col span="8">
                  <p @click=sortBy(0) class="order" :class="{'up':sortNum==0,'down':sortNum==1}">姓名
                    <span>
                      <i class="up"></i>
                      <i class="down"></i>
                      </span>
                  </p>
                </van-col>
                <van-col span="8">
                  <p @click=sortBy(2) class="order" :class="{'up':sortNum==2,'down':sortNum==3}">正确率
                    <span>
                      <i class="up"></i>
                      <i class="down"></i>
                      </span>
                  </p>
                </van-col>
                <van-col span="8">
                  <p @click=sortBy(4) class="order" :class="{'up':sortNum==4,'down':sortNum==5}">用时
                    <span>
                      <i class="up"></i>
                      <i class="down"></i>
                      </span>
                  </p>
                </van-col>
              </van-row>
            </div>
            <div class="container">
              <div class="content" v-for="(k,index) in user" :key="index">
                <van-row>
                  <van-col span="8">
                    <p class="name">{{k.real_name}}</p>
                  </van-col>
                  <van-col span="8">
                    <p v-if="k.status>=3" class="correct">
                  <span>
                      {{Math.round(k.correct_rate*100)+'%'}}</span>
                  <span class="collumn">
                      <span class="progress-bar" :style="{width:Math.round(k.correct_rate*100)+'%'}" :class="{right:k.correct_rate===1}"></span>
                  </span>
                </p>
                <p v-else>--</p>
                  </van-col>
                  <van-col span="8">
                    <p>{{k.time_length>0?Math.round(k.time_length)+'秒':''}}</p>
                  </van-col>
                </van-row>
              </div>
            </div>
          </div>
          <column v-if="ordertype=='column'" :record="columnData" :total="user.length"></column>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getStatistics from '../axios/getQuestionStatistics.js'
import column from './column.vue'
export default {
  name: 'hanzitingxie',
  data() {
    return {
      params: {
        "course_hour_publish_id": this.$route.params.course_hour_publish_id,
        "course_resource_id": this.$route.params.course_resource_id,
        "icom_id": 5009,
        "dcom_entity_id": this.$route.params.dcom_entity_id
      },
      allCorrect: {},
      resource: [],
      user: [],
      orderName: 'student',
      sortNum: 0,
      correctRate: 0,
      ordertype: 'column',
      columnData: []
    }
  },
  created() {
    getStatistics.getIcomInfo(this.params).then((r) => {
      this.allCorrect = r.all_correct;
      this.resource = r.resource;
      this.user = r.user;
      this.columnData = r.clumn
    })
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
    goBack() {
      this.$router.go(-1)
    },

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
    compare(property) {
      return (a, b) => {
        let value1 = a[property];
        let value2 = b[property];
        // 单数降序 双数增序
        if (this.sortNum % 2 === 0) {
          if (typeof value1 === "string") {
            return value1.localeCompare(value2, "zh");
          }
          return value1 - value2;
        } else {
          if (typeof value1 === "string") {
            return value2.localeCompare(value1, "zh");
          }
          return value2 - value1;
        }
      }
    },
    sortBy(key) {
      if (this.sortNum === key) {
        this.sortNum++;
      } else {
        this.sortNum = key
      }
      if (this.sortNum === 0 || this.sortNum === 1) {
        this.user.sort(this.compare('real_name'))
      } else if (this.sortNum === 2 || this.sortNum === 3) {
        this.user.sort(this.compare('correct_rate'))
      } else if (this.sortNum === 4 || this.sortNum === 5) {
        this.user.sort(this.compare('time_length'))
      }
    },
    toggleOrdertype(type) {
      this.ordertype = type
    }

  },
  components: {
    column
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

  .hanzitingxie .wrapper>.container .order-question {
    width: 100%;
    height: calc(100% - 50px);
    overflow-y: auto;
  }

  .hanzitingxie .wrapper>.container .order-question .item {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #efefef;
    position: relative;
  }

  .hanzitingxie .wrapper>.container .order-question .item p {
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 34px;
  }

  .hanzitingxie .wrapper>.container .order-question .item p i {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }

  .hanzitingxie .wrapper>.container .order-question .item p span.progress {
    width: 40%;
    height: 5px;
    background: #efefef;
    margin: auto;
    position: relative;
    border-radius: 10px;
  }

  .hanzitingxie .wrapper>.container .order-question .item p span.progress-bar {
    height: 5px;
    display: inline-block;
    background: #f56956;
    position: absolute;
    left: 0;
    border-radius: 10px;
  }
.hanzitingxie .wrapper>.container .order-student .type{
  background: #efefef;
}
  .hanzitingxie .wrapper>.container .order-student .head {
    border-bottom: 1px solid #eaeaea;
    background: #fff;
  }

  .hanzitingxie .wrapper>.container .order-student .head .order {
    display: flex;
    justify-content: center;
  }

  .hanzitingxie .wrapper>.container .order-student .head .order span {
    display: flex;
    flex-direction: column;
    width: 10px;
    margin-top: calc((50px - 12px)/2);
    margin-left: 5px;
  }

  .hanzitingxie .wrapper>.container .order-student .head .order i {
    display: inline-block;
  }

  .hanzitingxie .wrapper>.container .order-student .head .order i.up {
    border-style: solid;
    border-width: 0 5px 5px;
    border-color: transparent transparent #cccdcd;
    margin-bottom: 5px;
  }

  .hanzitingxie .wrapper>.container .order-student .head .order.up i.up {
    border-color: transparent transparent #34c988;
  }

  .hanzitingxie .wrapper>.container .order-student .head .order i.down {
    border-style: solid;
    border-width: 5px 5px 0px;
    border-color: #cccdcd transparent transparent;
  }

  .hanzitingxie .wrapper>.container .order-student .head .order.down i.down {
    border-color: #34c988 transparent transparent;
  }

  .hanzitingxie .wrapper>.container .order-student>.container {
    height: calc(100% - 40px);
    overflow: scroll;
    background: #fff;
  }

  .hanzitingxie .wrapper>.container .order-student>.container .content {
    border-bottom: 1px solid #eaeaea;
  }

  .hanzitingxie .wrapper>.container .order-student>.container .content .correct {
    display: flex;
    flex-direction: column;
    line-height: 30px;
  }

  .hanzitingxie .wrapper>.container .order-student>.container .content .correct .collumn,
  .hanzitingxie .wrapper>.container .order-student>.container .content .correct .collumn .progress-bar {
    display: inline-block;
    width: 80%;
    height: 5px;
    margin-left: 10%;
    background: #efefef;
    border-radius: 10px;
    position: relative;
  }

  .hanzitingxie .wrapper>.container .order-student>.container .content .correct .collumn .progress-bar {
    background: #f56956;
    position: absolute;
    margin-left: 0;
    left: 0;
  }

  .hanzitingxie .wrapper>.container .order-student>.container .content .correct .collumn .progress-bar.right {
    background: #34c988
  }
</style>
