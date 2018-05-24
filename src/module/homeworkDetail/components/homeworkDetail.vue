<template>
<div class="detail">
  <div class="wrapper">
    <!-- 作业名称 开始时间 结束时间 -->
    <div class="info">
      <p class="name">
        {{homeworkInfo.title}}
        <span style="float:right">共<b>{{resourceList.length}}</b>份</span>
      </p>
      <p class="times">
        截止时间：{{homeworkInfo.deadline}}
      </p>
    </div>
    <!-- 平均正确率 -->
    <div class="correct">
      <van-icon name="info-o" @click="toggleTips"/>
      <p class="num">{{classCorrect}}</p>
      <p class="text">平均正确率</p>
    </div>
    <!-- 内容 -->
    <div class="content">
      <!-- 作业作答情况 学生完成情况tab -->
      <div class="btns van-hairline--surround">
        <van-row>
          <van-col span="12" :class="{'active':activeBtn=='homework'}">
            <span @click="toggleContent('homework')">作业作答情况</span>
            </van-col>
            <van-col span="12" class="student" :class="{'active':activeBtn=='student'}">
              <span @click="toggleContent('student')">学生完成情况</span>
            </van-col>
        </van-row>
      </div>
      <!-- 作业作答情况内容 -->
      <div class="homework-content" v-if="activeBtn=='homework'">
        <div class="total van-hairline--bottom">
          <!-- <span>共{{resourceList.length}}题</span> -->
          <span>只看待批阅</span>
          <span class="right"><van-checkbox v-model="notcorrect"></van-checkbox> </span>
        </div>
        <!-- 作业资源列表 -->
          <div class="lists">
            <div class="item" v-for='(ques,index) in resourceList' :key="index" v-show="!(notcorrect&&ques.pigai_status==3)">
              <div class="iteminfo" @click="changeCollapse(index)">
                <div class="left">{{index+1}}、</div>
                <div class="right">
                  <p>[{{ques.icom_name}}]
                    <span class="resource-name" v-html="ques.resource_name"></span><span v-if="ques.pigai_status!=3"> 待批阅</span></p>
                  <p>
                    已完成：{{ques.finished_counter}}/{{homeworkInfo.student_counter}}人 正确率：{{itemCorrect(ques.average_rate)}}
                    <van-icon name="arrow" class="showdetail"></van-icon>
                  </p>
                </div>
          </div>
          <div class="itemdetail" :class="{hide:!ques.isShow}" v-if="ques.resource_type=='qti_exam'||isCompound(ques.qti_question_type_id,ques.resource_type)">
            <p v-for="(mini,key) in miniResource[index]" :key="key" @click="goTongji(mini,index,key)">
              <span>
                <template v-if="mini.status===1">待批阅</template>
                <template v-if="mini.status===0">未提交</template>
                <template v-else-if="mini.status==3&&mini.marked==1">阅</template>
                <template v-else>{{itemCorrect(mini.correct_rate)}}</template>
              </span>
              <span>{{(index+1)+'-'+(key+1)}}</span>
              </p>
          </div>
          </div>
        </div>
      </div>
      <!-- 学生完成情况 -->
      <div class="student-content" v-if="activeBtn=='student'">
        <!-- 完成人数大于0 显示列表 -->
        <template v-if="finishCounter>0">
          <div class="status">
            <van-row class="item">
              <van-col span="9">未完成</van-col>
              <van-col span="9">{{homeworkInfo.unfinished_counter}}人</van-col>
              <van-col span="6" class="btn" v-if="isUrge">
                <p @click="toggleUrge" :class="{disable:finishCounter==0}">催交作业</p>
              </van-col>
              <van-col span="6" class="btn" v-if="!isUrge">
                <p class="disable">今日已提醒</p>
              </van-col>
            </van-row>
            <van-row class="item">
              <van-col span="9">未订正</van-col>
              <van-col span="9">{{homeworkInfo.unretyr_counter}}人</van-col>
              <van-col span="6" class="btn" v-if="isRemind">
                <p @click="toggleRemind">提醒订正</p>
              </van-col>
              <van-col span="6" class="btn" v-if="!isRemind">
                <p class="disable">今日已提醒</p>
              </van-col>
            </van-row>
          </div>
          <div class="blank"></div>
          <!-- 学生列表 -->
          <student-list :studentList="studentList"></student-list>
        </template>
        <!-- 没人完成 -->
        <template v-else>
          <div class="unfinish-state">
            <div>
              <p>
                <span>{{homeworkInfo.unfinished_counter}}人</span><br>
                <span>未完成</span>
              </p>
            </div>
            <div>
              <p>
                <span>{{homeworkInfo.unretyr_counter}}人</span><br>
                <span>未订正</span>
              </p>
            </div>
          </div>
          <div class="title">学生成绩</div>
          <div class="noanswer-tip">还没有学生提交作业哟～</div>
        </template>
        </div>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="bottom-btn">
        <div class="btn" :class="{disable:homeworkStatus!=1}">
          <p @click="toggleCorrectPopup">一键批阅</p>
        </div>
        <div class="btn">
          <p @click="goBatchEvaluate">批量评价</p>
        </div>
        <div class="btn">
          <p @click="toggleAnswerTip">公布答案</p>
        </div>
    </div>
    <!-- 班级平均正确率计算规则tip -->
    <tips v-if="showTips" @toggle="toggleTips"></tips>
    <!-- 催交作业 -->
    <urge v-if="urge" @toggle="toggleUrge"></urge>
    <!-- 订正提醒 -->
    <remind v-if="remind" @toggle="toggleRemind"></remind>
    <!-- 一键批阅 -->
    <correct v-if="correctTip" @toggle="toggleCorrectPopup" @callback="getResource" :publishId="$route.params.publishId" :send="0"></correct>
    <!-- 发布答案 -->
    <answer v-if="answerTip" @toggle="toggleAnswerTip"></answer>
  </div>
</template>

<script>
import homeworkDetil from "../axios/detail.js";
import Vue from "vue";
import tips from "./common/tips.vue"; // 正确率提示
import urge from "./common/urge.vue"; // 催交作业
import remind from "./common/remind.vue"; // 提醒订正
import correct from "@/components/common/correctPopup.vue"; // 一键批阅
import answer from "./common/answer.vue"; // 发送答案
import studentList from "./common/studentList.vue"; // 学生列表

import {mapActions} from 'vuex'
export default {
  name: "detail",
  props: ['homeworkInfo', 'resourceList', 'homeworkStatus'],
  data() {
    return {
      // homeworkInfo: {}, // 作业信息
      // resourceList: [], // 作业列表
      studentList: [], // 班级学生完成情况，
      correct: -1, // 班级正确率
      activeBtn: "homework", // content内容显示
      showTips: false, // 提示遮罩层
      urge: false, // 催交作业遮罩层
      remind: false, // 订正题型遮罩层
      notcorrect: false, // 是否只看待批阅
      isUrge: false, // 是否已催交作业
      isRemind: false, // 是否已题型订正
      answerTip: false, // 发布答案弹框
      correctTip: false, // 一键批阅弹框
      // homeworkStatus: "", // 当前作业完成状态 1未批改 3已批改
      miniResource: {} // 小资源
    };
  },
  created() {
    this.getinfo();
  },
  computed: {
    // ...mapState({
    //   'user': (state) => state.account.userInfo
    // }),
    // 班级正确率
    classCorrect() {
      if (this.correct === "" || this.correct === -1) {
        return "--";
      } else {
        return this.correct === 0 ? 0 : Math.round(this.correct * 100) + "%";
      }
    },
    // 作业完成人数
    finishCounter() {
      return (
        // 学生总人数-未完成人数
        this.homeworkInfo.student_counter - this.homeworkInfo.unfinished_counter
      );
      // return 0
    }
  },
  methods: {
    ...mapActions({
    }),
    getResource() {
      this.$emit('getresource');
      this.getinfo();
      // 一键批阅后清空小资源列表
      this.miniResource = {};
    },
    getinfo() {
      // 获取作业信息
      this.studentList = this.homeworkInfo.student_list;
      // 班级正确率
      this.correct = this.homeworkInfo.class_average_correct_rate;
      // 是否催交过作业  0 未催交 1 当日已催交
      this.isUrge = this.homeworkInfo.notice_zuoye === 0 ? 'false' : true
      // 是否提醒订正  0 未提醒 1 当日已提醒
      this.isRemind = this.homeworkInfo.notice_retry === 0 ? 'false' : true
    },
    goBatchEvaluate() {
      // 批量评价
      console.log("a");
      this.$router.push({
        path: "/batchEvaluate"
      });
    },
    // 作业作答情况、学生详情切换tab
    toggleContent(items) {
      this.activeBtn = items;
    },
    // 正确率计算规则提示
    toggleTips() {
      this.showTips = !this.showTips;
    },
    // 催交作业弹出框
    toggleUrge() {
      this.urge = !this.urge;
      this.isUrge = true;
      setTimeout(() => {
        this.urge = false;
      }, 3000);
    },
    // 提醒订正弹出框
    toggleRemind() {
      this.remind = !this.remind;
      this.isRemind = true;
      setTimeout(() => {
        this.remind = false;
      }, 3000);
    },
    // 一键批阅弹框
    toggleCorrectPopup() {
      // if (this.homeworkStatus !== 1) {
      //   return false;
      // }
      this.correctTip = !this.correctTip;
    },
    // 发布答案弹窗
    toggleAnswerTip() {
      this.answerTip = !this.answerTip;
    },
    // 查看小题
    changeCollapse(index, ismini) {
      let curr = {};
      let detailbox = "";
      // 套题或试卷  获取当前点击资源
      curr = this.resourceList[index];
      // 小资源列表显示或隐藏
      Vue.set(curr, "isShow", !curr.isShow);
      // 加载小资源参数
      let param = {
        publish_id: curr.course_hour_publish_id,
        course_resource_id: curr.course_resource_id,
        dcom_entity_id: curr.dcom_entity_id
      };
      if (
        // 判断是否为试卷或复合题
        curr.resource_type === "qti_exam" ||
        this.isCompound(curr.qti_question_type_id, curr.resource_type)
      ) {
        if (curr.isShow) {
          // 小资源加载过则不再走接口
          if (this.miniResource[index]) {
            return false;
          }
          // 未加载则走接口加载资源
          homeworkDetil.getMiniResource(param).then(r => {
            Vue.set(this.miniResource, index, r);
          });
        }
      } else {
        this.goTongji(curr);
      }
    },
    // 查看单题统计
    goTongji(curr, index, key) {
      if (curr.status === 0) {
        return false;
      }
      // 当前资源参数
      this.$store.commit("homeworkDetail/setParams", curr);
      if (this.miniResource[index]) {
        // 当前试卷小资源
        this.$store.commit("homeworkDetail/setmini", this.miniResource[index]);
      }
      // 当前资源在小资源中的index
      this.$store.commit("homeworkDetail/changIndex", key);
      // 单选题、判断题统计页面
      this.$router.push({
        name: "questionDetail"
      });
    },
    // 资源正确率计算方法
    itemCorrect(correct) {
      if (correct === "" || correct === -1) {
        return "--";
      } else {
        return correct === 0 ? 0 : Math.round(correct * 100) + "%";
      }
    },
    // 是否为复合题
    isCompound(typeId, resourceType) {
      if (resourceType === "qti_question") {
        if (
          typeId === 12 ||
          typeId === 16 ||
          typeId === 17 ||
          typeId === 35 ||
          typeId === 37
        ) {
          return true;
        }
        return false;
      }
      return false;
    },
    // 顶部tab切换
    tabChange(type) {
      console.log(type);
    }
  },
  components: {
    tips,
    urge,
    remind,
    correct,
    studentList,
    answer
  }
};
</script>

<style scoped>
.detail {
  height: 100vh;
  font-size: 16px;
}

/* title样式 */

.detail>.wrapper {
  background: #e8ebee;;
  height: calc(100vh - 100px);
}

/* 作业信息 */

.detail>.wrapper>.info {
  padding: 10px;
  line-height: 30px;
  background: #fff;
  height: 80px;
  box-sizing: border-box;
}

.detail>.wrapper .itemdetail {
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #e8ebee;;
}

.detail>.wrapper .itemdetail p span:first-child {
  border: 1px solid #333;
  text-align: center;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  line-height: 50px;
}

.detail>.wrapper .itemdetail p {
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 10px;
  font-size: 14px;
}

.detail>.wrapper .itemdetail.hide {
  display: none;
}

.detail>.wrapper>.info>.name {
  font-weight: bold;
}

.detail>.wrapper>.info>.times {
  font-size: 12px;
}

.detail>.wrapper>.info>.times>.end-time {
  margin: 0 5px;
}

/* 班级正确率 */

.detail>.wrapper>.correct {
  padding: 10px;
  text-align: center;
  margin: 10px 0;
  background: #fff;
  line-height: 30px;
  height: 80px;
  box-sizing: border-box;
}

.detail>.wrapper>.correct i {
  position: absolute;
  left: 62%;
}

.detail>.wrapper>.correct>.num {
  font-size: 24px;
  font-weight: bold;
}

.detail>.wrapper>.content {
  background: #fff;
  height: calc(100% - 160px - 20px);
  box-sizing: border-box;
}

/* 作答情况完成情况tab */

.detail>.wrapper>.content>.btns span {
  display: inline-block;
  height: 38px;
  border-bottom: 1px solid transparent;
}

.detail>.wrapper>.content>.btns {
  line-height: 39px;
  height: 39px;
  box-sizing: border-box;
  text-align: center;
}

.detail>.wrapper>.content>.btns .active span{
  color: #08b783;
  border-bottom:1px solid #08b783;
}

/* 作业作答情况content */

.detail>.wrapper>.content>.homework-content,
.detail>.wrapper>.content>.student-content {
  height: calc(100% - 50px);
}

.detail>.wrapper>.content>.homework-content>.total {
  padding: 0 10px;
  line-height: 30px;
  height: 30px;
}

.detail>.wrapper>.content>.homework-content>.total>.right {
  float: right;
}

.detail>.wrapper>.content>.homework-content .lists {
  height: calc(100% - 30px);
  overflow-y: scroll;
}

.detail>.wrapper>.content>.homework-content .lists .item .iteminfo {
  height: 60px;
  border-bottom: 1px solid #e8ebee;;
  display: flex;
  padding: 0 10px;
}

.detail>.wrapper>.content>.homework-content .lists .item .iteminfo>.right {
  width: calc(100% - 35px);
  line-height: 30px;
  font-size: 14px;
}

.detail>.wrapper>.content>.homework-content .lists .item .iteminfo>.right p {
  display: flex;
  position: relative;
}

.detail>.wrapper>.content>.homework-content .lists .item .iteminfo>.right p .showdetail {
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
}

.detail>.wrapper>.content>.homework-content .right .resource-name {
  display: inline-block;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 10px;
}

.detail>.wrapper>.content>.homework-content .lists .item .iteminfo>.left {
  /* display: inline-block; */
  width: 35px;
  height: 100%;
  line-height: 60px;
}

/* 学生列表样式 */

.detail>.wrapper>.content>.student-content .unfinish-state {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.detail>.wrapper>.content>.student-content .unfinish-state>div {
  width: 50%;
  display: flex;
  justify-content: center;
}

.detail>.wrapper>.content>.student-content .unfinish-state p {
  width: 80px;
  text-align: center;
  border: 1px solid #e8ebee;;
  padding: 10px 20px;
}

.detail>.wrapper>.content>.student-content .unfinish-state+.title {
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 10px;
  font-weight: 500;
}

.detail>.wrapper>.content>.student-content .unfinish-state+.title+div.noanswer-tip {
  text-align: center;
}

.detail>.wrapper>.content>.student-content .status>.item {
  padding: 0 13px;
  height: 55px;
  line-height: 55px;
  border-bottom: 1px solid #e8ebee;
  box-sizing: border-box;
}

.detail>.wrapper>.content>.student-content .status>.item .disable {
  opacity: 0.5;
}

.detail>.wrapper>.content>.student-content .status>.item .btn {
  background: #08b783;
  float: right;
  width:75px;
  color: #fff;
  height: 30px;
  line-height: 30px;
  margin-top: 12.5px;
  text-align: center;
  border-radius: 8px;
  font-size: 12px;
}

.detail>.wrapper>.content>.student-content .blank {
  height: 10px;
  background: #e8ebee;;
}

.detail>.wrapper>.content>.student-content .student-list {
  height: calc(100% - 120px);
}

/* 班级平均正确率计算规则提示样式 */

/* 底部按钮 */

.detail .bottom-btn {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 65px;
  background: #fff;
  padding:7.5px 13px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-top:1px solid #e8ebee;
}

.detail .bottom-btn .btn {
  flex:1 1 auto;
  background: #06bb9c;
  border-radius: 13px;
  color: #fff;
  height: 50px;
  line-height: 50px;
  margin-right: 15px;
  text-align: center;
  font-size: 17px;
  width:100px;
}
.detail .bottom-btn .btn:first-child{
  background: #08b783;
}
.detail .bottom-btn .btn:nth-child(2){
  background: #3ea2ff;
}
.detail .bottom-btn .btn:last-child{
  background: #2ecbd0;
  margin-right: 0;
}
.detail .bottom-btn .btn.disable {
  opacity: 0.5;
}
</style>
