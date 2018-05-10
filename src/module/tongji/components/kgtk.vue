<template>
  <div class="kgtk">
    <div class="title border-bottom-1px">
      <van-row>
        <van-col span="2">
          <span class="back" @click="goBack">
            <i class="cubeic-back"></i>
            </span>
        </van-col>
        <van-col span="18">
          <span class="text">查看统计</span>
        </van-col>
        <van-col span="4">原题</van-col>
      </van-row>
    </div>
    <div class="title-bar">
      <van-row>
        <van-col span="6">
          <span>客观填空</span>
        </van-col>
        <van-col span="18" class="info-right">
          正确率：<span class="correct">100% </span> <span @click="toggleAllCorrec"> 全对：{{allCorrect.count}}人</span>
        </van-col>
      </van-row>
    </div>
    <div class="statlist">
      <van-row class="question-item" :class="index==0?'van-hairline--surround':'van-hairline--bottom van-hairline--left van-hairline--right'" v-for="(item,index) in  record" :key="index">
        <van-col span="6" class="num van-hairline--right" >{{index+1}}</van-col>
        <van-col span="6" class="right van-hairline--right"><span>{{item.record.right.count}}</span><span>答对</span></van-col>
        <van-col span="6" class="wrong van-hairline--right"><span>{{item.record.wrong.count}}</span><span>答错</span></van-col>
        <van-col span="6" class="unanswered"><span>{{item.record.right.count}}</span><span>未答</span></van-col>
      </van-row>
    </div>
    <van-popup v-model="showAllCorrec" position="bottom">
      <div class="popup-container">
        <div class="bar">全对的学生</div>
        <div class="container">
        <span v-for="(stu, index) in allCorrect.students" :key="index" class="van-hairline--surround">{{stu.real_name}}</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import getStatistics from '../axios/getQuestionStatistics.js'
export default {
  name: 'kgtk',
  data() {
    return {
      params: {
        "course_hour_publish_id": "e09002511525407400001f",
        "course_resource_id": "9002511525407400001",
        "qti_question_id": "9002511513758200014",
        "dcom_entity_id": 0,
        "qti_question_sheet": 0
      },
      allCorrect: {},
      record: [],
      showAllCorrec: false
    }
  },
  created() {
    getStatistics.getinfo(this.params).then((r) => {
      this.allCorrect = r.all_correct;
      this.record = r.record;
    })
  },
  computed: {},
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    toggleAllCorrec() {
      this.showAllCorrec = !this.showAllCorrec
    }
  }
}
</script>

<style scoped>
  .kgtk {
    height: 100vh;
  }

  .kgtk>.title {
    text-align: center;
    line-height: 50px;
    height: 50px;
  }

  .kgtk>.title .back {
    display: inline-block;
    float: left;
  }

  .kgtk>.title .text {
    display: inline-block;
    width: calc(100% - 100px);
    font-weight: 600;
  }

  .kgtk>.title-bar {
    padding: 0 10px;
    line-height: 50px;
    height: 50px;
    box-sizing: border-box;
  }

  .kgtk>.title-bar .info-right {
    text-align: right;
  }

  .kgtk>.title-bar .info-right .correct {
    color: #ff4e00;
  }

  .kgtk>.statlist {
    padding: 0 10px;
    line-height: 40px;
    text-align: center;
  }
  .kgtk>.statlist>.question-item{
    height: 40px;
  }
  .kgtk>.statlist>.question-item .right{
    background:#afe9d0;
  }
  .kgtk .popup-container{
    height: 500px;
  }
  .kgtk .popup-container>.bar{
    height: 50px;
    line-height: 50px;
    background: #f7f8f8;
    text-align: center;
    font-size: 18px;
  }
  .kgtk .popup-container>.container{
    padding:10px 0px 10px 10px;
    margin-top:15px;
    box-sizing: border-box;
    height: calc(100% - 50px);
  }
  .kgtk .popup-container>.container>span{
    display: inline-block;
    box-sizing: border-box;
    height: 40px;
    line-height: 24px;
    padding:8px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
</style>
