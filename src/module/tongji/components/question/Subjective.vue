<template>
  <div class="tiankong">
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
    </div> -->
    <div class="title-bar">
      <van-row>
        <van-col span="8">
          <span>{{params.qti_question_type_name||params.name}}</span>
        </van-col>
        <van-col span="8">
          平均用时：{{time}}秒
        </van-col>
        <van-col span="8" style="text-align:right;">
          正确率：<span class="correct">{{correct}}</span>
        </van-col>
      </van-row>
    </div>
    <div class="wrapper">
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
        <div class="content" v-for="(user,index) in record" :key="index">
          <van-row>
            <van-col span="8">
              <p class="name">{{user.real_name}}</p>
            </van-col>
            <van-col span="8">
              <p v-if="user.order_field>=3" class="correct">
                <span>
                        {{user.correct_rate =='-1' ?'--':Math.round(user.correct_rate*100)+'%'}}</span>
                <span class="collumn" v-if="user.correct_rate!=-1">
                        <span class="progress-bar" :style="{width:user.correct_rate>=0?Math.round(user.correct_rate*100)+'%':''}" :class="{right:user.correct_rate===1}"></span>
                </span>
              </p>
              <p v-else>--</p>
            </van-col>
            <van-col span="8">
              <p>{{user.time_length>0?Math.round(user.time_length)+'秒':''}}</p>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getStatistics from '../../axios/getQuestionStatistics.js'
import {mapState} from 'vuex'
export default {
  name: 'tiankong',
  data() {
    return {
      record: [],
      time: 0,
      correctRate: 0,
      sortNum: -1 // 0姓名升序 1姓名降序 2得分升序 3得分降序 4用时升序 5用时降序
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
  mounted() {
    // 列表默认按时间降序排列
    setTimeout(() => {
      this.sortBy(0);
    })
  },
  computed: {
    correct() {
      if (this.correctRate === '') {
        return '--'
      } else {
        return Math.round(this.correctRate * 100) + '%'
      }
    },
    ...mapState({
      'params': (state) => state.homeworkDetail.params
    })
  },
  methods: {
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
        this.record.sort(this.compare('real_name'))
      } else if (this.sortNum === 2 || this.sortNum === 3) {
        this.record.sort(this.compare('correct_rate'))
      } else if (this.sortNum === 4 || this.sortNum === 5) {
        this.record.sort(this.compare('time_length'))
      }
    },
    getinfo() {
      let param = {
        "course_hour_publish_id": this.params.course_hour_publish_id,
        "course_resource_id": this.params.course_resource_id,
        "qti_question_id": this.params.source_pk_id,
        "dcom_entity_id": this.params.dcom_entity_id ? this.params.dcom_entity_id : 0,
        "qti_question_sheet": this.params.qti_question_sheet ? this.params.qti_question_sheet : 0
      }
      getStatistics.getinfo(param).then((r) => {
        this.record = r.user;
        this.correctRate = r.average_correct_rate
        this.time = r.average_time_length
        this.alias = r.alias
      })
    }
  }
}
</script>

<style scoped>
  .tiankong {
    height: 100vh;
  }

  .tiankong>.title {
    text-align: center;
    line-height: 50px;
    height: 50px;
  }

  .tiankong>.title .back {
    display: inline-block;
    float: left;
  }

  .tiankong>.title .text {
    display: inline-block;
    width: calc(100% - 100px);
    font-weight: 600;
  }

  .tiankong>.title-bar {
    padding: 0 10px;
    line-height: 50px;
    height: 50px;
    box-sizing: border-box;
    background: #f7f8f8;
    font-size: 16px;
  }

  .tiankong .wrapper {
    line-height: 40px;
    text-align: center;
    height: calc(100vh - 100px);
    background: #f7f8f8;
  }

  .tiankong .wrapper .head {
    border-bottom: 1px solid #eaeaea;
    background: #fff;
  }

  .tiankong .wrapper .head .order {
    display: flex;
    justify-content: center;
  }

  .tiankong .wrapper .head .order span {
    display: flex;
    flex-direction: column;
    width: 10px;
    margin-top: calc((40px - 12px)/2);
    margin-left: 5px;
  }

  .tiankong .wrapper .head .order i {
    display: inline-block;
  }

  .tiankong .wrapper .head .order i.up {
    border-style: solid;
    border-width: 0 5px 5px;
    border-color: transparent transparent #cccdcd;
    margin-bottom: 5px;
  }

  .tiankong .wrapper .head .order.up i.up {
    border-color: transparent transparent #34c988;
  }

  .tiankong .wrapper .head .order i.down {
    border-style: solid;
    border-width: 5px 5px 0px;
    border-color: #cccdcd transparent transparent;
  }

  .tiankong .wrapper .head .order.down i.down {
    border-color: #34c988 transparent transparent;
  }

  .tiankong .wrapper>.container {
    height: calc(100% - 40px);
    overflow: scroll;
    background: #fff;
  }

  .tiankong .wrapper>.container .content {
    border-bottom: 1px solid #eaeaea;
  }

  .tiankong .wrapper>.container .content .correct {
    display: flex;
    flex-direction: column;
    line-height: 30px;
  }

  .tiankong .wrapper>.container .content .correct .collumn {
    width: 80%;
  }

  .tiankong .wrapper>.container .content .correct .collumn,
  .tiankong .wrapper>.container .content .correct .collumn .progress-bar {
    display: inline-block;
    height: 5px;
    margin-left: 10%;
    background: #efefef;
    border-radius: 10px;
    position: relative;
  }

  .tiankong .wrapper>.container .content .correct .collumn .progress-bar {
    max-width: 80%;
  }

  .tiankong .wrapper>.container .content .correct .collumn .progress-bar {
    background: #f56956;
    position: absolute;
    margin-left: 0;
    left: 0;
  }

  .tiankong .wrapper>.container .content .correct .collumn .progress-bar.right {
    background: #34c988
  }
</style>
